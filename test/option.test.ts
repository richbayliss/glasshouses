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
})

