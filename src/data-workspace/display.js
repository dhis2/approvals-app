import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { Card } from '@dhis2/ui'

const Display = ({ workflowName, dataSetId }) => {
    if (true || !dataSetId) {
        return (
            <Card>
                <h2>{i18n.t('Choose a data set to review')}</h2>
                <p>{i18n.t('{{- workflowName}} has multiple data sets. Choose a data set from the tabs above.', { workflowName })}</p>
            </Card>
        )
    }

    return null
}

Display.propTypes = {
    workflowName: PropTypes.string.isRequired,
    dataSetId: PropTypes.string,
}

export { Display }
