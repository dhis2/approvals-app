import { CssVariables } from '@dhis2/ui'
import React from 'react'
import { QueryParamProvider } from 'use-query-params'
import { AuthWall } from '../auth/index.js'
import { BottomBar } from '../bottom-bar/index.js'
import { CurrentUserProvider } from '../current-user/index.js'
import { DataWorkspace } from '../data-workspace/index.js'
import { TopBar } from '../top-bar/index.js'
import { Layout } from './layout.js'

const App = () => (
    <QueryParamProvider>
        <CssVariables spacers colors theme />
        <CurrentUserProvider>
            <AuthWall>
                <Layout.Container>
                    <Layout.Top>
                        <TopBar />
                    </Layout.Top>
                    <Layout.Content>
                        <DataWorkspace />
                    </Layout.Content>
                    <Layout.Bottom>
                        <BottomBar />
                    </Layout.Bottom>
                </Layout.Container>
            </AuthWall>
        </CurrentUserProvider>
    </QueryParamProvider>
)

export { App }
