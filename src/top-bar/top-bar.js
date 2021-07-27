import React from 'react'
import { ClearAllButton } from './clear-all-button/index.js'
import { OrgUnitSelect } from './org-unit-select/index.js'
import { PeriodSelect } from './period-select/index.js'
import { WorkflowSelect } from './workflow-select/index.js'

const TopBar = () => (
    <>
        <WorkflowSelect />
        <PeriodSelect />
        <OrgUnitSelect />
        <ClearAllButton />
    </>
)

export { TopBar }
