import { useAppData } from '../app-data/index.js'

export const useIsAuthorized = () => {
    const { authorities } = useAppData()
    return authorities.some(
        authority => authority === 'ALL' || authority === 'M_dhis-web-approval'
    )
}
