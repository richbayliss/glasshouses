import { Result, Option, GlasshouseUnwrapError } from '../src';
const { Ok, Err } = Result

describe("Result", () => {
    test("a successful result", () => {
        const r = Ok("Hello")

        expect(r.ok().unwrap()).toBe("Hello")
        expect(r.err()).toBe(Option.None)
    })

    test("a failed result", () => {
        const r = Err(new Error("This operation failed"))

        expect(r.ok()).toBe(Option.None)
        expect(r.err().unwrap()).toBeInstanceOf(Error)
    })

    test("a successful functional result", () => {
        const fn = (): Result<string, Error> => {
            return Ok("Hello")
        }

        const r = fn();

        expect(r.ok().unwrap()).toBe("Hello")
        expect(r.err()).toBe(Option.None)
    })

    test("a failed functional result", () => {
        const fn = (): Result<string, Error> => {
            return Err(new Error("Hello"))
        }

        const r = fn();

        expect(r.ok()).toBe(Option.None)
        expect(r.err().unwrap()).toBeInstanceOf(Error)
    })
})

describe("Special Cases", () => {
    test("an undefined result", () => {
        const r = Ok(undefined);
        expect(r.ok().unwrap()).toBe(undefined)
    })
})

describe("Unwrapping", () => {
    test("unwrap successful result", () => {
        let r = Ok("Hello World")

        expect(r.unwrap()).toBe("Hello World");
    })

    test("unwrap failed result", () => {
        let r = Err("Goodbye World")

        expect(r.unwrap).toThrowError(GlasshouseUnwrapError);
    })
})

describe("checks", () => {
    test("isOk()", () => {
        let r = Ok("Hello World")
        expect(r.isOk()).toBeTruthy()
        expect(r.isErr()).toBeFalsy()
    })
    test("isErr()", () => {
        let r = Err("Goodbye World")
        expect(r.isOk()).toBeFalsy()
        expect(r.isErr()).toBeTruthy()
    })
})

describe("Mapping", () => {
    test("Map Ok(T) to Ok(U)", () => {
        let r = Ok("Hello")
        let r2 = r.map(t => t === "Hello" ? true : false)

        expect(r2.err().isNone()).toBeTruthy()
        expect(r2.unwrap()).toBeTruthy()

    })

    test("Map Ok(T) to Ok(T)", () => {
        let r = Err("Boom")
        let r2 = r.map(t => t === "Hello" ? true : false)

        expect(r2.isErr()).toBeTruthy()
        expect(r2.err().isSome()).toBeTruthy()
        expect(r2.err().unwrap()).toEqual("Boom")
        expect(r2.isOk()).toBeFalsy()
    })

    test("Map Err(E) to Err(F)", () => {
        let r = Err("Boom")
        let r2 = r.mapErr(e => e === "Boom" ? true : false)

        expect(r2.isErr()).toBeTruthy()
        expect(r2.err().isSome()).toBeTruthy()
        expect(r2.err().unwrap()).toBeTruthy()
    })
})