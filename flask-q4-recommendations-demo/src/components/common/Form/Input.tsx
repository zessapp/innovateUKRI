import { TextInput } from "grommet"
import { ComponentPropsWithoutRef, FC } from "react"

type GrommetTextInputProps = ComponentPropsWithoutRef<typeof TextInput>

interface ITextInputProps extends GrommetTextInputProps {}

const Input: FC<ITextInputProps> = (props: ITextInputProps) => {
    return <TextInput {...props} />
}

export default Input
