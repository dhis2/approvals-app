import { useConfig } from '@dhis2/app-runtime'
import { useServerDateTimeAsLocal } from './use-server-date-time-as-local.js'

jest.mock('@dhis2/app-runtime', () => ({
    useConfig: jest.fn(),
}))

describe('useServerDateTimeAsLocal hook', () => {
    /**
     * Client timezone is set to Etc/UTC when starting the test runner
     * See `package.json`:
     * "test": "TZ=Etc/UTC d2-app-scripts test",
     */
    it('Converts correctly if on server time', () => {
        useConfig.mockReturnValueOnce({
            systemInfo: { serverTimeZoneId: 'Etc/UCT' },
        })
        const dateStr = '2021-08-31 16:00:00'
        const localDateTime = new Date(dateStr)
        const converted = useServerDateTimeAsLocal(dateStr)
        expect(converted.getHours()).toEqual(localDateTime.getHours())
    })

    describe('timezone IDs unadjusted for daylight saving times', () => {
        it('Converts correctly if ahead of server time', () => {
            useConfig.mockReturnValueOnce({
                systemInfo: { serverTimeZoneId: 'Etc/GMT-9' },
            })
            const dateStr = '2021-08-31 16:00:00'
            const localDateTime = new Date(dateStr)
            const converted = useServerDateTimeAsLocal(dateStr)
            expect(converted.getHours()).toEqual(localDateTime.getHours() - 9)
        })

        it('Converts correctly if behind on server time', () => {
            useConfig.mockReturnValueOnce({
                systemInfo: { serverTimeZoneId: 'Etc/GMT+4' },
            })
            const dateStr = '2021-08-31 16:00:00'
            const localDateTime = new Date(dateStr)
            const converted = useServerDateTimeAsLocal(dateStr)
            expect(converted.getHours()).toEqual(localDateTime.getHours() + 4)
        })
    })

    describe('timezone IDs adjusted for daylight saving times', () => {
        it('Converts correctly if ahead of server time', () => {
            useConfig.mockReturnValueOnce({
                systemInfo: { serverTimeZoneId: 'Europe/Amsterdam' },
            })
            const dateStr = '2021-08-31 16:00:00'
            const localDateTime = new Date(dateStr)
            const converted = useServerDateTimeAsLocal(dateStr)
            const hourOffset = localDateTime.getHours() - converted.getHours()
            expect([1, 2]).toContain(hourOffset)
        })

        it('Converts correctly if behind on server time', () => {
            useConfig.mockReturnValueOnce({
                systemInfo: { serverTimeZoneId: 'America/Chihuahua' },
            })
            const dateStr = '2021-08-31 16:00:00'
            const localDateTime = new Date(dateStr)
            const converted = useServerDateTimeAsLocal(dateStr)
            const hourOffset = localDateTime.getHours() - converted.getHours()
            expect([-7, -6]).toContain(hourOffset)
        })
    })

    it('will throw an error if the server timezone ID is invalid', () => {
        useConfig.mockReturnValueOnce({
            systemInfo: { serverTimeZoneId: 'I_DO_NOT_EXISTS' },
        })
        expect(() =>
            useServerDateTimeAsLocal('2021-08-31 16:00:00')
        ).toThrowError('Invalid time zone specified: I_DO_NOT_EXISTS')
    })

    describe('day transitions', () => {
        it('only changes hours when in the middle of the day', () => {
            useConfig.mockReturnValueOnce({
                systemInfo: { serverTimeZoneId: 'Etc/GMT-2' },
            })
            const dateStr = '2021-08-31 16:00:00'
            const localDateTime = new Date(dateStr)
            const converted = useServerDateTimeAsLocal(dateStr)

            expect(converted.getFullYear()).toEqual(localDateTime.getFullYear())
            expect(converted.getMonth()).toEqual(localDateTime.getMonth())
            expect(converted.getDate()).toEqual(localDateTime.getDate())
            expect(converted.getHours()).toEqual(localDateTime.getHours() - 2)
            expect(converted.getMinutes()).toEqual(localDateTime.getMinutes())
            expect(converted.getSeconds()).toEqual(localDateTime.getSeconds())
        })
        it('changes date and hours when ahead of server time at day start', () => {
            useConfig.mockReturnValueOnce({
                systemInfo: { serverTimeZoneId: 'Etc/GMT-2' },
            })
            const dateStr = '2021-08-31 00:01:00'
            const localDateTime = new Date(dateStr)
            const converted = useServerDateTimeAsLocal(dateStr)

            expect(converted.getFullYear()).toEqual(localDateTime.getFullYear())
            expect(converted.getMonth()).toEqual(localDateTime.getMonth())
            expect(converted.getDate()).toEqual(30)
            expect(converted.getHours()).toEqual(22)
            expect(converted.getMinutes()).toEqual(localDateTime.getMinutes())
            expect(converted.getSeconds()).toEqual(localDateTime.getSeconds())
        })
        it('changes date and hours when behind on server time at day start', () => {
            useConfig.mockReturnValueOnce({
                systemInfo: { serverTimeZoneId: 'Etc/GMT+2' },
            })
            const dateStr = '2021-08-31 23:01:00'
            const localDateTime = new Date(dateStr)
            const converted = useServerDateTimeAsLocal(dateStr)

            expect(converted.getFullYear()).toEqual(localDateTime.getFullYear())
            expect(converted.getMonth()).toEqual(localDateTime.getMonth() + 1)
            expect(converted.getDate()).toEqual(1)
            expect(converted.getHours()).toEqual(1)
            expect(converted.getMinutes()).toEqual(localDateTime.getMinutes())
            expect(converted.getSeconds()).toEqual(localDateTime.getSeconds())
        })
    })
})
