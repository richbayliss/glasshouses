import { GlasshouseUnwrapError } from "."

abstract class OptionBase<T> {
    unwrap(): T {
        throw new GlasshouseUnwrapError()
    }
}

class None extends OptionBase<unknown> {
    constructor() {
        super()
    }
}

class Some<T> extends OptionBase<T> {
    constructor(
        private value: T
    ) {
        super()
    }

    unwrap(): T {
        return this.value
    }
}

export type Option<T> = Some<T> | None

export const Option = {
    Some: <T>(value: T) => new Some(value),
    None: new None(),
}
