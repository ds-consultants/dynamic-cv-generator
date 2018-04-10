import { Hash } from "crypto";

export class User {
    name: string;
    title: string;
    experience: Array<number>;
    education: Array<number>;
    professionalExpectations: string;
    skillset: Hash;
    personalNote: string
}
