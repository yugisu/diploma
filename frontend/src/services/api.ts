import ky from 'ky'
import { whitelistedUrlPatterns } from '@diploma/shared'

const SERVER_URL = import.meta.env.SNOWPACK_PUBLIC_SERVER_URL

const apiUrl = `${SERVER_URL}/api`

const api = ky.extend({
  prefixUrl: apiUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        // Attach auth token to all requests except whitelisted ones
        if (
          !whitelistedUrlPatterns.some((pattern) =>
            typeof pattern === 'string' ? request.url.endsWith(pattern) : pattern.test(request.url),
          )
        ) {
          const token = localStorage.getItem('identity')

          if (token) {
            request.headers.append('Authorization', `Bearer ${token}`)
          }
        }
      },
    ],
  },
})

export { api }
