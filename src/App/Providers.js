import { CssVariables } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { QueryParamProvider } from 'use-query-params'
import { AuthWall } from '../auth-wall'
import { CachedResourcesProvider } from '../cached-resources'

export const Providers = ({ children }) => (
    <QueryParamProvider>
        <CssVariables spacers colors theme />
        <CachedResourcesProvider>
            <AuthWall>{children}</AuthWall>
        </CachedResourcesProvider>
    </QueryParamProvider>
)

Providers.propTypes = {
    children: PropTypes.node,
}
