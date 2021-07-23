import { TabBar, Tab } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelectionContext } from '../../selection-context/index.js'

const DataSetNavigation = ({ selected, onChange }) => {
    const { workflow } = useSelectionContext()
    const { dataSets } = workflow

    return (
        <TabBar scrollable>
            {dataSets.map(dataSet => (
                <Tab
                    key={dataSet.id}
                    onClick={() => onChange(dataSet.id)}
                    selected={dataSet.id === selected}
                >
                    {dataSet.displayName}
                </Tab>
            ))}
        </TabBar>
    )
}

DataSetNavigation.propTypes = {
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.string,
}

export { DataSetNavigation }
