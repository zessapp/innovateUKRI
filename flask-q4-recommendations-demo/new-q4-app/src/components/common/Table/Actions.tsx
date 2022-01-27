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
    DropButton,
    TextProps,
    Menu,
    ButtonProps,
} from "grommet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { colours } from "../../../../config/theme"
import React, {
    MouseEvent,
    ReactElement,
    useState,
    Fragment,
    CSSProperties,
} from "react"

export interface ITableAction {
    name: string
    actionProps: ButtonProps &
        TextProps &
        Omit<JSX.IntrinsicElements["span"], "color">
    callback?: (dataID: string) => any
}

interface IActionsProps {
    dataID: string
    actions?: ITableAction[]
}

const ActionButton = styled(DropButton)`
    border: none;
    color: ${(props) => props.theme.global.colors.brandGrey3};
    margin: 0;
    padding: 0;
    width: 1rem;

    :hover,
    :active,
    :focus {
        box-shadow: none;
    }
    display: block;
`

const ActionDropDown = styled(Box)`
    background: white;
    border-radius: 0.3rem;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
`

function actionClicked(e: MouseEvent, isOpen: Boolean, setOpen: Function) {
    e.preventDefault
    setOpen(!isOpen)
}

const Actions: React.FC<IActionsProps> = (props) => {
    const [isOpen, setOpen] = useState(false)
    return (
        <Fragment>
            {props.actions && (
                <Box
                    alignSelf="end"
                    align="center"
                    style={{ alignItems: "flex-end" }}
                >
                    <Menu
                        label={
                            <FontAwesomeIcon
                                style={{ display: "block" }}
                                icon={faEllipsisV}
                            />
                        }
                        color="transparent"
                        fill={false}
                        icon={false}
                        dropAlign={{ top: "bottom", right: "right" }}
                        dropProps={
                            {
                                // plain: true
                            }
                        }
                        items={props.actions.map((action, index) => ({
                            label: action.name,
                            onClick: (e) => {
                                e.stopPropagation()
                                action.callback(props.dataID)
                            },
                            ...action.actionProps,
                        }))}
                    ></Menu>
                    {false && (
                        <ActionButton
                            label={<FontAwesomeIcon icon={faEllipsisV} />}
                            color="brandGrey3"
                            fill={false}
                            dropAlign={{ top: "bottom", right: "right" }}
                            dropProps={{ plain: true, overflow: "visible" }}
                            dropContent={
                                <ActionDropDown pad="medium" width="12rem">
                                    <Box direction="column">
                                        {props.actions.map((action, index) => (
                                            <Box
                                                pad={{ vertical: "small" }}
                                                style={{ cursor: "pointer" }}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    action.callback(
                                                        props.dataID
                                                    )
                                                    e.target.blur()
                                                }}
                                            >
                                                <Text {...action.actionProps}>
                                                    {action.name}
                                                </Text>
                                            </Box>
                                        ))}
                                    </Box>
                                </ActionDropDown>
                            }
                        />
                    )}
                </Box>
            )}
        </Fragment>
    )
}

export default Actions
