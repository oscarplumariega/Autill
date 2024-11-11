export interface Budget {
    id: number;
    idBusiness: string;
    name: string;
    clientId: number;
    clientName: string;
    date: string;
    descriptionItems: string;
    price: number;
}

export interface BudgetResults {
    results: Budget[];
}