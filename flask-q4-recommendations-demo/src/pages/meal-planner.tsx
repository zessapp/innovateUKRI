import { useRouter } from "next/router"
import GrommetLayout, { LayoutStyle } from "src/components/common/GrommetLayout"
import { HeaderStyleValues, zessLogoStyles } from "src/components/common/Header"
import MealPlannerPage from "src/components/pages/MealPlannerPage"

export default function MealPlanner() {
    return (
        <GrommetLayout
            headerStyle={HeaderStyleValues.solid}
            zessLogo={zessLogoStyles.GREEN}
            layoutStyle={LayoutStyle.Layout}
        >
            <MealPlannerPage />
        </GrommetLayout>
    )
}
