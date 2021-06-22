import { PropTypes } from '@dhis2/prop-types'
import React, { useState, useEffect } from 'react'
import { useQueryParams, StringParam } from 'use-query-params'
import { useCurrentUser } from '../../current-user/index.js'
import { SelectionContext } from './selection-context.js'

// TODO: should take a periodCode and return a period object
const parsePeriodCode = code => ({
    code: code,
    name: code,
})

const SelectionProvider = ({ children }) => {
    const [query, setQuery] = useQueryParams({
        wf: StringParam,
        pe: StringParam,
        ou: StringParam,
    })

    const { dataApprovalWorkflows } = useCurrentUser()
    const [openedSelect, setOpenedSelect] = useState('')
    const [workflow, setWorkflow] = useState(
        () => dataApprovalWorkflows.find(({ id }) => id === query.wf) || {}
    )
    const [period, setPeriod] = useState(() =>
        query.pe ? parsePeriodCode(query.pe) : {}
    )
    const [orgUnit, setOrgUnit] = useState(
        // TODO: implement proper org unit state once we know what we need
        query.ou ? { id: query.ou } : {}
    )

    useEffect(() => {
        setQuery({
            wf: workflow.id,
            pe: period.code,
            ou: orgUnit.id,
        })
    }, [workflow, period, orgUnit])

    const providerValue = {
        workflow,
        period,
        orgUnit,
        openedSelect,
        setOpenedSelect,
        clearAll: () => {
            setOpenedSelect('')
            // clear all by resetting to default value `{}`
            setWorkflow({})
            setPeriod({})
            setOrgUnit({})
        },
        selectWorkflow: workflow => {
            setOpenedSelect('')
            // first field, clear both subsequent fields
            setWorkflow(workflow)
            setPeriod({})
            setOrgUnit({})
        },
        selectPeriod: period => {
            setOpenedSelect('')
            // second field, clear subsequent field
            setPeriod(period)
            setOrgUnit({})
        },
        selectOrgUnit: orgUnit => {
            setOpenedSelect('')
            // last field, no need to clear other fields
            setOrgUnit(orgUnit)
        },
    }

    return (
        <SelectionContext.Provider value={providerValue}>
            {children}
        </SelectionContext.Provider>
    )
}

SelectionProvider.propTypes = {
    children: PropTypes.node,
}

export { SelectionProvider }
