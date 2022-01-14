export class GlasshouseError extends Error {
    constructor(message: string) {
        super(`PANIC :: ${message}`)
    }
}

export class GlasshouseUnwrapError extends GlasshouseError {
    constructor() {
        super("unwrap() failed")
    }
}