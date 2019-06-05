export class User {
    name: string;
    title: string;
    experience: Array<any>;
    education: Array<any>;
    professionalExpectations: string;
    personalNote: string;
    skillset: {
        languages?: { main: Array<string>, second: Array<string>, position: number },
        others?: { main: Array<string>, second: Array<string>, position: number }
    };
    uid: string;
    email: string | null;
    photoUrl?: string;
    superUser: boolean;
}

export class SkillSet {
    main: Array<string>;
    second: Array<string>;
    position: number;
}
