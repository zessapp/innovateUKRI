import GrommetLayout, { LayoutStyle } from "src/components/common/GrommetLayout"
import { HeaderStyleValues, zessLogoStyles } from "src/components/common/Header"
import { FC } from "react"
import IndexPage from "../components/pages"

const Index: FC = () => {
    return (
        <GrommetLayout
            headerStyle={HeaderStyleValues.solid}
            zessLogo={zessLogoStyles.GREEN}
            layoutStyle={LayoutStyle.Layout}
        >
            <IndexPage />
        </GrommetLayout>
    )
}

export default Index

// import React, { useState } from 'react';
// import img from '../public/assets/zess_logo.png';

// export default function Home({Component, componentProps}){

//   return (

//       <h1 className="title">
//         <div>
//           <p> <span style={{position: 'absolute', top: 200, left: 150, right: 0, bottom: 1000, justifyContent: 'center', alignItems: 'center'}}>Welcome to Meal recommendations by Zess. Click <a href={'http://localhost:3000/diets'}>here</a> to get started.</span> </p>
//         </div>
//       </h1>

//   )

//   }
