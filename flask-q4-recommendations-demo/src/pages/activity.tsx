import ActivityPage from "../components/pages/ActivityPage"
import GrommetLayout, { LayoutStyle } from "src/components/common/GrommetLayout"
import { HeaderStyleValues, zessLogoStyles } from "src/components/common/Header"

export default function Activity() {
    return (
        <GrommetLayout
            headerStyle={HeaderStyleValues.solid}
            zessLogo={zessLogoStyles.GREEN}
            layoutStyle={LayoutStyle.Layout}
        >
            <ActivityPage />
        </GrommetLayout>
    )
}
