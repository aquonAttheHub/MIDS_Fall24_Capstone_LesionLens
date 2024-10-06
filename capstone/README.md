# LesionLens Application (Draft)

This directory contains the application logic and tests for our Fall 2024 5th-Year MIDS Capstone deliverable - LesionLens. TODO: Add more context here...

## Technical Overview and Prerequisites for Running and Testing the Application

As our tech stack consists of FastAPI + React + relevant software dependencies, we're going to want a package management system such as Poetry. Python Poetry handles many important aspects of dependency management, including adding, managing, and installing Python packages. Poetry also allows us specify specific dependencies for development environment purposes to keep only the relevant packages, simplifying the development process. Finally, the ability of Poetry to create virtual environments allows us to execute scripts with the required dependencies in a controlled manner. More about Poetry can be found [here](https://python-poetry.org/).

Instructions for installing Poetry can be found [here](https://python-poetry.org/docs/#installing-with-the-official-installer). For Linux, macOS, Windows (WSL) users, the command you should run in your terminal is:

`curl -sSL https://install.python-poetry.org | python3 -`

You can verify Poetry installation by running:

`poetry --version`

When you first pull the changes from the repo, you'll notice the following directory structure:

```text
.
└── MIDS_Fall24_Capstone_LesionLens
  ├── capstone
  │  ├── README.md
  │  ├── poetry.lock
  │  ├── pyproject.toml
  │  ├── src
  │  │   └── __init__.py
  │  │   └── main.py
  │  └── tests
  │      └── __init__.py
  │      └── test_app.py
  ├── README.md
  ├── .github/
  └── .gitignore
```

The src folder contains the code for our application, and the tests folder contains the code for our tests. The pyproject.toml file specifies the dependencies that are to be installed; among them are python 3.11, fastapi, uvicorn, and pytest. You don't need to install these individually, as running `poetry install` in the `capstone` directory will install all those dependencies for you.

NOTE: Just my opinion, but a good practice is to create a python virtual environment with virtualenv before running `poetry install`. This helps separate our project dependencies from those of any other project on your computer. Examples can be found [here](https://stackoverflow.com/questions/43069780/how-to-create-virtual-env-with-python3).

What I do, assuming virtualenv has been installed:

1. Type `virtualenv .venv` in the command line terminal within the `MIDS_Fall24_Capstone_LesionLens` directory.

2. To activate the virtual environment, type `source .venv/bin/activate`.

3. To deactivate the virtual environment, type `deactivate`.

## How to Run the Application

Assuming that you've installed all dependencies, here's how to run the application:

1. In the `capstone/src` directory, run `poetry run uvicorn main:app --reload`.

2. In your terminal, you should see the application listening on localhost located at `http://127.0.0.1:[port number]`.

3. Paste that link into a browser and you should see the message "Welcome to LesionLens!"

## How to Test the Application

Assuming that you've installed all dependencies, here's how to test the application:

1. In the `capstone/tests` directory, run `poetry run pytest`.


