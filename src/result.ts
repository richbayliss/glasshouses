import { GlasshouseUnwrapError } from '.'
import { Option } from './option'

abstract class ResultBase<T, E> {
    abstract ok(): Option<T>
    abstract err(): Option<E>
    unwrap(): T {
        throw new GlasshouseUnwrapError()
    }
    isOk(): boolean {
        return this.ok() !== Option.None
    }
    isErr(): boolean {
        return this.err() !== Option.None
    }
    abstract map<U>(fn: (ok: T) => U): Result<U, E>;
    abstract mapErr<F>(fn: (err: E) => F): Result<T, F>;
}

class Ok<T, E = unknown> extends ResultBase<T, E> {
    constructor(
        protected _ok: T,
    ) {
        super()
    }

    ok(): Option<T> {
        return Option.Some(this._ok)
    }

    err(): Option<E> {
        return Option.None
    }

    override unwrap(): T {
        return this._ok
    }

    override map<U>(fn: (ok: T) => U): Result<U, E> {
        let u = fn(this._ok)
        return new Ok(u)
    }

    override mapErr<F>(fn: (err: E) => F): Result<T, F> {
        return new Ok<T, F>(this._ok)
    }
}

class Err<E, T = unknown> extends ResultBase<T, E> {
    constructor(
        private _err: E,
    ) {
        super()
    }

    ok(): Option<T> {
        return Option.None
    }

    err(): Option<E> {
        return Option.Some(this._err)
    }

    override map<U>(fn: (ok: T) => U): Result<U, E> {
        return new Err<E, U>(this._err)
    }

    override mapErr<F>(fn: (err: E) => F): Result<T, F> {
        let f = fn(this._err)
        return new Err(f)
    }
}

export type Result<T, E> = Ok<T, E> | Err<E, T>

export const Result = {
    Ok: <T>(ok: T): Result<T, any> => {
        return new Ok(ok)
    },
    Err: <E>(err: E): Result<any, E> => {
        return new Err(err)
    }
}
