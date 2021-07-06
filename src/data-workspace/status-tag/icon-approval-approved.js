import PropTypes from 'prop-types'
import React from 'react'

const IconApprovalApproved = ({ size }) => (
    <svg height={size} width={size} viewBox="0 0 16 16">
        <path
            d="m7 10.707-2.5-2.5005.7065-.7065 1.7935 1.793 3.7925-3.793.7075.7075zm1-9.707c-3.86599325 0-7 3.13400675-7 7 0 3.8659932 3.13400675 7 7 7 3.8659932 0 7-3.1340068 7-7 0-1.85651543-.7374979-3.63699282-2.0502525-4.94974747-1.3127547-1.31275465-3.09323207-2.05025253-4.9497475-2.05025253zm0 13c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6c0 1.59129894-.632141 3.1174224-1.7573593 4.2426407s-2.65134176 1.7573593-4.2426407 1.7573593z"
            fillRule="evenodd"
        />
    </svg>
)

IconApprovalApproved.defaultProps = {
    size: 16,
}

IconApprovalApproved.propTypes = {
    size: PropTypes.number,
}

export { IconApprovalApproved }
