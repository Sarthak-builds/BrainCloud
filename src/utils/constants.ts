export const CONTENT_TYPES = {
  BOOKMARK: 'bookmark',
  NOTE: 'note',
  ARTICLE: 'article',
  VIDEO: 'video',
} as const; 

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;