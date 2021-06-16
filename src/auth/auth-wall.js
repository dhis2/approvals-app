import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import classes from './auth-wall.module.css'
import { useIsAuthorized } from './use-is-authorized.js'

const AuthWall = ({ children }) => {
    const isAuthorized = useIsAuthorized()

    if (!isAuthorized) {
        return (
            <div className={classes.wrapper}>
                <NoticeBox error title={i18n.t('Not authorized')}>
                    {i18n.t(
                        "You don't have access to the Data Approval App. Contact a system administrator to request access."
                    )}
                </NoticeBox>
            </div>
        )
    }

    return children
}

AuthWall.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AuthWall }
