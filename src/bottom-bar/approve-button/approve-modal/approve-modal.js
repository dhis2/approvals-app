import i18n from '@dhis2/d2-i18n'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useWorkflowContext } from '../../../workflow-context/index.js'
import styles from './approve-modal.module.css'

// Hendrik is working on some changes that will allow to get the current
// period value from the url, until we can leverage on that,
// we don't display the period
// @TODO: Implement period display once possible
const TODO_GET_PERIOD = false

const ApproveModal = ({ onApprove, onCancel }) => {
    const { dataSets } = useWorkflowContext()
    const count = dataSets.length

    return (
        <Modal>
            <ModalTitle>
                {count > 1
                    ? i18n.t('Approving {{count}} data sets', { count })
                    : i18n.t('Approving {{count}} data set', { count })}
            </ModalTitle>

            <ModalContent>
                <div className={styles.summary}>
                    {!TODO_GET_PERIOD && (
                        <h1 className={styles.summaryTitle}>
                            {count > 1
                                ? i18n.t(
                                      '{{count}} data sets will be approved:',
                                      { count }
                                  )
                                : i18n.t(
                                      '{{count}} data set will be approved:',
                                      { count }
                                  )}
                        </h1>
                    )}

                    {TODO_GET_PERIOD && (
                        <h1 className={styles.summaryTitle}>
                            {count > 1
                                ? i18n.t(
                                      '{{count}} data sets for {{period}} will be approved:',
                                      { count }
                                  )
                                : i18n.t(
                                      '{{count}} data set for {{period}} will be approved:',
                                      { count }
                                  )}
                        </h1>
                    )}

                    <ul className={styles.summaryList}>
                        {dataSets.map(({ id, displayName }) => (
                            <li className={styles.summaryListItem} key={id}>
                                {displayName}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className={styles.confirmationStatement}>
                    {i18n.t('Are you sure you want to approve this data?')}
                </p>
            </ModalContent>

            <ModalActions>
                <ButtonStrip>
                    <Button onClick={onCancel}>{i18n.t('Cancel')}</Button>

                    <Button primary onClick={onApprove}>
                        {i18n.t('Approve')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

ApproveModal.propTypes = {
    onApprove: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}

export { ApproveModal }
