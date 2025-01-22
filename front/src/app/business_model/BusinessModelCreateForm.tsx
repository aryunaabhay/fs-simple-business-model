import React, { ChangeEvent, FormEvent, Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import BusinessModelApi from './BusinessModelApi';
import { Problem, Customer, Solution, BusinessModel } from './entities/BusinessModel';
import { useParams } from 'react-router-dom';
import { useAppSelector } from './../../core/hooks';
import { selectBusinessModelDetail } from './businessModelDetailSlice';

interface Props {
    id?: string;
    selected?: BusinessModel
  }


class BusinessModelCreateForm extends Component<Props, { businessModel: BusinessModel }> {

    constructor(props: Props) {
        super(props);
        console.log(props.selected);

        if(props.selected != null) {
            this.state = {
                businessModel: {
                    'id': props.selected.id,
                    'customer': props.selected.customer,
                    'solution': props.selected.solution,
                    'problem': props.selected.problem,
                    toJsonStr: props.selected.toJsonStr
                },
            };
        } else {
            this.state = {
                businessModel: new BusinessModel(
                    { description: '' },
                    { jobs: '', age: 0, gender: '', location: '', occupation: '', income: 0 },
                    { valueProposition: '', killerFeature: '', revenueStream: '' }
                )
            };
        }
        
    }

    componentDidMount() {
        // load data from business model detail endpoint
        console.log(this.props.id);
        console.log('Component did mount');
    }

    handleProblemChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            businessModel: new BusinessModel(
                {
                    ...prevState.businessModel.problem,
                    [name]: value
                },
                prevState.businessModel.customer,
                prevState.businessModel.solution,
            )
        }));
    };

    handleCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            businessModel: new BusinessModel(
                prevState.businessModel.problem,
                {
                    ...prevState.businessModel.customer,
                    [name]: value
                },
                prevState.businessModel.solution,
            )
        }));
    };

    handleSolutionChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            businessModel: new BusinessModel(
                prevState.businessModel.problem,
                prevState.businessModel.customer,
                {
                    ...prevState.businessModel.solution,
                    [name]: value
                },
            )
        }));
    };

    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(this.props.selected != null && this.props.id != null) {
                new BusinessModelApi().update(this.props.id, new Map<string, any>([['customer', this.state.businessModel.customer]]));
            } else {
                new BusinessModelApi().create(this.state.businessModel);
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        const { businessModel } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Problem</legend>
                    <Form.Group as={Col} controlId="formProblemDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={businessModel.problem.description}
                            onChange={this.handleProblemChange}
                            required
                        />
                    </Form.Group>
                </fieldset>
                <fieldset>
                    <legend>Customer</legend>
                    <Form.Group as={Col} controlId="formCustomerJobs">
                        <Form.Label>Customer Jobs (separated by comma)</Form.Label>
                        <Form.Control
                            type="text"
                            name="jobs"
                            value={businessModel.customer.jobs}
                            onChange={this.handleCustomerChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formCustomerAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={businessModel.customer.age}
                            onChange={this.handleCustomerChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formCustomerGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            type="text"
                            name="gender"
                            value={businessModel.customer.gender}
                            onChange={this.handleCustomerChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formCustomerLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={businessModel.customer.location}
                            onChange={this.handleCustomerChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formCustomerOccupation">
                        <Form.Label>Occupation</Form.Label>
                        <Form.Control
                            type="text"
                            name="occupation"
                            value={businessModel.customer.occupation}
                            onChange={this.handleCustomerChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formCustomerIncome">
                        <Form.Label>Income</Form.Label>
                        <Form.Control
                            type="number"
                            name="income"
                            value={businessModel.customer.income}
                            onChange={this.handleCustomerChange}
                            required
                        />
                    </Form.Group>
                </fieldset>
                <fieldset>
                    <legend>Solution</legend>
                    <Form.Group as={Col} controlId="formSolutionValueProposition">
                        <Form.Label>Value Proposition</Form.Label>
                        <Form.Control
                            type="text"
                            name="valueProposition"
                            value={businessModel.solution.valueProposition}
                            onChange={this.handleSolutionChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSolutionKillerFeature">
                        <Form.Label>Killer Feature</Form.Label>
                        <Form.Control
                            type="text"
                            name="killerFeature"
                            value={businessModel.solution.killerFeature}
                            onChange={this.handleSolutionChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSolutionRevenueStream">
                        <Form.Label>Revenue Stream</Form.Label>
                        <Form.Control
                            type="text"
                            name="revenueStream"
                            value={businessModel.solution.revenueStream}
                            onChange={this.handleSolutionChange}
                            required
                        />
                    </Form.Group>
                </fieldset>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

const BusinessModelCreateFormWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const stateSelector = useAppSelector(selectBusinessModelDetail);
    return <BusinessModelCreateForm id={id} selected={stateSelector.selected} />;
};

export default BusinessModelCreateFormWrapper;
