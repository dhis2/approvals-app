import { PropTypes } from '@dhis2/prop-types'
import React, { useEffect, useReducer } from 'react'
import { useQueryParams, StringParam } from 'use-query-params'
import { useCurrentUser } from '../../current-user/index.js'
import { initialValues, initialWorkflowValue } from './initial-values.js'
import { SelectionContext } from './selection-context.js'

const ACTIONS = {
    SET_OPENED_SELECT: 'SET_OPENED_SELECT',
    CLEAR_ALL: 'CLEAR_ALL',
    SELECT_WORKFLOW: 'SELECT_WORKFLOW',
    SELECT_PERIOD: 'SELECT_PERIOD',
    SELECT_ORG_UNIT: 'SELECT_ORG_UNIT',
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.SET_OPENED_SELECT:
            return {
                ...state,
                openedSelect: payload.openedSelect,
            }
        case ACTIONS.CLEAR_ALL:
            return {
                openedSelect: '',
                workflow: payload.workflow,
                period: {},
                orgUnit: {},
            }
        case ACTIONS.SELECT_WORKFLOW:
            return {
                openedSelect: '',
                workflow: payload.workflow,
                period: {},
                orgUnit: {},
            }
        case ACTIONS.SELECT_PERIOD:
            return {
                ...state,
                /*
                 * Close dropdown only if selecting a period,
                 * not when unsetting it when the year changes
                 */
                openedSelect: payload.period.id ? '' : state.openedSelect,
                period: payload.period,
                orgUnit: {},
            }
        case ACTIONS.SELECT_ORG_UNIT:
            return {
                ...state,
                openedSelect: '',
                orgUnit: payload.orgUnit,
            }
        default:
            return state
    }
}

const SelectionProvider = ({ children }) => {
    const [query, setQuery] = useQueryParams({
        wf: StringParam,
        pe: StringParam,
        ou: StringParam,
    })
    const { dataApprovalWorkflows } = useCurrentUser()
    const [{ openedSelect, workflow, period, orgUnit }, dispatch] = useReducer(
        reducer,
        {
            openedSelect: '',
            ...initialValues(query, dataApprovalWorkflows),
        }
    )
    const providerValue = {
        workflow,
        period,
        orgUnit,
        openedSelect,
        clearAll: () =>
            dispatch({
                type: ACTIONS.CLEAR_ALL,
                payload: {
                    workflow: initialWorkflowValue(dataApprovalWorkflows),
                },
            }),
        setOpenedSelect: fieldName =>
            dispatch({
                type: ACTIONS.SET_OPENED_SELECT,
                payload: {
                    openedSelect: fieldName,
                },
            }),
        selectWorkflow: workflow =>
            dispatch({ type: ACTIONS.SELECT_WORKFLOW, payload: { workflow } }),
        selectPeriod: period =>
            dispatch({ type: ACTIONS.SELECT_PERIOD, payload: { period } }),
        selectOrgUnit: orgUnit =>
            dispatch({ type: ACTIONS.SELECT_ORG_UNIT, payload: { orgUnit } }),
    }

    useEffect(() => {
        setQuery(
            {
                wf: workflow.id,
                pe: period.id,
                ou: orgUnit.id,
            },
            /*
             * Browser navigation is broken in the current implementation of
             * this provider, but deep linking does work. Until a fix is found
             * for browser navigation we stick to `UrlUpdateType` `replace`,
             * which effectively disables navigating to the previous query
             * param string.
             */
            'replace'
        )
    }, [workflow, period, orgUnit])

    return (
        <SelectionContext.Provider value={providerValue}>
            {children}
        </SelectionContext.Provider>
    )
}

SelectionProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { SelectionProvider }
