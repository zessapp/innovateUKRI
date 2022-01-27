import GrommetLayout, { LayoutStyle } from "src/components/common/GrommetLayout"
import { HeaderStyleValues, zessLogoStyles } from "src/components/common/Header"
import HeightPage from "src/components/pages/HeightPage"

export default function Height() {
    return (
        <GrommetLayout
            headerStyle={HeaderStyleValues.solid}
            zessLogo={zessLogoStyles.GREEN}
            layoutStyle={LayoutStyle.Layout}
        >
            <HeightPage />
        </GrommetLayout>
    )
}
