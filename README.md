# nsc-schema - Инструмент по описанию схемы для библиотеки nsc-toolkit

Данная библиотека предлагает для описание схемы сервиса вместо файла `service.schema.js`, использовать папку `service` с разбиением на файлы полей, схем и методов.

## Возможности

- Авто дополнение конфигурации специфичной для библиотеки `nsc-toolkit`
- Авто дополнение `JsonSchema`
- Проверка наличия поле `description` для описания полей и схем. [Опционально]
- Проверка поля `required`, на наличие всех полей в `properties`
- Дополнительные функции по работе с `JsonSchema` - ой
    - `list` - получает схему для списка из схемы одного элемента.
    - `asNull` - добавляет к текущей схеме тип `null`

## Структура папки `service`

```
service
  methods - Описание всех методов
    GetUserList.ts - метод получения списка пользователей
    index.ts - подключение методов через re export
  fields - поля сущностей
    user.ts
    index.ts
  schemas - схемы собранные из полей
    user.ts
    index.ts
  index.ts - конечная настройка для сервиса
```

## Пример объявления метода

> /service/methods/GetUserList.ts - добавление метода
```typescript
import { method, schema, list } from "@lad-tech/nsc-schema";
import { pagination, result } from "shared/schema"; // Общие файлы для всего проекта

import { user: { user_id, email } } from "./fields";
import { UserShort } from "./schema";

export const GetUserList = method({
    action: 'GetUserList',
    description: 'Получение списка пользователей',
    request: schema({ 
        type: 'object',
        properties: {
            user_id, 
            email,
        }
    }),
    response: pagination(result(list(UserShort))),
})
```

Функция `result` формирует схему ответа их полученной схемы исходя из стандартов проекта. Реализуется в проекте.
Функция `pagination` добавляет схему для описания результата пагинации. Реализуется в проекте.

> /service/methods/index.ts - подключение метода

```typescript
export { GetUserList } from "./GetUserList";
```

## Описание необходимых полей

> /service/fields/user.ts - описание полей `user_id`, `email`, `first_name`

```typescript
import { field } from "@lad-tech/nsc-schema";
import { makeId } from "shared/schema"; // Общие файлы для всего проекта

export const user_id = makeId('ID пользователя');
export const group_id = makeId('ID группы, к которой принадлежит пользователь');
export const email = field({
    type: 'string',
    description: 'email пользователя',
    format: 'email'
});
export const first_name = field({
    type: 'string',
    description: 'Имя пользователя',
});
export const last_name = field({
    type: 'string',
    description: 'Фамилия пользователя',
});
```

## Описание необходимых схем

> /service/schemas/user.ts - описание схемы `UserShort`

```typescript
import { schema, asNull } from "@lad-tech/nsc-schema";
import { user: { user_id, group_id, email, first_name } } from "../fields";
import { schema: { add_time, update_time } } from "shared/schema";

export const UserShort = schema({
    type: 'object',
    properties: {
        user_id
        group_id: asNull(group_id),
        email,
        first_name,
        add_time, 
        update_time
    },
    required: ['user_id', 'group_id', 'email', 'first_name', 'add_time', 'update_time'],
})
```

> /service/schemas/index.ts - подключение файла схем по пользователю
```typescript
export * from "./user";
```

## Формирование основного файла конфигурации

> /service/index.ts

```typescript
import { config } from "@lad-tech/nsc-schema";
import * as methods from "./methods";

export default config({
  name: 'User',
  description: 'Сервис пользователей',
  methods: {
    ...methods,
  }
});
```
