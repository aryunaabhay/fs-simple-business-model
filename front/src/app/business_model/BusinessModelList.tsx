import React, { useEffect, useState } from 'react';
import { Stack, Card } from 'react-bootstrap';
import BusinessModelApi from '../business_model/BusinessModelApi';
import { ExistingBusinessModel } from './entities/BusinessModel';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from './../../core/hooks'
import { selectBusinessModel } from './../business_model/businessModelDetailSlice'

const BusinessModelList: React.FC = () => {
    const [businessModels, setBusinessModels] = useState<ExistingBusinessModel[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchBusinessModels = async () => {
            const models = await new BusinessModelApi().retrieveList();
            setBusinessModels(models);
        };

        fetchBusinessModels();
    }, []);

    const handleSelectBusinessModel = (model: ExistingBusinessModel) => {
        dispatch(selectBusinessModel(model));
        navigate(`/business_model/${model.id}`);
    };
    

    return (
        <Stack direction="vertical">
           <Link to="/business_model/new" className="btn btn-primary mb-3">Create New Business Model</Link>

            {businessModels.map((model, index) => (
                
                    <Card key={index} onClick={() => handleSelectBusinessModel(model)} style={{ cursor: "pointer" }}>
                    <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                        I'm developing {model.solution.valueProposition} to help people of age {model.customer.age} that work as {model.customer.occupation} solve the problem of {model.problem.description} with {model.solution.killerFeature} they will pay {model.solution.revenueStream}
                        </p>
                    </blockquote>
                    </Card.Body>
                    </Card>

            ))}
        </Stack>


    );
};

export default BusinessModelList;