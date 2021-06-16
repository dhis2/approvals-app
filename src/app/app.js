import { CssVariables } from '@dhis2/ui'
import React from 'react'
import { QueryParamProvider } from 'use-query-params'
import { ActionBar } from '../action-bar'
import { AuthWall } from '../auth'
import { ContextSelector } from '../context-selector'
import { CurrentUserProvider } from '../current-user'
import { DataWorkspace } from '../data-workspace'
import { Layout } from './layout.js'

const App = () => (
    <QueryParamProvider>
        <CssVariables spacers colors theme />
        <CurrentUserProvider>
            <AuthWall>
                <Layout.Container>
                    <Layout.Top>
                        <ContextSelector />
                    </Layout.Top>
                    <Layout.Content>
                        <DataWorkspace />
                    </Layout.Content>
                    <Layout.Bottom>
                        <ActionBar />
                    </Layout.Bottom>
                </Layout.Container>
            </AuthWall>
        </CurrentUserProvider>
    </QueryParamProvider>
)

export { App }
