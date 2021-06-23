import {
    IconChevronDown24,
    IconChevronUp24,
    colors,
    Popover,
    Tooltip,
} from '@dhis2/ui'
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
    tooltipContent,
}) => {
    const buttonRef = useRef()
    const Icon = open ? IconChevronUp24 : IconChevronDown24
    const button = (
        <button
            ref={buttonRef}
            className={classes.button}
            onClick={onOpen}
            disabled={disabled}
        >
            <span className={classes.prefix}>{label}</span>
            <span className={classes.value}>{value}</span>
            <Icon color={disabled ? colors.grey600 : undefined} />
        </button>
    )

    return (
        <>
            {disabled ? (
                <Tooltip content={tooltipContent} placement="bottom">
                    {({ ref, onMouseOver, onMouseOut }) => (
                        <div
                            ref={ref}
                            onMouseOver={onMouseOver}
                            onMouseOut={onMouseOut}
                            className={classes.tooltipwrap}
                        >
                            {button}
                        </div>
                    )}
                </Tooltip>
            ) : (
                button
            )}
            {open && (
                <Popover
                    reference={buttonRef}
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
    tooltipContent: PropTypes.string,
}

export { ContextSelect }
