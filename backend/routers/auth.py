from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from pydantic import BaseModel # Added import

from .. import models
from ..database import get_session
from ..security import create_access_token, verify_password, get_password_hash, create_password_reset_token # Added import

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)

@router.post("/signup", response_model=models.UserPublic)
def signup(user_create: models.UserCreate, session: Session = Depends(get_session)):
    hashed_password = get_password_hash(user_create.password)
    user = models.User(email=user_create.email, hashed_password=hashed_password)
    
    existing_user = session.exec(select(models.User).where(models.User.email == user.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
        
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post("/token")
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    user = session.exec(select(models.User).where(models.User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

class ForgotPasswordRequest(BaseModel): # Added model
    email: str

@router.post("/forgot-password") # Added endpoint
def forgot_password(
    request: ForgotPasswordRequest,
    session: Session = Depends(get_session)
):
    user = session.exec(select(models.User).where(models.User.email == request.email)).first()
    
    # Always return a 200 OK, regardless of whether the email exists,
    # to prevent user enumeration attacks.
    if user:
        token, expires_at = create_password_reset_token()
        user.password_reset_token = token
        user.password_reset_expires = expires_at
        session.add(user)
        session.commit()
        session.refresh(user)

        # In a real application, you would send an email here.
        # For now, we just print the token for testing/development.
        print(f"Password reset token for {user.email}: {token}")

    return {"message": "If a matching account was found, a password reset email has been sent."}

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    session: Session = Depends(get_session)
):
    user = session.exec(
        select(models.User)
        .where(models.User.password_reset_token == request.token)
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token."
        )

    # Check if the token has expired
    if user.password_reset_expires and user.password_reset_expires < datetime.now(timezone.utc):
        # Optionally, clear the expired token
        user.password_reset_token = None
        user.password_reset_expires = None
        session.add(user)
        session.commit()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token."
        )
    
    # Hash the new password and update the user
    user.hashed_password = get_password_hash(request.new_password)
    user.password_reset_token = None  # Clear the token after use
    user.password_reset_expires = None # Clear expiration
    session.add(user)
    session.commit()
    session.refresh(user)

    return {"message": "Password has been reset successfully."}

