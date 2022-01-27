import { useState, useEffect, Fragment } from "react"
import { isUserIsLoggedIn } from "../../../utilities/api"
import { useRouter } from "next/router"

interface IAppIndexProps {}

const SecureComponent: React.FC<IAppIndexProps> = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const router = useRouter()

    useEffect(() => {
        // let checkUserIsLoggedIn = async () => {
        //     setIsLoggedIn(await ZessAPI.isLoggedIn())
        // }

        isUserIsLoggedIn(setIsLoggedIn, router)
    })

    return (
        <Fragment>
            {isLoggedIn && <Fragment>{props.children}</Fragment>}
        </Fragment>
    )
}

export default SecureComponent
