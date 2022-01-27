import { Box } from "grommet"
import { FC } from "react"
import Button from "../../common/Button"
import { logoutUser } from "../../../utilities/api"
import AppPageHeader from "./AppPageHeader"
import { useRouter } from "next/router"

interface IAppIndexProps {}

const AppIndex: FC<IAppIndexProps> = () => {
    const router = useRouter()

    return (
        <Box direction="column">
            <AppPageHeader heading="Home" />
            <Box direction="row" margin={{ vertical: "medium" }}>
                <Button
                    primary
                    label="Log out"
                    size="small"
                    fill={true}
                    onClick={() => {
                        logoutUser(() => {
                            router.reload()
                        })
                    }}
                />
            </Box>
        </Box>
    )
}

export default AppIndex
