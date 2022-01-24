import { insulate, default as glasshouse, GlasshouseError } from '../src';

describe("Insulation", () => {
    test("insulate a successful throwable", () => {
        const insulated = insulate((name: string) => {
            return `Hello ${name}`
        })

        const r = insulated("World");

        expect(r.ok().unwrap()).toBe("Hello World")
    })

    test("insulate a failed throwable", () => {
        const insulated = insulate((name: string) => {
            throw `Goodbye ${name}`
        })

        const r = insulated("World");
        expect(r.err().unwrap()).toBeInstanceOf(Error)
    })
})

const consoleError = console.error
describe("Glasshouse", () => {
    beforeAll(() => {
        console.error = (...args: any) => {}
    })

    afterAll(() => {
        console.error = consoleError
    })

    test("main wrapped function throws up", () => {
        return glasshouse(() => {
            throw new Error("Boom! Headshot")
        }, { throwOrExit: 'throw' }).catch(err => {
            expect(err).toBeInstanceOf(GlasshouseError)
        })
    })

    test("async main wrapped function throws up", () => {
        return glasshouse(async () => {
            let delay = new Promise<void>((resolve) => {
                setTimeout(resolve, 10);
            });

            await delay
            throw new Error("Boom! Headshot")
        }, { throwOrExit: 'throw' }).catch(err => {
            expect(err).toBeInstanceOf(GlasshouseError)
        })
    })
})