export interface MethodSchema {}

export type ValueOf<T> = T[keyof T];

/** Можно указать поле которое обязательное в типе */
export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;
