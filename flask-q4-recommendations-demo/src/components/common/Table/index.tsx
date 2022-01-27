import styled from "styled-components"
import {
    Box,
    BoxTypes,
    Table as GrommetTable,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    Text,
    TableCellProps,
    TableRowProps,
    TableProps,
} from "grommet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { colours } from "../../../../config/theme"
import Actions, { ITableAction } from "./Actions"
import { MouseEvent, ReactElement, useState, FC } from "react"
import { motion, AnimatePresence } from "framer-motion"

const StyledTableHeader = styled(TableHeader)`
    display: flex;
    min-height: 3rem;
    justify-content: center;
    flex-direction: column;
    border-bottom: ${(props) => {
        return `1px solid ${props.theme.global.colors.brandGrey6}80;`
    }};
    display: contents;
`

const StyledTableHeaderCell = styled(TableCell)`
    /* display: flex;
    border: none;
    padding: 0; */
`
const StyledTableCell = styled(
    motion.custom<TableCellProps & BoxTypes & JSX.IntrinsicElements["td"]>(
        TableCell
    )
)`
    display: flex;
    padding: 0.5rem;
    align-items: center;

    :last-child {
        justify-content: flex-end;
    }
`
const AnimatedCellContent = styled(Box)`
    display: flex;
`

const StyledTableBody = styled(TableBody)`
    flex-direction: column;
    display: flex;
    display: contents;
`
const StyledTableRow = styled(
    motion.custom<TableRowProps & JSX.IntrinsicElements["tr"]>(TableRow)
)`
    min-height: 3.5rem;
    align-items: center;
    overflow: hidden;
    display: contents;
    cursor: pointer;

    border-bottom: ${(props) => {
        return `1px solid ${props.theme.global.colors.brandGrey6}80;`
    }};
`

const StyledTableHeaderRow = styled(TableRow)`
    display: contents;
`

const StyledTable = styled(GrommetTable)`
    width: 100%;
    display: grid;
    overflow: auto;
    grid-template-columns:
        minmax(150px, 3fr)
        minmax(150px, 1fr)
        minmax(150px, 1fr)
        minmax(150px, 1fr)
        minmax(150px, 1fr);
`

export interface ITableCell {
    color?: string
    weight?: string | number
    value: string
}

export interface ITableRow {
    // ID if the row represents a data object
    dataID?: string
    onClickCallback?: () => void
    cells: ITableCell[]
}

interface ITableProps extends BoxTypes {
    headings?: string[]
    rows?: ITableRow[]
    emptyMessage: string
    actions?: ITableAction[]
}

const TableContent: FC<ITableProps> = (props) => {
    const rows = props.rows

    if (rows && rows.length !== 0) {
        return (
            <StyledTable key="table">
                <StyledTableHeader>
                    <StyledTableHeaderRow>
                        {props.headings.map((heading, index) => (
                            <StyledTableHeaderCell
                                scope="col"
                                key={`heading-${index}`}
                            >
                                <Text
                                    weight="bold"
                                    color="brandBlack"
                                    alignSelf="start"
                                >
                                    {heading}
                                </Text>
                            </StyledTableHeaderCell>
                        ))}
                        <StyledTableHeaderCell scope="col" style={{}}>
                            <Text
                                weight="bold"
                                color="brandBlack"
                                alignSelf="end"
                            >
                                Actions
                            </Text>
                        </StyledTableHeaderCell>
                    </StyledTableHeaderRow>
                </StyledTableHeader>
                <StyledTableBody>
                    <AnimatePresence>
                        {props.rows.map((row, index) => (
                            <StyledTableRow
                                onClick={row.onClickCallback}
                                key={`row-${row.dataID}`}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                                exit={{
                                    opacity: 0,
                                    minHeight: "0px",
                                    maxHeight: "0px",
                                    borderColor: "transparent",
                                }}
                                transition={{ ease: "linear", duration: 0.155 }}
                            >
                                {row.cells.map((cell, index) => (
                                    <StyledTableCell
                                        initial={{
                                            opacity: 1,
                                            overflow: "hidden",
                                        }}
                                        animate={{
                                            opacity: 1,
                                            overflow: "hidden",
                                        }}
                                        exit={{
                                            opacity: 0,
                                            minHeight: "0px",
                                            maxHeight: "0px",
                                            borderColor: "transparent",
                                        }}
                                        transition={{
                                            ease: "linear",
                                            duration: 0.155,
                                        }}
                                        key={`table-cell-${index}`}
                                    >
                                        <Text color="brandBlack">
                                            {cell.value}
                                        </Text>
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell>
                                    <Actions
                                        dataID={row.dataID}
                                        actions={props.actions}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </AnimatePresence>
                </StyledTableBody>
            </StyledTable>
        )
    }

    return (
        <Box
            flex="grow"
            border={{
                side: "all",
                style: "dashed",
            }}
            pad="medium"
        >
            <Text alignSelf="center">{props.emptyMessage}</Text>
        </Box>
    )
}

const Table: React.FC<ITableProps> = (props) => <TableContent {...props} />

export default Table
