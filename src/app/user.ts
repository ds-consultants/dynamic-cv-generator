export class User {
    name: string;
    title: string;
    experience: Array<number>;
    education: Array<number>;
    professionalExpectations: string;
    personalNote: string;
    skillset: { languages: {main: Array<string>, second: Array<string>},
                others: {main: Array<string>, second: Array<string> }
            };
}
