import { GlasshouseUnwrapError } from "."

type OptionMatch<T, R> = {
    None: () => R,
    Some: (value: T) => R,
}

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
    abstract match<R>(branches: OptionMatch<T, R>): R
}

class None extends OptionBase<unknown> {
    constructor() {
        super()
    }

    override match<R>(branches: OptionMatch<unknown, R>): R {
        return branches.None()
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

    override match<R>(branches: OptionMatch<T, R>): R {
        return branches.Some(this.value)
    }
}

export type Option<T> = Some<T> | None

export const Option = {
    Some: <T>(value: T) => new Some(value),
    None: new None(),
}
