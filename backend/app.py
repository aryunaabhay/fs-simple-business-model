from config import *
from models.problem import *
from models.solution import *
from models.customer import *
from models.business_model import *
from sqlalchemy.exc import SQLAlchemyError
from business_model_api import BusinessModelAPI  # Import the class from the new file

with app.app_context():
    db.create_all()

# Initialize the API
BusinessModelAPI(app)