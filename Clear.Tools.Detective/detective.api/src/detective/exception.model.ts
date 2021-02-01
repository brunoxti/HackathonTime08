export default class DetectiveError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Detective Error";
        this.stack = (<any> new Error()).stack;
    }
}