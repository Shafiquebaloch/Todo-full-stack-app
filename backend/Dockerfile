# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend directory contents into the container at /app
COPY ./backend /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Run alembic migrations
# This command will be run every time the container starts
# You might want to run this as a one-off command after deployment if your hosting provider supports it.
# For simplicity in a Dockerfile that is rebuilt on deploy, this is one approach.
RUN alembic upgrade head

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME World

# Run main.py when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
