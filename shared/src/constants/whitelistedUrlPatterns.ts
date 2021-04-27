/**
 * List of api endpoints not guarded by authentication
 */
export const whitelistedUrlPatterns: (RegExp | string)[] = [/^\/api\/auth(?!\/logout)/]
