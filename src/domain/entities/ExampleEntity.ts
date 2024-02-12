export class ExampleEntity {
    readonly reason: string;

    constructor(reason: string) {
        this.reason = reason;
    }

    static create(reason: string): ExampleEntity {
        return new ExampleEntity(reason);
    }
}
