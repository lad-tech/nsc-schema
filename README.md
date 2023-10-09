# nsc-schema - Инструмент по описанию схемы для библиотеки nsc-toolkit

## Возможности

- Авто дополнение конфигурации специфичной для библиотеки `nsc-toolkit`
- Авто дополнение `JsonSchema`
- Проверка наличия поле `description` для описания полей и схем. Опционально 
- Проверка поле `required`, на наличие всех полей в `properties`

## Использование

```
schema
  methods - содержит описание всех методов
    GetUserList.ts - конкретный метод
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

- В папке `methods` нужно создать файл с именем метода

> /schema/methods/GetUserList.ts
```typescript
import { method, schema, list } from "@lad-tech/nsc-schema";
import { responseResult } from "shared/schema"; // Общие файлы для всего проекта

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
    response: responseResult(list(UserShort)),
})
```

Функция `list` получает схему для списка из схемы одного элемента.
Функция `responseResult` формирует схему ответа их полученной схемы исходя из стандартов проекта. Реализуется в проекте.

- Подключить метод в index.ts

> /schema/methods/index.ts

```typescript
export { GetUserList } from "./GetUserList";
```

- Описать все необходимые поля `user_id`, `email`, `first_name`

> /schema/fields/user.ts

```typescript
import { field } from "@lad-tech/nsc-schema";
import { makeId } from "shared/schema"; // Общие файлы для всего проекта

export const user_id = makeId('ID пользователя'),

export const email = field({
    type: 'string',
    description: 'email пользователя',
    format: 'email'
})

export const first_name = field({
    type: 'string',
    description: 'first_name имя пользователя',
})
```

- Описать все необходимые схемы `UserShort`

> /schema/schemas/user.ts

```typescript
import { schema } from "@lad-tech/nsc-schema";
import { user: { user_id, email, first_name } } from "../fields";
import { schema: { add_time, update_time } } from "shared/schema";

export const UserShort = schema({
    type: 'object',
    properties: {
        user_id,
        email,
        first_name,
        add_time, 
        update_time
    },
    required: ['user_id', 'email', 'first_name', 'add_time', 'update_time'],
})
```

## Формирование основного файла конфигурации

> schema/index.ts

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