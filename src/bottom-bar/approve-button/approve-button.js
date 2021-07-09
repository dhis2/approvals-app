import { useAlert } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useWorkflowContext } from '../../workflow-context/index.js'
import { ApproveModal } from './approve-modal/index.js'
import { useApproveData } from './use-approve-data.js'

const ApproveButton = ({ disabled }) => {
    const [approveData, { loading, error: approveError }] = useApproveData()
    const { show: showApprovalSuccess } = useAlert(i18n.t('Approval saved'))

    // state
    const [unexpectedError, setUnexpectedError] = useState(null)
    const [showApproveModal, setShowApproveModal] = useState(false)
    const { params } = useWorkflowContext()

    // derived state
    const error = approveError || unexpectedError
    const showApprovalDialog = () => setShowApproveModal(true)
    const hideApprovalDialog = () => setShowApproveModal(false)

    return (
        <>
            <Button
                primary
                small
                disabled={disabled}
                onClick={showApprovalDialog}
            >
                {i18n.t('Approve')}
            </Button>

            {showApproveModal && (
                <ApproveModal
                    error={error}
                    loading={loading}
                    onApprove={async () => {
                        try {
                            const { wf, pe, ou } = params
                            await approveData({ wf, pe, ou })
                        } catch (e) {
                            setUnexpectedError(e)
                        } finally {
                            hideApprovalDialog()
                            showApprovalSuccess()
                        }
                    }}
                    onCancel={hideApprovalDialog}
                />
            )}
        </>
    )
}

ApproveButton.propTypes = {
    disabled: PropTypes.bool,
}

export { ApproveButton }
