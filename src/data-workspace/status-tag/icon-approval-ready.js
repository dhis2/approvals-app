import PropTypes from 'prop-types'
import React from 'react'

const IconApprovalReady = ({ size }) => (
    <svg height={size} width={size} viewBox="0 0 16 16">
        <path d="m8 1c3.8659932 0 7 3.13400675 7 7 0 3.8659932-3.1340068 7-7 7-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7zm0 1c-3.3137085 0-6 2.6862915-6 6s2.6862915 6 6 6 6-2.6862915 6-6-2.6862915-6-6-6zm0 3c1.65685425 0 3 1.34314575 3 3s-1.34314575 3-3 3-3-1.34314575-3-3 1.34314575-3 3-3z" />
    </svg>
)

IconApprovalReady.defaultProps = {
    size: 16,
}

IconApprovalReady.propTypes = {
    size: PropTypes.number,
}

export { IconApprovalReady }
