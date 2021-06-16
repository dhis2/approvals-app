import React from 'react'
import { ActionBar } from '../action-bar'
import { ContextSelector } from '../context-selector'
import { DataWorkspace } from '../data-workspace'
import { Layout } from './layout.js'
import { Providers } from './providers.js'

const App = () => (
    <Providers>
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
    </Providers>
)

export { App }
