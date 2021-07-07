import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import React from 'react'
import { StatusTag } from '../shared/index.js'
import { useWorkflowContext } from '../workflow-context/index.js'
import { BottomBarItem } from './bottom-bar-item.js'
import styles from './bottom-bar.module.css'

const BottomBar = () => {
    const { approvalStatus } = useWorkflowContext()
    const {
        mayAccept,
        mayApprove,
        mayUnaccept,
        mayUnapprove,
    } = approvalStatus

    const disableApproveBtn = !mayApprove && !mayUnapprove
    const approve = () => null
    const accept = () => null
    const unapprove = () => null
    const unaccept = () => null

    return (
        <div className={styles.bottomBar}>
            <BottomBarItem>
                <StatusTag approvalState={approvalStatus} />
            </BottomBarItem>

            {(mayApprove || (disableApproveBtn)) && (
                <BottomBarItem>
                    <Button
                        primary
                        small
                        disabled={disableApproveBtn}
                        onClick={approve}
                    >
                        {i18n.t('Approve')}
                    </Button>
                </BottomBarItem>
            )}

            {mayAccept && (
                <BottomBarItem>
                    <Button small onClick={accept}>
                        {i18n.t('Accept')}
                    </Button>
                </BottomBarItem>
            )}

            {mayUnapprove && (
                <BottomBarItem>
                    <Button small onClick={unapprove}>
                        {i18n.t('Unapprove')}
                    </Button>
                </BottomBarItem>
            )}

            {mayUnaccept && (
                <BottomBarItem>
                    <Button small onClick={unaccept}>
                        {i18n.t('Unaccept')}
                    </Button>
                </BottomBarItem>
            )}
        </div>
    )
}

export { BottomBar }
