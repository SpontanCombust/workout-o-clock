# Workout-o-clock - DEV

This document lists information needed by any developer wanting to try using this application stack.

## Requirements
Common:
- Docker Engine
  
Backend:
- JDK17+
- Maven
  
Frontend:
- npm
- Android Studio (when not testing on a physical device)


## Configuration

Root project directory should contain a file called ".env" with environment variable assignments needed for initialization and subsequent use of containers. The aformentioned environment variables file has been excluded in .gitignore on purpose to avoid accidental exposure of sensitive data in the repository. There still is however the ".env.template" file that can be used as a template for it.
If you don't want to use a file you can export these variables directly in the command line.
