import { motion } from "framer-motion"
import { TextInput, TextInputProps } from "grommet"
import React, { Fragment } from 'react'
import styled from "styled-components"

const StyledTextInput = styled(motion.custom<TextInputProps & Omit<JSX.IntrinsicElements['input'], 'onSelect' | 'size' | 'placeholder'>>(TextInput))`
    border none;
    padding: 0;

    ::placeholder {
        color: ${(props) => (props.theme.global.colors.brandGrey6)}
      }
`

interface IInputTitleProps extends TextInputProps {

}


class InputTitle extends React.Component<IInputTitleProps> {

    constructor(props: IInputTitleProps) {
        super(props)
    }

    render() {
        return (
            <StyledTextInput {...this.props} />
        );
    }
}

export default StyledTextInput;

