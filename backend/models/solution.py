from config import *


class Solution(db.Model):
    __tablename__ = 'solutions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    problem_id = db.Column(db.Integer, db.ForeignKey('problems.id'), nullable=False)
    value_proposition = db.Column(db.String(), nullable=False)
    killer_feature = db.Column(db.String(), nullable=False)
    revenue_stream = db.Column(db.String(), nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'problem_id': self.problem_id,
            'value_proposition': self.value_proposition,
            'killer_feature': self.killer_feature,
            'revenue_stream': self.revenue_stream
        }