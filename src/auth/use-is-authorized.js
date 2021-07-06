import { useAppContext } from '../app-context/index.js'

export const useIsAuthorized = () => {
    const { authorities } = useAppContext()
    return authorities.some(
        authority => authority === 'ALL' || authority === 'M_dhis-web-approval'
    )
}
