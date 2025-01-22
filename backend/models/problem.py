from config import *

class Problem(db.Model):
    __tablename__ = 'problems'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    description = db.Column(db.String(), nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'description': self.description
        }