import { Enum } from '../src';

describe("Enum", () => {
    const PacketType = Enum.define({
        Hello: () => {},
        Data: (data: string) => data,
    })

    test("define an Enum", () => {
        let packetType = PacketType.Data("BleepBloop")

        let match = packetType.match({
            Hello: () => 1,
            Data: (data) => {
                if (data === "BleepBloopo") {
                    return 2
                }

                return 3
            },
        })

        expect(match).toEqual(3)
    })
})

