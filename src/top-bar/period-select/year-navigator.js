import { Button, IconArrowRight24, IconArrowLeft24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import classes from './year-navigator.module.css'

export const currentYear = new Date().getFullYear()
// To avoid users from navigating too far back
const startYear = 1970

const YearNavigator = ({ year, onYearChange }) => (
    <div className={classes.container}>
        <Button
            disabled={year === startYear}
            onClick={() => onYearChange(year - 1)}
            icon={<IconArrowLeft24 />}
        />
        <span className={classes.year}>{year}</span>
        <Button
            disabled={year === currentYear}
            onClick={() => onYearChange(year + 1)}
            icon={<IconArrowRight24 />}
        />
    </div>
)

YearNavigator.propTypes = {
    year: PropTypes.number.isRequired,
    onYearChange: PropTypes.func,
}

export { YearNavigator }
