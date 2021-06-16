import { useCurrentUser } from '../current-user'

export const useIsAuthorized = () => {
    const { authorities } = useCurrentUser()
    return authorities.some(
        authority => authority === 'ALL' || authority === 'M_dhis-web-approval'
    )
}
