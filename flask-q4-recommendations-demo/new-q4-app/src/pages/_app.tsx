import { NextPageContext } from "next"
import { inspect } from "@xstate/inspect"
import App from "next/app"
import TagManager from "react-gtm-module"
import { getEnvironment } from "../utilities/env"
import { createGlobalStyle } from "styled-components"
import Amplify from "aws-amplify"
import awsExports from "../aws-exports"
// import {
//     mainMachine,
//     MainMachineContext,
//     mainModel,
// } from "src/machines/mainMachine"
Amplify.configure(awsExports)

const GlobalStyle = createGlobalStyle`
  html {
    font-size: clamp(16px, 1.8vh, 163.84px);
    line-height: 1.35em;

    /* Minimum aspect ratio */
    @media (min-aspect-ratio: 4/4) {
        font-size: clamp(16px, 1.8vh, 163.84px);
    }
    
    /* Maximum aspect ratio */
    @media (max-aspect-ratio: 4/4) {
        font-size: clamp(16px, 1.8vw, 163.84px);
    }

  }

`

const ZESS_ENV = getEnvironment(process.env.ZESS_ENV)

/*
TODO
    A cookie associated with a cross-site resource at http://googletagmanager.com/ was set without the `SameSite` attribute. 
    A future release of Chrome will only deliver cookies with cross-site requests if they are set with `SameSite=None` and `Secure`. 
    You can review cookies in developer tools under Application > Storage > Cookies and see more details at 
    https://www.chromestatus.com/feature/5088147346030592 and https://www.chromestatus.com/feature/5633521622188032.
*/

const tagManagerArgs = {
    gtmId: "GTM-WNX49XC",
}

interface AppContext extends NextPageContext {}

interface IAppState {
    // machine: typeof mainMachine.initialState
}

// The bootstrap component for the entire Zess application
class ZessApp extends App<AppContext, {}, IAppState> {
    // The state of the ZessApp
    // state = {
    //     machine: mainMachine.initialState,
    // }

    // // Get the main machine service that acts as the compositional root
    // service = interpret(mainMachine, {
    //     devTools: true,
    // }).onTransition((current) => this.setState({ machine: current }))

    componentDidMount() {
        // this.service.start()

        if (ZESS_ENV === "dev") {
            TagManager.initialize(tagManagerArgs)
        }
    }

    // componentWillUnmount() {
    //     this.service.stop()
    // }

    render() {
        const { Component, ...props } = this.props

        /**
         * The x-state statecharts.io inspector
         */

        // Get the main machine that acts as the compositional root
        // const machine = useMachine(mainMachine, {
        //     devTools: true,
        // })
        if (typeof window !== "undefined") {
            inspect({
                // options
                // url: 'https://statecharts.io/inspect', // (default)
                iframe: false, // open in new window,
            })
        }

        return (
            <>
                <GlobalStyle />
                <Component {...props} />
            </>

            // <MainMachineContext.Provider value={this.service}>
            //     <>
            //         <GlobalStyle />
            //         <Component {...props} />
            //     </>
            // </MainMachineContext.Provider>
        )
    }
}

export default ZessApp
