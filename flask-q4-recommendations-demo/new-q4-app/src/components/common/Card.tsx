import styled from "styled-components";
import { Box, BoxTypes } from "grommet";


const Container = styled(Box)`
width:100%;
overflow:hidden;
position: relative;
box-shadow: 0px 3px 20px rgba(0,0,0,0.18);
`

//TODO - refactor all extends to take BoxTypes instead of BoxProps

interface ICardProps extends BoxTypes {

}

const Card: React.FC<ICardProps> = (props) => {
    return (
        <Container {...props}>
            {props.children}
        </Container>
    )
}


export default Card