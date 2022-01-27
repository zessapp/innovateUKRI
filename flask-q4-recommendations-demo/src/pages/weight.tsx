import GrommetLayout, { LayoutStyle } from "src/components/common/GrommetLayout"
import { HeaderStyleValues, zessLogoStyles } from "src/components/common/Header"
import WeightPage from "src/components/pages/WeightPage"

export default function Weight() {
    return (
        <GrommetLayout
            headerStyle={HeaderStyleValues.solid}
            zessLogo={zessLogoStyles.GREEN}
            layoutStyle={LayoutStyle.Layout}
        >
            <WeightPage />
        </GrommetLayout>
    )
}
