import { useContext } from 'react'
import { CachedResourcesContext } from './cached-resources-context'

export const useSystemVersion = () => {
    const store = useContext(CachedResourcesContext)
    return parseInt(store.systemVersion?.split(/\.|-/)[1])
}

export const useCurrentUser = () => {
    const store = useContext(CachedResourcesContext)
    return store.me
}

export const useIsAuthorized = () => {
    const { authorities } = useCurrentUser()
    return authorities.some(
        authority => authority === 'ALL' || authority === 'M_dhis-web-approval'
    )
}
