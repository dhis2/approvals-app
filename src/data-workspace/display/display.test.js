import React from 'react'
import { CustomDataProvider } from '@dhis2/app-runtime'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Display } from './display.js'

const defaultProps = {
    workflowName: 'Workflow 1',
    dataSetId: 'data-set-1',
    periodId: 'period-1',
    organisationUnitId: 'ou-1'
}

describe('<Display>', () => {
    it('asks the user to select a data set if none is selected', () => {
        render(
            <CustomDataProvider options={{ loadForever: true }}>
                <Display {...defaultProps} dataSetId={null} />
            </CustomDataProvider>
        )

        expect(screen.getByRole('heading')).toHaveTextContent('Choose a data set to review')
        expect(screen.getByText(
            `${defaultProps.workflowName} has multiple data sets. Choose a data set from the tabs above.`
        )).toBeInTheDocument()
    })

    it('renders a loading spinner if a data set is selected', () => {
        render(
            <CustomDataProvider options={{ loadForever: true }}>
                <Display {...defaultProps} />
            </CustomDataProvider>
        )

        expect(screen.getByRole('progressbar')).toBeInTheDocument()
        expect(screen.getByText('Loading data set')).toBeInTheDocument()
    })

    it('shows an error notice with a retry button if there was an error fetching the data set report', async () => {
        let data = {}
        render(
            <CustomDataProvider data={data}>
                <Display {...defaultProps} />
            </CustomDataProvider>
        )

        await waitFor(() => screen.getByRole('heading'))

        expect(screen.getByRole('heading')).toHaveTextContent('There was a problem displaying this data set')
        expect(screen.getByText(
            `This data set couldn't be loaded or displayed. Try again, or contact your system administrator.`
        )).toBeInTheDocument()
        expect(screen.getByRole('button')).toHaveTextContent('Retry loading data set')

        data.dataSetReport = []
        userEvent.click(screen.getByRole('button', 'Retry loading data set'))
        await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

        expect(screen.queryByRole('heading', 'There was a problem displaying this data set')).not.toBeInTheDocument()
    })

    it('shows a message if the data set report has no data for the seleted period and organisation unit', async () => {
        const data = {
            dataSetReport: []
        }
        render(
            <CustomDataProvider data={data}>
                <Display {...defaultProps} />
            </CustomDataProvider>
        )

        await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

        expect(screen.getByText(
            `This data set doesn't have any data for the selected period and organisation unit.`
        )).toBeInTheDocument()
    })

    it('renders one table per data set in the report', async () => {
        const data = {
            dataSetReport: [{
                title: 'Data set 1',
                headers: [{ name: 'Header 1' }, { name: 'Header 2' }],
                rows: []
            }, {
                title: 'Data set 2',
                headers: [{ name: 'Header 1' }, { name: 'Header 2' }],
                rows: []
            }, {
                title: 'Data set 3',
                headers: [{ name: 'Header 1' }, { name: 'Header 2' }],
                rows: []
            }]
        }
        render(
            <CustomDataProvider data={data}>
                <Display {...defaultProps} />
            </CustomDataProvider>
        )

        await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

        expect(await screen.findAllByRole('table')).toHaveLength(3)
    })
})
