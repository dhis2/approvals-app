import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { ContextSelect } from '../context-select/index.js'
import { useSelectionContext } from '../selection/index.js'

const PERIOD = 'PERIOD'

const PeriodSelect = () => {
    const { period, workflow, selectPeriod, openedSelect, setOpenedSelect } =
        useSelectionContext()
    const open = openedSelect === PERIOD
    const value = period.displayName || i18n.t('Choose a period')

    return (
        <ContextSelect
            label={i18n.t('Period')}
            value={value}
            open={open}
            disabled={!workflow.id}
            onOpen={() => setOpenedSelect(PERIOD)}
            onClose={() => setOpenedSelect('')}
            tooltipContent={i18n.t('Choose a workflow first')}
        >
            <pre>
                Period picker placeholder <br />
                <button
                    onClick={() =>
                        selectPeriod({
                            code: '20210404',
                            displayName: '04-04-2020',
                        })
                    }
                >
                    Set period to sth
                </button>
            </pre>
        </ContextSelect>
    )
}

export { PeriodSelect }
