
export interface Problem {
    description: string;
}

export interface Customer {
    jobs: string;
    age: number;
    gender: string;
    location: string;
    occupation: string;
    income: number;
}

export interface Solution {
    valueProposition: string;
    killerFeature: string;
    revenueStream: string;
}

export type ExistingBusinessModel = BusinessModel & {
    id: String;
};

export class BusinessModel {
    id?: string;
    problem: Problem;
    customer: Customer;
    solution: Solution;

    constructor(problem: Problem, customer: Customer, solution: Solution) {
        this.problem = problem;
        this.customer = customer;
        this.solution = solution;
    }

    toJsonStr(): string {
        const self = this;
        return JSON.stringify({
            "problem": { ...self.problem },
            "solution": {
                "value_proposition": self.solution.valueProposition,
                "killer_feature": self.solution.killerFeature,
                "revenue_stream": self.solution.revenueStream,
            },
            "customer": {
                ...self.customer
            }
        });
    }
}