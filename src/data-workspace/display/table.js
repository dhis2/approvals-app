import {
    DataTable,
    TableHead,
    DataTableRow,
    DataTableColumnHeader,
    TableBody,
    DataTableCell,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './table.module.css'

// Needs to have the same width as the table, so can't use the one from
// @dhis2/ui
const DataTableToolbar = ({ children }) => (
    <tr>
        <th className={styles.titleCell} colSpan="2">
            {children}
        </th>
    </tr>
)

DataTableToolbar.propTypes = {
    children: PropTypes.any.isRequired,
}

const Table = ({ title, columns, rows }) => (
    <>
        <DataTable className={styles.dataTable}>
            <TableHead>
                <DataTableToolbar>
                    {title}
                </DataTableToolbar>
                <DataTableRow>
                    {columns.map(column => (
                        <DataTableColumnHeader key={column}>
                            {column}
                        </DataTableColumnHeader>
                    ))}
                </DataTableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => {
                    const [firstCell, ...cells] = row

                    return (
                        <DataTableRow key={index}>
                            <DataTableCell className={styles.labelCell}>{firstCell}</DataTableCell>

                            {cells.map((value, index) => (
                                <DataTableCell key={index}>{value}</DataTableCell>
                            ))}
                        </DataTableRow>
                    )
                })}
            </TableBody>
        </DataTable>
    </>
)

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
}

export { Table }
