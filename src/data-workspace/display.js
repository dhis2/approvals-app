import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { NoticeBox, CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import styles from './display.module.css'

const query = {
    dataSetReport: {
        resource: 'dataSetReport',
        params: ({ ds, pe, ou }) => ({
            ds,
            pe,
            ou,
        }),
    },
}

const Display = ({ workflowName, periodId, organisationUnitId, dataSetId }) => {
    const { called, loading, data, error, refetch } = useDataQuery(query, {
        lazy: true,
    })
    const dataSetReport = data?.dataSetReport[0]
    const fetchDataSet = () => {
        refetch({
            ds: dataSetId,
            pe: periodId,
            ou: organisationUnitId,
        })
    }

    useEffect(() => {
        if (!dataSetId) {
            return
        }
        fetchDataSet()
    }, [dataSetId])

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

    if (error) {
        return (
            <div className={styles.display}>
                <NoticeBox
                    error
                    title={i18n.t(
                        'There was a problem displaying this data set'
                    )}
                >
                    <p>
                        {i18n.t(
                            `This data set couldn't be loaded or displayed. Try again, or contact your system administrator.`
                        )}
                    </p>
                    <button
                        className={styles.retryButton}
                        onClick={fetchDataSet}
                    >
                        Retry loading data set
                    </button>
                </NoticeBox>
            </div>
        )
    }

    if (!called || loading) {
        return (
            <div className={styles.display}>
                <div className={styles.loadingWrapper}>
                    <CircularLoader small />
                    {i18n.t('Loading data set')}
                </div>
            </div>
        )
    }

    if (dataSetReport.rows.length === 0) {
        return (
            <div className={styles.noData}>
                <p>
                    {i18n.t(
                        `This data set doesn't have any data for the currently selected period and organisation unit.`
                    )}
                </p>
            </div>
        )
    }

    return (
        <div className={styles.display}>
            <pre>{JSON.stringify(dataSetReport, null, 4)}</pre>
        </div>
    )
}

Display.propTypes = {
    organisationUnitId: PropTypes.string.isRequired,
    periodId: PropTypes.string.isRequired,
    workflowName: PropTypes.string.isRequired,
    dataSetId: PropTypes.string,
}

export { Display }
