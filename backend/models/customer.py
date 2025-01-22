from config import *
from sqlalchemy import Column, Integer, Table, ForeignKey
from sqlalchemy.orm import relationship
from dataclasses import dataclass

@dataclass
class Customer(db.Model):

    __tablename__ = 'customers'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    jobs = db.Column(db.String(), nullable=False) # goals
    age = db.Column(db.Integer(), nullable=False)
    gender = db.Column(db.String(), nullable=False)
    location = db.Column(db.String(), nullable=False)
    occupation = db.Column(db.String(), nullable=False)
    income = db.Column(db.Integer(), nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'jobs': self.jobs,
            'age': self.age,
            'gender': self.gender,
            'location': self.location,
            'occupation': self.occupation,
            'income': self.income
        }
