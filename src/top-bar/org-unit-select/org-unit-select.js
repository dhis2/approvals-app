import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { ContextSelect } from '../context-select/index.js'
import { useSelection } from '../selection/index.js'

const ORG_UNIT = 'ORG_UNIT'

const OrgUnitSelect = () => {
    const {
        orgUnit /*, setOrgUnit */,
        workflow,
        period,
        openedSelect,
        setOpenedSelect,
    } = useSelection()
    const open = openedSelect === ORG_UNIT
    const value = orgUnit.name || i18n.t('Choose an organisation unit')
    const tooltipContent = workflow.id
        ? i18n.t('Choose a period first')
        : i18n.t('Choose a workflow and period first')

    return (
        <ContextSelect
            label={i18n.t('Organisation Unit')}
            value={value}
            open={open}
            disabled={!(workflow.id && period.code)}
            onOpen={() => setOpenedSelect(ORG_UNIT)}
            onClose={() => setOpenedSelect('')}
            tooltipContent={tooltipContent}
        >
            <pre>Org Unit picker placeholder</pre>
        </ContextSelect>
    )
}

export { OrgUnitSelect }
