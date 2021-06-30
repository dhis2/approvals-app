import { readQueryParams } from '../../navigation/index.js'
import { parsePeriodId } from '../period-select/index.js'

export const initialValues = workflows => {
    const { wf, pe, ou } = readQueryParams()
    const workflow = initialWorkflowValue(workflows, wf)
    const period = initialPeriodValue(pe, workflow)
    const orgUnit = initialOrgUnitValue(ou)

    return { workflow, period, orgUnit }
}

export const initialWorkflowValue = (workflows, workflowId) => {
    if (workflowId) {
        /*
         * Auto select workflow with query param id
         * default to empty object if `find` returns undefined in case the
         * workflow with the id from the url is not available to the user
         */
        return workflows.find(workflow => workflow.id === workflowId) || {}
    }
    if (workflows.length === 1) {
        // auto-select if user only has one workflow
        return workflows[0]
    }
    return {}
}

const initialPeriodValue = (periodId, initialWorkflow) => {
    if (!periodId || !initialWorkflow.id) {
        return {}
    }

    return parsePeriodId(periodId, [initialWorkflow.periodType]) || {}
}

const initialOrgUnitValue = orgUnitId => {
    return orgUnitId
        ? {
              id: orgUnitId,
          }
        : {}
}
