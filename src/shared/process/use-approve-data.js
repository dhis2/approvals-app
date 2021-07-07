import { useDataMutation } from '@dhis2/app-runtime'

export const APPROVE_DATA_MUTATION = {
    resource: 'dataApprovals',
    type: 'create',
    data: ({ wf, pe, ou }) => ({ wf, pe, ou }),
}

export const useApproveData = () => useDataMutation(APPROVE_DATA_MUTATION)
