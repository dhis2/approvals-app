import i18n from '@dhis2/d2-i18n'
import { Tag } from '@dhis2/ui'
import React from 'react'
import { IconApprovalReady } from './icon-approval-ready.js'

const StatusTag = () => (
    <Tag neutral icon={<IconApprovalReady size={12} />}>
        {i18n.t('Ready for approval')}
    </Tag>
)

export { StatusTag }
