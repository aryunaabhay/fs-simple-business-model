from flask import request, jsonify
from sqlalchemy.exc import SQLAlchemyError
from models.problem import Problem
from models.solution import Solution
from models.customer import Customer
from models.business_model import BusinessModel
from config import db
import dataclasses

class BusinessModelAPI:
    def __init__(self, app):
        self.app = app
        self.register_routes()

    def register_routes(self):
        self.app.add_url_rule('/problems/create', 'create_problem', self.create_problem, methods=['POST'])
        self.app.add_url_rule('/solutions/create', 'create_solution', self.create_solution, methods=['POST'])
        self.app.add_url_rule('/customers', 'list_customers', self.list_customers, methods=['GET'])
        self.app.add_url_rule('/customers/create', 'create_customer', self.create_customer, methods=['POST'])
        self.app.add_url_rule('/business_models', 'list_business_models', self.list_business_models, methods=['GET'])
        self.app.add_url_rule('/business_models/create', 'create_business_model', self.create_business_model, methods=['POST'])
        self.app.add_url_rule('/business_models/<int:id>/update', 'update_business_model', self.update_business_model, methods=['PATCH'])
        self.app.add_url_rule('/problems/<problem_id>/associate_customer', 'associate_customer_to_problem', self.associate_customer_to_problem, methods=['POST'])
        

    def create_problem(self):
        json_body = request.json
        problem = Problem(description=json_body['description'])
        db.session.add(problem)
        db.session.commit()
        return jsonify({'id': problem.id})

    def create_solution(self):
        json_body = request.json
        solution = Solution(
            problem_id=json_body['problem_id'],
            value_proposition=json_body['value_proposition'],
            killer_feature=json_body['killer_feature'],
            revenue_stream=json_body['revenue_stream']
        )
        db.session.add(solution)
        db.session.commit()
        return jsonify({
            'id': solution.id,
            'problem_id': solution.problem_id,
            'value_proposition': solution.value_proposition,
            'killer_feature': solution.killer_feature,
            'revenue_stream': solution.revenue_stream
        }), 201

    def create_customer(self):
        json_body = request.json
        customer = Customer(
            jobs=json_body['jobs'],
            age=json_body['age'],
            gender=json_body['gender'],
            location=json_body['location'],
            occupation=json_body['occupation'],
            income=json_body['income']
        )
        db.session.add(customer)
        db.session.commit()
        return jsonify({
            'id': customer.id,
            'jobs': customer.jobs,
            'age': customer.age,
            'gender': customer.gender,
            'location': customer.location,
            'occupation': customer.occupation,
            'income': customer.income
        }), 201

    def create_business_model(self):
        json_body = request.json
        
        try:
            # Save the problem
            problem = Problem(description=json_body['problem']['description'])
            db.session.add(problem)
            db.session.commit()
            
            # Save the customer
            customer = Customer(
                jobs=json_body['customer']['jobs'],
                age=json_body['customer']['age'],
                gender=json_body['customer']['gender'],
                location=json_body['customer']['location'],
                occupation=json_body['customer']['occupation'],
                income=json_body['customer']['income']
            )
            db.session.add(customer)
            db.session.commit()
            
            # Save the solution
            solution = Solution(
                problem_id=problem.id,
                value_proposition=json_body['solution']['value_proposition'],
                killer_feature=json_body['solution']['killer_feature'],
                revenue_stream=json_body['solution']['revenue_stream']
            )
            db.session.add(solution)
            db.session.commit()
            
            # Save the business model
            business_model = BusinessModel(
                problem_id=problem.id,
                customer_id=customer.id,
                solution_id=solution.id
            )
            db.session.add(business_model)
            db.session.commit()
            
            return jsonify({
                'id': business_model.id,
                'problem': {
                    'id': problem.id,
                    'description': problem.description
                },
                'customer': {
                    'id': customer.id,
                    'jobs': customer.jobs,
                    'age': customer.age,
                    'gender': customer.gender,
                    'location': customer.location,
                    'occupation': customer.occupation,
                    'income': customer.income
                },
                'solution': {
                    'id': solution.id,
                    'problem_id': solution.problem_id,
                    'value_proposition': solution.value_proposition,
                    'killer_feature': solution.killer_feature,
                    'revenue_stream': solution.revenue_stream
                }
            }), 201

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    def associate_customer_to_problem(self, problem_id):
        json_body = request.json
        customer_id = json_body['customer_id']
        self.create_problem_customer(problem_id=problem_id, customer_id=customer_id)

    def update_business_model(self, id):
        json_body = request.json
        try:
            business_model = BusinessModel.query.get(id)
            if not business_model:
                return jsonify({'error': 'Business model not found'}), 404
            
            if 'problem' in json_body:
                problem_data = json_body['problem']
                problem = Problem.query.get(business_model.problem_id)
                if problem:
                    if 'description' in problem_data:
                        problem.description = problem_data['description']
            
            if 'customer' in json_body:
                customer_data = json_body['customer']
                customer = Customer.query.get(business_model.customer_id)
                if customer:
                    if 'jobs' in customer_data:
                        customer.jobs = customer_data['jobs']
                    if 'age' in customer_data:
                        customer.age = customer_data['age']
                    if 'gender' in customer_data:
                        customer.gender = customer_data['gender']
                    if 'location' in customer_data:
                        customer.location = customer_data['location']
                    if 'occupation' in customer_data:
                        customer.occupation = customer_data['occupation']
                    if 'income' in customer_data:
                        customer.income = customer_data['income']
            
            if 'solution' in json_body:
                solution_data = json_body['solution']
                solution = Solution.query.get(business_model.solution_id)
                if solution:
                    if 'value_proposition' in solution_data:
                        solution.value_proposition = solution_data['value_proposition']
                    if 'killer_feature' in solution_data:
                        solution.killer_feature = solution_data['killer_feature']
                    if 'revenue_stream' in solution_data:
                        solution.revenue_stream = solution_data['revenue_stream']

            db.session.commit()
            
            return jsonify({
                'id': business_model.id,
                'problem': {
                    'id': business_model.problem_id,
                    'description': problem.description
                },
                'customer': {
                    'id': business_model.customer_id,
                    'jobs': customer.jobs,
                    'age': customer.age,
                    'gender': customer.gender,
                    'location': customer.location,
                    'occupation': customer.occupation,
                    'income': customer.income
                },
                'solution': {
                    'id': business_model.solution_id,
                    'problem_id': solution.problem_id,
                    'value_proposition': solution.value_proposition,
                    'killer_feature': solution.killer_feature,
                    'revenue_stream': solution.revenue_stream
                }
            }), 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    def list_business_models(self):
        try:
            business_models = BusinessModel.query.all()
            result = []
            for business_model in business_models:
                problem = Problem.query.get(business_model.problem_id)
                customer = Customer.query.get(business_model.customer_id)
                solution = Solution.query.get(business_model.solution_id)
                result.append({
                    'id': business_model.id,
                    'problem': problem.as_dict(),
                    'customer': customer.as_dict(),
                    'solution': solution.as_dict(),
                })
            return jsonify(result), 200

        except SQLAlchemyError as e:
            return jsonify({'error': str(e)}), 500

    def list_customers(self):
        try:
            customers = Customer.query.all()
            result = [customer.as_dict() for customer in customers]
            return jsonify(result), 200

        except SQLAlchemyError as e:
            return jsonify({'error': str(e)}), 500