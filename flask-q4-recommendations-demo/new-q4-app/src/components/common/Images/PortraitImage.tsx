import { Image } from "grommet"
import { FC } from "react"
import styled from "styled-components"

// const PortraitPhotoContainer = styled(Box)`
//     /*align-items: flex-end;*/
//     max-width: initial;
//     width: 100%;
//     align-items: center;
//     justify-content: center;
// `

// const PortraitPhoto = styled(Box)`
//     /*margin: 0 2rem 2rem 2rem;*/
//     /*
//     width: 34.06255vw;
//     height: 42.578125vw;
//     min-height: 42.578125vw;
//     margin: 4.16666666667vw;
//     margin-top: 5.41666666667vw;
//     */

//     @media only screen and (min-width: ${(props) =>
//             props.theme.global.breakpoints.small.value + 1}px) {
//         max-width: 34.06255vw;
//     }
// `

const StyledPortraitImage = styled(Image)`
    border-radius: 0.25rem;
`

const PortraitImage: FC = (props) => {
    return <StyledPortraitImage {...props}></StyledPortraitImage>
}

export default PortraitImage
