import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './display.module.css'

const Display = ({ workflowName, dataSetId }) => {
    if (!dataSetId) {
        return (
            <div className={styles.chooseDataSet}>
                <h2>{i18n.t('Choose a data set to review')}</h2>
                <p>
                    {i18n.t(
                        '{{- workflowName}} has multiple data sets. Choose a data set from the tabs above.',
                        { workflowName }
                    )}
                </p>
            </div>
        )
    }

    return (
        <div className={styles.display}>
            <p>Test</p>
        </div>
    )
}

Display.propTypes = {
    workflowName: PropTypes.string.isRequired,
    dataSetId: PropTypes.string,
}

export { Display }
