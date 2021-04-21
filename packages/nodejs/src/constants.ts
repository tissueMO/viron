export const COLOR = {
  WHITE: 'white',
  BLACK: 'black',
  PURPLE: 'purple',
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
  GRAY: 'gray',
} as const;
export type Color = typeof COLOR[keyof typeof COLOR];

export const THEME = {
  STANDARD: 'standard',
  MIDNIGHT: 'midnight',
  TERMINAL: 'terminal',
} as const;
export type Theme = typeof THEME[keyof typeof THEME];

export const SECTION = {
  MANAGE: 'manage',
  DASHBOARD: 'dashboard',
} as const;
export type Section = typeof SECTION[keyof typeof SECTION];

export const API_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as const;
export type ApiMethod = typeof API_METHOD[keyof typeof API_METHOD];

export const QUERY_TYPE = {
  STRING: 'string',
  INTEGER: 'integer',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  DATETIME: 'datetime',
  TIME: 'time',
} as const;
export type QueryType = typeof QUERY_TYPE[keyof typeof QUERY_TYPE];

export const STYLE = {
  NUMBER: 'number',
  LIST: 'list',
  TABLE: 'table',
  CHART: 'chart',
  EXPLORER: 'explorer',
};
export type Style = typeof STYLE[keyof typeof STYLE];

export const AUTH_TYPE = {
  EMAIL: 'email',
  OAUTH: 'oauth',
  SIGNOUT: 'signout',
};
export type AuthTypeType = typeof AUTH_TYPE[keyof typeof AUTH_TYPE];

export const AUTH_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};
export type AuthTypeMethod = typeof AUTH_METHOD[keyof typeof AUTH_METHOD];

export const STORE_TYPE = {
  MYSQL: 'mysql',
  MONGO: 'mongo',
} as const;
export type StoreType = typeof STORE_TYPE[keyof typeof STORE_TYPE];

export const HTTP_HEADER = {
  X_VIRON_AUTHTYPES_PATH: 'X-Viron-Authtypes-Path',
  ACCESS_CONTROL_ALLOW_ORIGIN: 'Access-Control-Allow-Origin',
  ACCESS_CONTROL_ALLOW_CREDENTIALS: 'Access-Control-Allow-Credentials',
  ACCESS_CONTROL_ALLOW_METHODS: 'Access-Control-Allow-Methods',
  ACCESS_CONTROL_ALLOW_HEADERS: 'Access-Control-Allow-Headers',
  ACCESS_CONTROL_EXPOSE_HEADERS: 'Access-Control-Expose-Headers',
} as const;
export type HttpHeader = typeof HTTP_HEADER[keyof typeof HTTP_HEADER];

export const DEFAULT_PAGER_LIMIT = 10;
export const DEFAULT_PAGER_OFFSET = 0;

export const ACCESS_CONTROL_ALLOW_HEADERS = [
  'X-Requested-With',
  'Origin',
  'Authorization',
] as const;

export const ACCESS_CONTROL_EXPOSE_HEADERS = [
  'Content-Disposition',
  'X-Requested-With',
  'Origin',
  'Authorization',
] as const;

export const ACCESS_CONTROL_ALLOW_METHODS = [
  'GET',
  'PUT',
  'POST',
  'DELETE',
  'HEAD',
  'OPTIONS',
] as const;

export const ACCESS_CONTROL_ALLOW_CREDENTIALS = 'true';