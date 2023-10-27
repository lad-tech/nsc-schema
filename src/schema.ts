import { JSONSchema } from "./schema/types";

export const schema = <T extends any>(schema: JSONSchema<T>) => {
    return schema;
};
