import { Option } from '../src';
const { None, Some } = Option

describe("Option", () => {
    test("unwrapping a None panics", () => {
        expect(Option.None.unwrap).toThrowError()
    })

    test("isSome()", () => {
        let o = None

        expect(o.isNone()).toBeTruthy()
        expect(o.isSome()).toBeFalsy()
    })

    test("isNone()", () => {
        let o = Some("Hello")

        expect(o.isSome()).toBeTruthy()
        expect(o.isNone()).toBeFalsy()
    })

    test("match on None", () => {
        let o = None

        let m = o.match({
            None: () => true,
            Some: (_) => false,
        })

        expect(m).toBeTruthy()
    })

    test("match on Some", () => {
        let o = Some("Hello")

        let m = o.match({
            None: () => false,
            Some: (word) => word === "Hello",
        })

        expect(m).toBeTruthy()
    })
})

