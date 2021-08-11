import PropTypes from 'prop-types'
// import React from 'react'

const ApprovalStatusLabel = ({ id, label }) => {
    // console.log(id, label)

    return `ICON ${label}`
}

ApprovalStatusLabel.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export { ApprovalStatusLabel }
