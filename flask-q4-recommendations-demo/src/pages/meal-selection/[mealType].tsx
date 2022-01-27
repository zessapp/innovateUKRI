import { useRouter } from "next/router"
import GrommetLayout, { LayoutStyle } from "src/components/common/GrommetLayout"
import { HeaderStyleValues, zessLogoStyles } from "src/components/common/Header"
import MealPlannerSelectionPage from "src/components/pages/MealPlannerSelectionPage"

export default function MealPlanner() {
    const router = useRouter()
    const { mealType } = router.query
    return (
        <GrommetLayout
            headerStyle={HeaderStyleValues.solid}
            zessLogo={zessLogoStyles.GREEN}
            layoutStyle={LayoutStyle.Layout}
        >
            <MealPlannerSelectionPage
                mealType={Array.isArray(mealType) ? mealType[0] : mealType}
            />
        </GrommetLayout>
    )
}
