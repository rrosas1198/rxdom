export class DOMException extends Error {
    constructor(message: string, name: string = null!) {
        super(message);
        this.name = name || "DOMException";
    }
}
