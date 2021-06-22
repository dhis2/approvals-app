import { Menu, MenuItem } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { createHref } from '../../navigation/index.js'
import { useSelectionContext } from '../selection/index.js'
import { getFixedPeriodsByTypeAndYear } from './fixed-periods.js'
import classes from './period-menu.module.css'

const PeriodMenu = ({ periodType, year }) => {
    const {
        workflow,
        period: selectedPeriod,
        orgUnit,
        selectPeriod,
    } = useSelectionContext()
    const periods = getFixedPeriodsByTypeAndYear(periodType, year)

    if (!periods) {
        return null
    }

    return (
        <Menu dense className={classes.menu}>
            {periods.map(period => (
                <MenuItem
                    active={period.id === selectedPeriod.id}
                    key={period.id}
                    href={createHref({
                        wf: workflow.id,
                        ou: orgUnit.path,
                        pe: period.id,
                    })}
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
