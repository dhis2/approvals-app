import i18n from '@dhis2/d2-i18n'
import { IconDimensionDataSet16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { StatusTag } from '../shared/status-tag/index.js'
import styles from './title-bar.module.css'

const TitleBar = ({ name, dataSetsCount, approvalState }) => (
    <div className={styles.titleBar}>
        <span className={styles.workflowName}>{name}</span>
        <span className={styles.workflowDataSetsCount}>
            <IconDimensionDataSet16 />
            {i18n.t('{{dataSetsCount}} data sets', {
                dataSetsCount,
            })}
        </span>
        <StatusTag approvalState={approvalState} />
    </div>
)

TitleBar.propTypes = {
    approvalState: PropTypes.string.isRequired,
    dataSetsCount: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}

export { TitleBar }
