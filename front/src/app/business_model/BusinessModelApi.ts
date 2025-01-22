
import ApiService from '../../core/ApiService';
import { Problem, Customer, Solution, ExistingBusinessModel, BusinessModel } from './entities/BusinessModel';

class BusinessModelApi {
    private apiService: ApiService;

    constructor() {
        this.apiService = new ApiService();
    }

    async retrieveList(): Promise<ExistingBusinessModel[]> {
        let results: ExistingBusinessModel[] = await this.apiService.get('/business_models');
        return results;
    }

    async create(businessModel: BusinessModel) {
        let data: string = businessModel.toJsonStr();
        return this.apiService.post('/business_models/create', data);
    }

    async update(id: string, data: Map<string, any>) {
        return this.apiService.patch(`/business_models/${id}/update`, data);
    }
}

export default BusinessModelApi;