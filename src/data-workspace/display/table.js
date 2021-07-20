import {
    DataTableToolbar,
    DataTable,
    TableHead,
    DataTableRow,
    DataTableColumnHeader,
    TableBody,
    DataTableCell,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const Table = ({ title, columns, rows }) => (
    <>
        <DataTableToolbar>{title}</DataTableToolbar>
        <DataTable>
            <TableHead>
                <DataTableRow>
                    {columns.map(column => (
                        <DataTableColumnHeader key={column}>
                            {column}
                        </DataTableColumnHeader>
                    ))}
                </DataTableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <DataTableRow key={index}>
                        {row.map((value, index) => (
                            <DataTableCell key={index}>{value}</DataTableCell>
                        ))}
                    </DataTableRow>
                ))}
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
