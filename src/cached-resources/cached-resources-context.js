import { createContext } from 'react'

const CachedResourcesContext = createContext({
    me: {},
    systemInfo: {},
})

export { CachedResourcesContext }
