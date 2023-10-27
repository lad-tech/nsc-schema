import { MaybeReadonlyArray, ValueOf } from "../types";

export type JSONSchema = SchemaNumber | SchemaString | SchemaBoolean | SchemaNull | SchemaObject | SchemaArray | SchemaTypeOfArray;

type JSONSchemaAll = {
  /** Возможные типы null | boolean | object | array | number | string | integer */
  type: TypeName | TypeName[];
  /** Описание для схемы */
  description: string;
  /** Указанная схема находится в статусе deprecated */
  deprecated?: boolean;
  /** Перечисление возможны значений */
  enum?: any; // TODO[cleverid]: Сделать проверку в зависимости от типа
  /** Значение по умолчанию */
  default?: any; // TODO[cleverid]: Сделать проверку в зависимости от типа
  // Различные виды схем
  allOf?: MaybeReadonlyArray<JSONSchema>;
  anyOf?: MaybeReadonlyArray<JSONSchema>;
  oneOf?: MaybeReadonlyArray<JSONSchema>;
  not?: JSONSchema;

  // String
  /** Максимальное количество символов в строке */
  maxLength?: number;
  /** Минимальное количество символов в строке */
  minLength?: number;
  /** Регулярное выражение для type string */
  pattern?: string;
  /** Формат строки */
  format?: Format;

  // Number 
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

  // Object
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

  // Array
  /** Схема для описания элемента массива */
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

interface SchemaNumber extends Pick<JSONSchemaAll, FieldsAny | FieldsNumber> { type: 'number' | 'integer' }
interface SchemaString extends Pick<JSONSchemaAll, FieldsAny | FieldsString> { type: 'string' }
interface SchemaBoolean extends Pick<JSONSchemaAll, FieldsAny> { type: 'boolean' }
interface SchemaNull extends Pick<JSONSchemaAll, FieldsAny> { type: 'null' }
interface SchemaObject extends Pick<JSONSchemaAll, FieldsAny | FieldsObject> { type: 'object' }
interface SchemaArray extends Pick<JSONSchemaAll, FieldsAny | FieldsArray> { type: 'array' }
interface SchemaTypeOfArray extends JSONSchemaAll { type: TypeName[] }

type FieldsAny =
    | "deprecated"
    | "description"
    | "type"
    | "allOf"
    | "anyOf"
    | "oneOf"
    | "not";

type FieldsNumber =
    | "exclusiveMaximum"
    | "exclusiveMinimum"
    | "maximum"
    | "minimum"
    | "multipleOf";

type FieldsString =
    | "format"
    | "maxLength"
    | "minLength"
    | "pattern";

type FieldsObject =
    | "required"
    | "additionalProperties"
    | "maxProperties"
    | "minProperties"
    | "patternProperties"
    | "properties"
    | "propertyNames"

type FieldsArray =
    | "items"
    | "maxItems"
    | "minItems"
    | "prefixItems"
    | "uniqueItems";

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
