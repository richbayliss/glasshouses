type Dictionary = {
    [key:string]: (...args: any) => any
}

type EnumProperties<T extends Dictionary> = {
    match: <R>(matches: {
        [key in keyof T]: (...args: Parameters<T[key]>) => R
    }) => R
}

type EnumOption<T extends Dictionary> = {
    [key in keyof T]: (...args: Parameters<T[key]>) => EnumProperties<T>
}

export const Enum = {
    define: <T extends Dictionary>(definition: T): EnumOption<T> => {
        // build an object which reflects the enum options...
        return Object.keys(definition).reduce((result, key) => {
            result[key as keyof T] = (args) => {
                return {
                    ...definition[key],
                    ... {
                        match: (matches) => matches[key](...args),
                    }
                }
            }
            return result
        }, {} as { [key in keyof T]: (args: Parameters<T[key]>) => EnumProperties<T>})
    }
}