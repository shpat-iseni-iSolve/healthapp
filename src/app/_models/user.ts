export class User {
    id: string;
    token?: string;
    firstName: string;
    lastName: string;
    guardianName?: string;
    socialID: string;
    username: string;
    email: string;
    password: string;
    appointment?: string;
    results?: [Results]
    recommendedDrugs?: string;
    role: string;
    diagnoses?: [Diagnoses]
}

class Results {
    name: string;
    date: string;
    description: string;
    file: string;
};

class Diagnoses {
    name: string;
    date: string;
    description: string;
};
