
class ApiService {
    private baseUrl: string = 'http://127.0.0.1:5000'

    async get(endpoint: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return this.handleResponse(response);
    }

    async post(endpoint: string, data: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return this.handleResponse(response);
    }

    async patch(endpoint: string, data: Map<string, number>): Promise<any> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return this.handleResponse(response);
    }

    async delete(endpoint: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return this.handleResponse(response);
    }

    private async handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }
        return response.json();
    }
}

export default ApiService;