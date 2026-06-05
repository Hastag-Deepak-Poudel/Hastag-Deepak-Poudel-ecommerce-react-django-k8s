#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Gather all static assets into STATIC_ROOT without prompt
python manage.py collectstatic --noinput

# Run database migrations (optional but recommended here)
python manage.py migrate

# Execute the container's main command (e.g., Gunicorn or Uvicorn)
exec "$@"