import { FC, ReactNode } from "react"
import { Text, TextProps } from "grommet"

interface IErrorTextProps extends TextProps {
    children: ReactNode
}

const ErrorText: FC<IErrorTextProps> = (props: IErrorTextProps) => {
    return (
        <Text color="errorRed" {...props}>
            {props.children}
        </Text>
    )
}

export default ErrorText
