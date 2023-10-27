import { schema } from "../src";

const user = schema({
    type: 'array',
    description: '',
    properties: {
        name: { type: 'string', description: 'Имя пользователя' },
        email: { type: 'string', description: 'Имя пользователя', format: 'email' },
    },
    required: ['name', 'email'],
});
