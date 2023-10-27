import { schema } from "../src";

const user = schema({
    type: 'object',
    description: '',
    properties: {
        name: { type: 'string', description: 'Имя пользователя' },
        email: { type: 'string', description: 'Имя пользователя', format: 'email' },
    },
    required: ['name', 'email'],
});

const userList = schema({
    type: 'array',
    description: '',
    items: user
});

const userId = schema({
    type: ['string', 'null'],
    description: '',
});
