import { Select as GrommetSelect } from "grommet"
import { ComponentPropsWithoutRef, FC } from "react"

type GrommetSelectProps = ComponentPropsWithoutRef<typeof GrommetSelect>

interface ISelectProps extends GrommetSelectProps {}

const Select: FC<ISelectProps> = (props: ISelectProps) => {
    return <GrommetSelect {...props} />
}

export default Select
