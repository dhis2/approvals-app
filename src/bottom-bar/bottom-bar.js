import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import React, { useState } from 'react'
import {
    StatusTag,
    ApproveModal,
    useApproveData,
    useAcceptData,
    useUnapproveData,
    useUnacceptData,
} from '../shared/index.js'
import { useWorkflowContext } from '../workflow-context/index.js'
import { BottomBarItem } from './bottom-bar-item.js'
import styles from './bottom-bar.module.css'

const BottomBar = () => {
    const [unexpectedError, setUnexpectedError] = useState(null)
    const [approveData, {
        loading: approveLoading,
        error: approveError,
    }] = useApproveData()
    const [acceptData, {
        loading: acceptLoading,
        error: acceptError,
    }] = useAcceptData()
    const [unapproveData, {
        loading: unapproveLoading,
        error: unapproveError,
    }] = useUnapproveData()
    const [unacceptData, {
        loading: unacceptLoading,
        error: unacceptError,
    }] = useUnacceptData()
    const [showApproveModal, setShowApproveModal] = useState(false)
    const { approvalStatus } = useWorkflowContext()
    const {
        mayAccept,
        mayApprove,
        mayUnaccept,
        mayUnapprove,
    } = approvalStatus

    const disableApproveBtn = !mayApprove && !mayUnapprove
    const loading = approveLoading || acceptLoading || unapproveLoading || unacceptLoading
    const error = approveError || acceptError || unapproveError || unacceptError || unexpectedError
    const showApprovalDialog = () => setShowApproveModal(true)
    const accept = () => {
        // Hendrik is working on some changes that will allow to get the current
        // period value from the url, until we can leverage on that,
        // we don't display the period
        // @TODO: Implement period display once possible
        const wf = 'foo', pe = 'bar', ou = 'baz'

        // TODO: Do not throw manually when wf, pe & ou are dynamic
        throw new Error('"wf", "pe" & "ou" are not dynamic')

        // eslint-disable-next-line no-unreachable
        acceptData({ wf, pe, ou })
    }
    const unapprove = () => {
        // Hendrik is working on some changes that will allow to get the current
        // period value from the url, until we can leverage on that,
        // we don't display the period
        // @TODO: Implement period display once possible
        const wf = 'foo', pe = 'bar', ou = 'baz'

        // TODO: Do not throw manually when wf, pe & ou are dynamic
        throw new Error('"wf", "pe" & "ou" are not dynamic')

        // eslint-disable-next-line no-unreachable
        unapproveData({ wf, pe, ou })
    }
    const unaccept = () => {
        // Hendrik is working on some changes that will allow to get the current
        // period value from the url, until we can leverage on that,
        // we don't display the period
        // @TODO: Implement period display once possible
        const wf = 'foo', pe = 'bar', ou = 'baz'

        // TODO: Do not throw manually when wf, pe & ou are dynamic
        throw new Error('"wf", "pe" & "ou" are not dynamic')

        // eslint-disable-next-line no-unreachable
        unacceptData({ wf, pe, ou })
    }

    const onApprove = async () => {
        // Hendrik is working on some changes that will allow to get the current
        // period value from the url, until we can leverage on that,
        // we don't display the period
        // @TODO: Implement period display once possible
        const wf = 'foo', pe = 'bar', ou = 'baz'

        try {
            // TODO: Do not throw manually when wf, pe & ou are dynamic
            throw new Error('"wf", "pe" & "ou" are not dynamic')

            // eslint-disable-next-line no-unreachable
            await approveData({ wf, pe, ou })
        } catch (e) {
            setUnexpectedError(e)
        } finally {
            setShowApproveModal(false)
        }
    }

    if (loading) {
        // @TODO
        // noop
    }

    if (error) {
        // @TODO
        // noop
    }

    return (
        <>
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
                            onClick={showApprovalDialog}
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

            {showApproveModal && (
                <ApproveModal
                    onApprove={onApprove}
                    onCancel={() => setShowApproveModal(false)}
                />
            )}
        </>
    )
}

export { BottomBar }
