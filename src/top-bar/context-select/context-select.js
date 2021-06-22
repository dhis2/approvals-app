import { IconChevronDown24, IconChevronUp24, colors, Popover } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import classes from './context-select.module.css'

const ContextSelect = ({
    children,
    label,
    value,
    onClose,
    onOpen,
    disabled,
    open,
}) => {
    const ref = useRef()
    const Icon = open ? IconChevronUp24 : IconChevronDown24
    return (
        <>
            <button
                ref={ref}
                className={classes.button}
                onClick={onOpen}
                disabled={disabled}
            >
                <span className={classes.prefix}>{label}</span>
                <span className={classes.value}>{value}</span>
                <Icon color={disabled ? colors.grey600 : undefined} />
            </button>
            {open && (
                <Popover
                    reference={ref}
                    arrow={false}
                    placement="bottom-start"
                    onClickOutside={onClose}
                >
                    {children}
                </Popover>
            )}
        </>
    )
}

ContextSelect.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    open: PropTypes.bool,
}

export { ContextSelect }
