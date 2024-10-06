from src import __version__
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_version():
    assert __version__ == '0.1.0'

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_hello():
    response = client.get("/hello?name=anson")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello anson"}
    
    response = client.get("/hello?name=bryan")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello bryan"}

def test_hello_empty():
    response = client.get("/hello?name= ")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello  "}
    
    response = client.get("/hello")
    assert response.status_code == 422

def test_hello_integer():
    response = client.get("/hello?name=1")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello 1"}

def test_hello_double():
    response = client.get("/hello?name=2.5")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello 2.5"}

def test_hello_rand_char():
    response = client.get("/hello?name=$")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello $"}

    response = client.get("/hello?name=.")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello ."}

    response = client.get("/hello?name=_")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello _"}

    response = client.get("/hello?name=~")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello ~"}


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to LesionLens!"}

def test_non_existing_resource():
    response = client.get("/randomresource")
    assert response.status_code == 404
