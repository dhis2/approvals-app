import i18n from '@dhis2/d2-i18n'
import { OrganisationUnitTree } from '@dhis2/ui'
import React, { useEffect } from 'react'
import { useAppContext } from '../../app-context/index.js'
import { useSelectionContext } from '../../selection-context/index.js'
import { ContextSelect } from '../context-select/index.js'
import { ApprovalStatusLabel } from './approval-status-label.js'
import { useApprovalStatuses } from './approval-statuses.js'
import classes from './org-unit-select.module.css'

export const ORG_UNIT = 'ORG_UNIT'

const OrgUnitSelect = () => {
    const { fetchApprovalStatuses } = useApprovalStatuses()
    const { organisationUnits } = useAppContext()
    const {
        orgUnit,
        selectOrgUnit,
        workflow,
        period,
        openedSelect,
        setOpenedSelect,
    } = useSelectionContext()
    const open = openedSelect === ORG_UNIT
    const value = orgUnit?.displayName
    const requiredValuesMessage = workflow?.id
        ? i18n.t('Choose a period first')
        : i18n.t('Choose a workflow and period first')
    const roots = organisationUnits.map(({ id }) => id)
    const onChange = ({ displayName, id, path }) => {
        selectOrgUnit({ displayName, id, path })
    }
    const selectedOrgUnitPath = orgUnit?.path ? [orgUnit.path] : undefined

    useEffect(() => {
        if (period?.id && workflow?.id) {
            fetchApprovalStatuses({
                periodId: period.id,
                workflowId: workflow.id,
                orgUnitIds: roots,
            })
        }
    }, [...roots, period?.id, workflow?.id])

    return (
        <ContextSelect
            prefix={i18n.t('Organisation Unit')}
            placeholder={i18n.t('Choose an organisation unit')}
            value={value}
            open={open}
            disabled={!(workflow?.id && period?.id)}
            onOpen={() => setOpenedSelect(ORG_UNIT)}
            onClose={() => setOpenedSelect('')}
            requiredValuesMessage={requiredValuesMessage}
        >
            <div className={classes.scrollbox}>
                <OrganisationUnitTree
                    roots={roots}
                    onChange={onChange}
                    initiallyExpanded={selectedOrgUnitPath}
                    selected={selectedOrgUnitPath}
                    singleSelection
                    renderNodeLabel={({ label, node }) => (
                        <ApprovalStatusLabel
                            label={label}
                            orgUnitId={node.id}
                        />
                    )}
                    onChildrenLoaded={({ children }) => {
                        const orgUnitIds = children.map(({ id }) => id)
                        if (orgUnitIds.length > 0) {
                            fetchApprovalStatuses({
                                workflowId: workflow.id,
                                periodId: period.id,
                                orgUnitIds,
                            })
                        }
                    }}
                />
            </div>
        </ContextSelect>
    )
}

export { OrgUnitSelect }
