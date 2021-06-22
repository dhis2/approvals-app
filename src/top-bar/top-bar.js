import React from 'react'
import { ClearAllButton } from './clear-all-button/index.js'
import { OrgUnitSelect } from './org-unit-select/org-unit-select.js'
import { PeriodSelect } from './period-select/period-select.js'
import { SelectionProvider } from './selection/index.js'
import { WorkflowSelect } from './workflow-select/index.js'

const TopBar = () => (
    <SelectionProvider>
        <WorkflowSelect />
        <PeriodSelect />
        <OrgUnitSelect />
        <ClearAllButton />
    </SelectionProvider>
)

export { TopBar }
