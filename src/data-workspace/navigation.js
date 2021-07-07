import { TabBar, Tab } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const Navigation = ({ dataSets, selected, onChange }) => (
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

Navigation.propTypes = {
    dataSets: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.string,
}

export { Navigation }
