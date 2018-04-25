export class User {
    name: string;
    title: string;
    experience: {};
    education: {};
    professionalExpectations: string;
    personalNote: string;
    skillset: {
        languages: { main: Array<string>, second: Array<string> },
        others: { main: Array<string>, second: Array<string> }
    };
    uid: string;
    email?: string | null;
    photoURL?: string;
}
