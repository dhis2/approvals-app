import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { NoticeBox, CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useSelectionContext } from '../../selection-context/index.js'
import {
    compareFixedPeriodLength,
    getFixedPeriodsForTypeAndDateRange,
    PERIOD_SHORTER,
} from '../../shared/index.js'
import { useSelectionParams, useSelectedWorkflow } from '../../workflow-context/index.js'
import styles from './display.module.css'
import { Table } from './table.js'

const query = {
    dataSetReport: {
        resource: 'dataSetReport',
        params: ({
            dataSetId,
            period,
            orgUnit,
            workflow,
        }) => {
            let periodIds = [period.id]
            const { dataSets } = workflow
            const selectedDataSet = dataSets.find(({ id }) => id === dataSetId)
            const { periodType: dataSetPeriodType } = selectedDataSet


            const isDataSetPeriodShorter = compareFixedPeriodLength(
                workflow.periodType,
                dataSetPeriodType,
            ) === PERIOD_SHORTER

            if (isDataSetPeriodShorter) {
                periodIds = getFixedPeriodsForTypeAndDateRange(
                    dataSetPeriodType,
                    period.startDate,
                    period.endDate
                )
            }

            return {
                ds: dataSetId,
                pe: periodIds.join(','),
                ou: orgUnit.id,
            }
        },
    },
}

const Display = ({ dataSetId }) => {
    const selection = useSelectionContext()
    const { period, orgUnit, workflow } = selection
    const { called, loading, data, error, refetch } = useDataQuery(query, {
        lazy: true,
    })
    const tables = data?.dataSetReport
    const fetchDataSet = () => {
        refetch({
            dataSetId,
            period,
            workflow,
            orgUnit,
        })
    }

    useEffect(() => {
        if (dataSetId) {
            fetchDataSet()
        }
    }, [dataSetId])

    if (!dataSetId) {
        return (
            <div className={styles.chooseDataSet}>
                <h2>{i18n.t('Choose a data set to review')}</h2>
                <p>
                    {i18n.t(
                        '{{- workflowName}} has multiple data sets. Choose a data set from the tabs above.',
                        { workflowName: workflow.displayName }
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
                        {i18n.t('Retry loading data set')}
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

    if (tables.length === 0) {
        return (
            <div className={styles.noData}>
                <p>
                    {i18n.t(
                        `This data set doesn't have any data for the selected period and organisation unit.`
                    )}
                </p>
            </div>
        )
    }

    return (
        <div className={styles.display}>
            {tables.map(table => (
                <Table
                    key={table.title}
                    title={table.title}
                    columns={table.headers.map(h => h.name)}
                    rows={table.rows}
                />
            ))}
        </div>
    )
}

Display.propTypes = {
    dataSetId: PropTypes.string,
}

export { Display }
