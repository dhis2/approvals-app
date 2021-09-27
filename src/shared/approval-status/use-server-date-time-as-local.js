import { useConfig } from '@dhis2/app-runtime'

const msPerHr = 1000 * 60 * 60

export const useServerDateTimeAsLocal = dateTime => {
    const { systemInfo } = useConfig()
    const localNow = new Date()
    const nowAtServerTimeZone = new Date(
        localNow.toLocaleString('en-US', {
            timeZone: systemInfo.serverTimeZoneId,
        })
    )
    const timestamp = new Date(dateTime).getTime()
    const timeOffset = localNow.getTime() - nowAtServerTimeZone.getTime()
    const timeOffsetRoundedToHours = Math.round(timeOffset / msPerHr) * msPerHr

    return new Date(timestamp + timeOffsetRoundedToHours)
}
