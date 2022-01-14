import { GlasshouseUnwrapError } from '.'
import { Option } from './option'

abstract class ResultBase<T, E> {
    abstract ok(): Option<T>
    abstract err(): Option<E>
    unwrap(): T {
        throw new GlasshouseUnwrapError()
    }
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
}

export type Result<T, E> = Ok<T> | Err<E>

export const Result = {
    Ok: <T>(ok: T): Result<T, any> => {
        return new Ok(ok)
    },
    Err: <E>(err: E): Result<any, E> => {
        return new Err(err)
    }
}


/**
 * Return a successful result with the value provided.
 * 
 * @param ok The value to return
 * @returns [[`Result`]]
 */
/**
 * Return a failed result with the error provided.
 * 
 * @param err The error to return
 * @returns [[`Result`]]
 */

