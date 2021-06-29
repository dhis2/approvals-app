import i18n from '@dhis2/d2-i18n'
import React, { useEffect, useState } from 'react'
import { ContextSelect } from '../context-select/index.js'
import { useSelectionContext } from '../selection/index.js'
import { PeriodMenu } from './period-menu.js'
import { YearNavigator } from './year-navigator.js'

const PERIOD = 'PERIOD'

const PeriodSelect = () => {
    const { period, workflow, selectPeriod, openedSelect, setOpenedSelect } =
        useSelectionContext()
    const [year, setYear] = useState(period.year || new Date().getFullYear())
    const open = openedSelect === PERIOD
    const value = period.displayName || i18n.t('Choose a period')

    useEffect(() => {
        if (period.year) {
            setYear(period.year)
        }
    }, [period])

    return (
        <ContextSelect
            prefix={i18n.t('Period')}
            value={value}
            open={open}
            disabled={!workflow.id}
            onOpen={() => setOpenedSelect(PERIOD)}
            onClose={() => setOpenedSelect('')}
            requiredValuesMessage={i18n.t('Choose a workflow first')}
        >
            <YearNavigator
                year={year}
                onYearChange={year => {
                    selectPeriod({})
                    setYear(year)
                }}
            />
            <PeriodMenu periodType={workflow.periodType} year={year} />
        </ContextSelect>
    )
}

export { PeriodSelect }
