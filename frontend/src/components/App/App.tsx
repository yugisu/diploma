import React from 'react'

import { getGreeting } from 'utils/greeting'

export const App = () => {
  return <code>{getGreeting()}</code>
}
