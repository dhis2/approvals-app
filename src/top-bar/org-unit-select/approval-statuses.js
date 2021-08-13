import { useDataEngine } from '@dhis2/app-runtime'
import React, { createContext, useContext, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const ApprovalStatusesContext = createContext()

const useApprovalStatusesContext = () => useContext(ApprovalStatusesContext)

class ApprovalStatusesMap {
    constructor(map) {
        this._map = map || new Map()
    }

    _serialiseKey({ workflowId, periodId, orgUnitId }) {
        return `${workflowId}-${periodId}-${orgUnitId}`
    }

    set(key, status) {
        this._map.set(this._serialiseKey(key), status)
    }

    get(key) {
        return this._map.get(this._serialiseKey(key))
    }

    clone() {
        return new ApprovalStatusesMap(new Map(this._map))
    }
}

export const ApprovalStatusesProvider = ({ children }) => {
    const [approvalStatuses, setApprovalStatuses] = useState(
        new ApprovalStatusesMap()
    )

    const updateApprovalStatuses = ({
        workflowId,
        periodId,
        approvalStatusUpdates,
    }) => {
        setApprovalStatuses(approvalStatuses => {
            const newApprovalStatuses = approvalStatuses.clone()
            for (const [orgUnitId, status] of Object.entries(
                approvalStatusUpdates
            )) {
                newApprovalStatuses.set(
                    { workflowId, periodId, orgUnitId },
                    status
                )
            }
            return newApprovalStatuses
        })
    }

    return (
        <ApprovalStatusesContext.Provider
            value={{ approvalStatuses, updateApprovalStatuses }}
        >
            {children}
        </ApprovalStatusesContext.Provider>
    )
}

// Debounced version
const useFetchApprovalStatuses = ({ updateApprovalStatuses }) => {
    const engine = useDataEngine()
    const requestQueue = useRef([])
    const fetchApprovalStatuses = useDebouncedCallback(() => {
        const queries = []
        requestQueue.current.forEach(query => {
            const existingQuery = queries.find(({ workflowId, periodId }) => {
                return (
                    workflowId === query.workflowId &&
                    periodId === query.periodId
                )
            })
            if (existingQuery) {
                existingQuery.orgUnitIds.concat(query.orgUnitIds)
            } else {
                queries.push(query)
            }
        })
        requestQueue.current = []

        queries.forEach(({ workflowId, periodId, orgUnitIds }) => {
            engine
                .query({
                    approvalStatuses: {
                        resource: 'dataApprovals/approvals',
                        params: {
                            wf: workflowId,
                            pe: periodId,
                            ou: orgUnitIds,
                        },
                    },
                })
                .then(({ approvalStatuses }) => {
                    const updateObject = {}
                    approvalStatuses.forEach(({ ou, state }) => {
                        updateObject[ou] = state
                    })
                    updateApprovalStatuses({
                        periodId,
                        workflowId,
                        approvalStatusUpdates: updateObject,
                    })
                })
        })
    }, 250)

    return ({ workflowId, periodId, orgUnitIds }) => {
        requestQueue.current.push({
            periodId,
            workflowId,
            orgUnitIds,
        })
        fetchApprovalStatuses()
    }
}

// Non-debounced version
const _useFetchApprovalStatuses = ({ updateApprovalStatuses }) => {
    const engine = useDataEngine()
    return async ({ workflowId, periodId, orgUnitIds }) => {
        const { approvalStatuses } = await engine.query({
            approvalStatuses: {
                resource: 'dataApprovals/approvals',
                params: {
                    wf: workflowId,
                    pe: periodId,
                    ou: orgUnitIds,
                },
            },
        })

        const updateObject = {}
        approvalStatuses.forEach(({ ou, state }) => {
            updateObject[ou] = state
        })
        updateApprovalStatuses({
            periodId,
            workflowId,
            approvalStatusUpdates: updateObject,
        })
    }
}

export const useApprovalStatuses = () => {
    const { approvalStatuses, updateApprovalStatuses } =
        useApprovalStatusesContext()
    const fetchApprovalStatuses = useFetchApprovalStatuses({
        updateApprovalStatuses,
    })

    return {
        getApprovalStatus: ({ workflowId, periodId, orgUnitId }) => {
            return approvalStatuses.get({
                workflowId,
                periodId,
                orgUnitId,
            })
        },
        fetchApprovalStatuses,
    }
}
