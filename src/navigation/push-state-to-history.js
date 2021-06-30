import { stringify } from 'query-string'
import { history } from './history.js'

export const pushStateToHistory = state => {
    const search = `?${stringify({
        wf: state.workflow.id,
        pe: state.period.id,
        ou: state.orgUnit.path,
    })}`

    // Only push if the search string changes
    if (search !== history.location.search) {
        history.push({
            pathname: '/',
            search,
        })
    }
}
