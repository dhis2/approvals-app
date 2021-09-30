import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { ErrorMessage } from '../shared/index.js'
import { useIsAuthorized } from './use-is-authorized.js'

const AuthWall = ({ children }) => {
    const { hasAppAccess, hasApprovalAuthorities } = useIsAuthorized()

    if (hasAppAccess && hasApprovalAuthorities) {
        return children
    }

    const message = !hasAppAccess
        ? i18n.t(
              "You don't have access to the Data Approval App. Contact a system administrator to request access."
          )
        : i18n.t(
              'You are not allowed to approve data. Contact a system administrator to request the appropriate authorities.'
          )

    return (
        <ErrorMessage title={i18n.t('Not authorized')}>{message}</ErrorMessage>
    )
}

AuthWall.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AuthWall }
