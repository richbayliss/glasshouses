import { GlasshouseUnwrapError } from "."

abstract class OptionBase<T> {
    isSome(): boolean {
        return false;
    }
    isNone(): boolean {
        return true;
    }
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

    override isNone(): boolean {
        return false
    }

    override isSome(): boolean {
        return true
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
