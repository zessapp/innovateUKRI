import GrommetLayout, { LayoutStyle } from "src/components/common/GrommetLayout"
import { HeaderStyleValues, zessLogoStyles } from "src/components/common/Header"
import { FC } from "react"
import { withAuthenticator } from "@aws-amplify/ui-react"
import Projects from "../components/pages/app/Projects"

const Index: FC = () => {
    return (
        <GrommetLayout
            headerStyle={HeaderStyleValues.solid}
            zessLogo={zessLogoStyles.GREEN}
            layoutStyle={LayoutStyle.AppLayout}
        >
            <Projects />
        </GrommetLayout>
    )
}

export default withAuthenticator(Index)
