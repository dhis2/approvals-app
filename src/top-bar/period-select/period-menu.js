import { Menu, MenuItem } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelection } from '../selection/index.js'
import { getFixedPeriodsByTypeAndYear } from './fixed-periods.js'
import classes from './period-menu.module.css'

const PeriodMenu = ({ periodType, year }) => {
    const { selectPeriod } = useSelection()
    const periods = getFixedPeriodsByTypeAndYear(periodType, year)

    if (!periods) {
        return null
    }

    return (
        <Menu dense className={classes.menu}>
            {periods.map(period => (
                <MenuItem
                    key={period.id}
                    label={period.displayName}
                    onClick={() => selectPeriod(period)}
                />
            ))}
        </Menu>
    )
}

PeriodMenu.propTypes = {
    periodType: PropTypes.string,
    year: PropTypes.number,
}

export { PeriodMenu }
