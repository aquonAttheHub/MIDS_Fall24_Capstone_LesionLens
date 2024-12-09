# LesionLens Application (Draft)

This directory contains the application logic and tests for our Fall 2024 5th-Year MIDS Capstone deliverable - LesionLens. TODO: Add more context here...

## Technical Overview and Prerequisites for Running and Testing the Application

The src folder contains the code for our application, and the tests folder contains the code for our tests. The requirements.txt file specifies the dependencies that are to be installed; among them are fastapi, uvicorn, and pytest.

NOTE: Just my opinion, but a good practice is to create a python virtual environment with virtualenv. This helps separate our project dependencies from those of any other project on your computer. Examples can be found [here](https://stackoverflow.com/questions/43069780/how-to-create-virtual-env-with-python3).

What I do, assuming virtualenv has been installed:

1. Type `virtualenv .venv` in the command line terminal within the `MIDS_Fall24_Capstone_LesionLens` directory.

2. To activate the virtual environment, type `source .venv/bin/activate`.

3. To deactivate the virtual environment, type `deactivate`.

## How to Run the Application

Assuming that you've installed all dependencies, here's how to run the application:

1. In the `capstone/src` directory, run `uvicorn main:app --reload`.

2. In your terminal, you should see the application listening on localhost located at `http://127.0.0.1:[port number]`.

3. Paste that link into a browser and you should see the message "Welcome to LesionLens!"

## How to Test the Application

Assuming that you've installed all dependencies, here's how to test the application:

1. In the `capstone/tests` directory, run `python pytest`.


