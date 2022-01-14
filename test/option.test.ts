import { Option } from '../src';

describe("Option", () => {
    test("unwrapping a None panics", () => {
        expect(Option.None.unwrap).toThrowError()
    })
})

