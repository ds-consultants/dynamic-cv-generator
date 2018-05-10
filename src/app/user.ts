export class User {
    name: string;
    title: string;
    experience: Array<any>;
    education: Array<any>;
    tags: Array<any>;
    tagsOther: Array<any>;
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
