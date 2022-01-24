export * from './errors'
export * from './result'
export * from './option'
export * from './enum'

import { exit } from 'process'
import { GlasshouseError } from './errors'
import { Result } from './result'

export async function glasshouse(fn: Function, opts?: Partial<{ throwOrExit: 'throw' | 'exit' }>): Promise<void> {
    let options: { throwOrExit: 'throw' | 'exit' } = {
        throwOrExit: 'exit',
        ...opts,
    }

    try {
        await fn()
    } catch (err) {
        const message = [
            "Something wasn't caugh and the glasshouse is shattered! 💥",
            `${err}`
        ].join("\n");
        console.error(message);
        if (options.throwOrExit === 'exit') {
            exit(1)
        } else {
            throw new GlasshouseError(message)
        }
    }
}

type ThrowableFn<A extends Array<any>, T> = (...args: A) => T

/**
 * Insulates a function which might throw an error. Used when interacting with code which isn't design
 * to run in a glasshouse.
 * 
 * @param fn Function to insulate from throwing errors
 * @returns A result of the expected return type, or an `Error`
 */
export function insulate<A extends Array<any>, T = unknown>(fn: ThrowableFn<A, T>): (...args: A) => Result<T, Error> {
    return (...args: A) => {
        try {
            const r = fn(...args)
            return Result.Ok(r)
        } catch (err) {
            return Result.Err(new Error(`${err}`))
        }
    }
}

export default glasshouse
