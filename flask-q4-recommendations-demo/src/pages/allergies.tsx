import styled from "styled-components"
import React from "react"
import { useRouter } from "next/router"
import { useUserContext } from "../components/AppContext"

import AllergiesPage from "../components/pages/AllergiesPage"
import GrommetLayout, { LayoutStyle } from "src/components/common/GrommetLayout"
import { HeaderStyleValues, zessLogoStyles } from "src/components/common/Header"

export default function Allergies() {
    return (
        <GrommetLayout
            headerStyle={HeaderStyleValues.solid}
            zessLogo={zessLogoStyles.GREEN}
            layoutStyle={LayoutStyle.Layout}
        >
            <AllergiesPage />
        </GrommetLayout>
    )
}
