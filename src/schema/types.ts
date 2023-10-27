// Скопировано и модифицировано с https://github.com/jrylan/json-schema-typed/blob/main/dist/node/draft-2020-12.ts

type MaybeReadonlyArray<T> = Array<T> | ReadonlyArray<T>;
type ValueOf<T> = T[keyof T];

export type JSONSchema<
  Value = any,
  SchemaType = Value extends boolean ? "boolean"
    : Value extends null ? "null"
    : Value extends number ? "number" | "integer"
    : Value extends string ? "string"
    : Value extends unknown[] ? "array"
    : Value extends Record<string | number, unknown> ? "object"
    : JSONSchema.TypeValue,
> = boolean | {

  /** Возможные типы null | boolean | object | array | number | string | integer */
  type: TypeName;
  /** Описание для схемы */
  description: string;
  /** Указанная схема находится в статусе deprecated */
  deprecated?: boolean;
  /** Перечисление возможны значений */
  enum?: MaybeReadonlyArray<Value>;
  /** Значение по умолчанию */
  default?: Value;

  // Различные виды схем
  allOf?: MaybeReadonlyArray<JSONSchema<Value, SchemaType>>;
  anyOf?: MaybeReadonlyArray<JSONSchema<Value, SchemaType>>;
  oneOf?: MaybeReadonlyArray<JSONSchema<Value, SchemaType>>;
  not?: JSONSchema<Value, SchemaType>;

  // type: string
  /** Максимальное количество символов в строке */
  maxLength?: number;
  /** Минимальное количество символов в строке */
  minLength?: number;
  /** Регулярное выражение для type string */
  pattern?: string;
  /** Формат строки */
  format?: Format;

  // type: number 
  /** Минимальное значение для типа number*/
  minimum?: number;
  /** Максимальное значение для типа number */
  maximum?: number;
  /** Минимальное значение не включая указанное */
  exclusiveMinimum?: number;
  /** Максимальное значение не включая указанное */
  exclusiveMaximum?: number;
  /** Кратно указанному значению для type: number, integer */
  multipleOf?: number;

  // type: object
  /** Описание параметров type: object */
  properties?: Record<string, JSONSchema>;
  /** Массив обязательных полей type: object */
  required?: MaybeReadonlyArray<string>;
  /** Возможно указывать поля не указанные в схеме */
  additionalProperties?: JSONSchema;
  /** Максимальное ко-во параметров */
  maxProperties?: number;
  /** Минимальное ко-во параметров */
  minProperties?: number;
  /** Указание описания типов по регулярному выражению для имени поля. type: object */
  patternProperties?: Record<string, JSONSchema>;
  /** Регулярное выражение для имени параметра type: object */
  propertyNames?: JSONSchema;

  // type: array
  // contains
  contains?: JSONSchema<Value, SchemaType>;
  /** Максимальное количество элементов которое должно встретиться при указании contains */
  maxContains?: number;
  /** Минимальное количество элементов которое должно встретиться при указании contains */
  minContains?: number;
  // items
  items?: JSONSchema;
  /** Максимальное значение элементов в массиве */
  maxItems?: number;
  /** Минимальное значение элементов в массиве */
  minItems?: number;
  /** Описание tuple для типа array */
  prefixItems?: MaybeReadonlyArray<JSONSchema> | JSONSchema;
  /** Элементы в массиве должны быть уникальными */
  uniqueItems?: boolean;
};

// -----------------------------------------------------------------------------

export namespace JSONSchema {
  export type TypeValue = (
    | ValueOf<TypeName>
    | TypeName
    | Array<ValueOf<TypeName> | TypeName>
    | ReadonlyArray<ValueOf<TypeName> | TypeName>
  );

  /**
   * JSON Schema interface
   */
  export type Interface<
    Value = any,
    SchemaType extends TypeValue = TypeValue,
  > = Exclude<
    JSONSchema<Value, SchemaType>,
    boolean
  >;

  export type Array<T = any> = Pick<
    Interface<T, "array">,
    KeywordByType.Any | KeywordByType.Array
  >;

  export type Boolean = Pick<
    Interface<boolean, "boolean">,
    KeywordByType.Any
  >;

  export type Integer = Pick<
    Interface<number, "integer">,
    KeywordByType.Any | KeywordByType.Number
  >;

  export type Number = Pick<
    Interface<number, "number">,
    KeywordByType.Any | KeywordByType.Number
  >;

  export type Null = Pick<
    Interface<null, "null">,
    KeywordByType.Any
  >;

  export type Object<T = any> = Pick<
    Interface<T, "object">,
    KeywordByType.Any | KeywordByType.Object
  >;

  export type String = Pick<
    Interface<string, "string">,
    KeywordByType.Any | KeywordByType.String
  >;
}

namespace KeywordByType {
  export type Any =
    | "allOf"
    | "oneOf"
    | "anyOf"
    | "not"
    | "default"
    | "deprecated"
    | "description"
    | "enum"
    | "format"
    | "type"

  export type Array =
    | "items"
    | "maxItems"
    | "minItems"
    | "contains"
    | "maxContains"
    | "minContains"
    | "prefixItems"
    | "uniqueItems";

  export type Number =
    | "exclusiveMaximum"
    | "exclusiveMinimum"
    | "maximum"
    | "minimum"
    | "multipleOf";

  export type Object =
    | "additionalProperties"
    | "maxProperties"
    | "minProperties"
    | "patternProperties"
    | "properties"
    | "propertyNames"
    | "required"

  export type String =
    | "maxLength"
    | "minLength"
    | "pattern";
}

export const Format = {
  Date: "date",
  DateTime: "date-time",
  Duration: "duration",
  Email: "email",
  Hostname: "hostname",
  IDNEmail: "idn-email",
  IDNHostname: "idn-hostname",
  IPv4: "ipv4",
  IPv6: "ipv6",
  IRI: "iri",
  IRIReference: "iri-reference",
  JSONPointer: "json-pointer",
  JSONPointerURIFragment: "json-pointer-uri-fragment",
  RegEx: "regex",
  RelativeJSONPointer: "relative-json-pointer",
  Time: "time",
  URI: "uri",
  URIReference: "uri-reference",
  URITemplate: "uri-template",
  UUID: "uuid",
} as const;
export type Format = ValueOf<typeof Format>;

export const TypeName = {
  Array: "array",
  Boolean: "boolean",
  Integer: "integer",
  Null: "null",
  Number: "number",
  Object: "object",
  String: "string",
} as const;
export type TypeName = ValueOf<typeof TypeName>;
