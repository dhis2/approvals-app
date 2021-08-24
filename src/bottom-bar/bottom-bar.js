import React from 'react'
import { ApprovalStatusTag } from '../shared/index.js'
import { useWorkflowContext } from '../workflow-context/index.js'
import { AcceptButton } from './accept-button/index.js'
import { ApproveButton } from './approve-button/index.js'
import { BottomBarItem } from './bottom-bar-item.js'
import styles from './bottom-bar.module.css'
import { UnacceptButton } from './unaccept-button/index.js'
import { UnapproveButton } from './unapprove-button/index.js'

const BottomBar = () => {
    const { allowedActions, approvalStatus, approvedBy, approvedAt } =
        useWorkflowContext()
    const { mayAccept, mayApprove, mayUnaccept, mayUnapprove } = allowedActions
    const disableApproveBtn = !mayApprove && !mayUnapprove

    return (
        <>
            <div className={styles.bottomBar} data-test="bottom-bar">
                <BottomBarItem>
                    <ApprovalStatusTag
                        approvalStatus={approvalStatus}
                        approvedBy={approvedBy}
                        approvedAt={approvedAt}
                    />
                </BottomBarItem>

                {(mayApprove || disableApproveBtn) && (
                    <BottomBarItem>
                        <ApproveButton disabled={disableApproveBtn} />
                    </BottomBarItem>
                )}

                {mayAccept && (
                    <BottomBarItem>
                        <AcceptButton />
                    </BottomBarItem>
                )}

                {mayUnapprove && (
                    <BottomBarItem>
                        <UnapproveButton />
                    </BottomBarItem>
                )}

                {mayUnaccept && (
                    <BottomBarItem>
                        <UnacceptButton />
                    </BottomBarItem>
                )}
            </div>
        </>
    )
}

export { BottomBar }
