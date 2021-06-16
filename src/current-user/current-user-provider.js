import { useDataQuery } from '@dhis2/app-runtime'
import { PropTypes } from '@dhis2/prop-types'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import React from 'react'
import { CurrentUserContext } from './current-user-context'

const query = {
    me: {
        resource: 'me',
        params: {
            fields: [
                // TODO: adjust fields according to actual requirements
                'authorities',
                'programs',
                'dataSets',
                'userGroups',
                'organisationUnits',
                'dataViewOrganisationUnits',
            ],
        },
    },
}

const CurrentUserProvider = ({ children }) => {
    const { data, loading, error } = useDataQuery(query)

    if (loading) {
        return (
            <Layer>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </Layer>
        )
    }

    if (error) {
        /**
         * The app can't continue if this fails, because it doesn't
         * have any data, so throw the error and let it be caught by
         * the error boundary in the app-shell
         */
        throw error
    }

    return (
        <CurrentUserContext.Provider value={data.me}>
            {children}
        </CurrentUserContext.Provider>
    )
}

CurrentUserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { CurrentUserProvider }
