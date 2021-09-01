import { useConfig } from '@dhis2/app-runtime'

export const useServerDateTimeAsLocal = dateTime => {
    const { systemInfo } = useConfig()
    const timestamp = new Date(dateTime).getTime()
    const localNow = new Date()
    const nowAtServerTimeZone = new Date(
        localNow.toLocaleString('en-US', {
            timeZone: systemInfo.serverTimeZoneId,
        })
    )
    const timeOffset = localNow.getTime() - nowAtServerTimeZone.getTime()

    return new Date(timestamp + timeOffset)
}
