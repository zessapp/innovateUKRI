import { TextArea as GrommetTextArea } from "grommet"
import { ComponentPropsWithoutRef, FC } from "react"

type GrommetTextAreaProps = ComponentPropsWithoutRef<typeof GrommetTextArea>

interface ITextAreaProps extends GrommetTextAreaProps {}

const TextArea: FC<ITextAreaProps> = (props: ITextAreaProps) => {
    return <GrommetTextArea {...props} />
}

export default TextArea
