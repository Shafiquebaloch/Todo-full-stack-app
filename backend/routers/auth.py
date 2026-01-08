from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from pydantic import BaseModel, EmailStr
from datetime import datetime, timezone

from .. import models
from ..database import get_session
from ..security import (
    create_access_token,
    verify_password,
    get_password_hash,
    create_password_reset_token,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


# Pydantic Models for Request Bodies
class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


@router.post("/signup", response_model=models.UserPublic)
def signup(user_create: models.UserCreate, session: Session = Depends(get_session)):
    """
    Create a new user.
    """
    existing_user = session.exec(
        select(models.User).where(models.User.email == user_create.email)
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed_password = get_password_hash(user_create.password)
    user = models.User(email=user_create.email, hashed_password=hashed_password)

    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.post("/token")
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    """
    Authenticate user and return an access token.
    """
    user = session.exec(
        select(models.User).where(models.User.email == form_data.username)
    ).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest, session: Session = Depends(get_session)
):
    """
    Request a password reset token.
    """
    user = session.exec(
        select(models.User).where(models.User.email == request.email)
    ).first()

    if user:
        token, expires_at = create_password_reset_token()
        user.password_reset_token = token
        user.password_reset_expires = expires_at
        session.add(user)
        session.commit()

        # In a real app, send an email with the token.
        # For development, we print it.
        print(f"Password reset token for {user.email}: {token}")

    return {"message": "If an account with that email exists, a password reset link has been sent."}


@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest, session: Session = Depends(get_session)
):
    """
    Reset user password with a valid token.
    """
    user = session.exec(
        select(models.User).where(models.User.password_reset_token == request.token)
    ).first()

    if not user or not user.password_reset_expires:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token.",
        )
    
    # Ensure timezone-aware comparison
    if user.password_reset_expires < datetime.now(timezone.utc):
        # Clear expired token
        user.password_reset_token = None
        user.password_reset_expires = None
        session.add(user)
        session.commit()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token.",
        )

    user.hashed_password = get_password_hash(request.new_password)
    user.password_reset_token = None
    user.password_reset_expires = None
    session.add(user)
    session.commit()

    return {"message": "Password has been reset successfully."}

