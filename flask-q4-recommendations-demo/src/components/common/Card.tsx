import styled from "styled-components"
import { Box, BoxTypes } from "grommet"
import { FC } from "react"

const Container = styled(Box)`
    width: 100%;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.18);
    border-radius: 0.3rem;
`

interface ICardProps extends BoxTypes {}

const Card: FC<ICardProps> = (props) => {
    return <Container {...props}>{props.children}</Container>
}

export default Card
