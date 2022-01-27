import {
    Box,
    Heading,
    Anchor,
    Form,
    FormField,
    TextInput,
    ResponsiveContext,
    Text,
} from "grommet"
import { useRouter } from "next/router"
import styled from "styled-components"
import Button from "../../../common/Button"
import { useState, useContext, Fragment, FC } from "react"
import { Zess, UtilError } from "zess-client"
import ChangePassword from "./ChangePassword"
import { CognitoUser } from "amazon-cognito-identity-js"

const SignInContainer = styled(Box)`
    width: 100%;
    min-width: 350px;

    @media only screen and (min-width: ${(props) =>
            props.theme.global.breakpoints.small.value + 1}px) {
        width: 30vw;
    }
`

interface IDefaultFormValues {
    email: string
    password: string
}

interface INewPasswordRequired {
    required: boolean
    newPasswordRequiredUser?: object
    newPasswordRequiredFields?: object
}

// TODO - If loaded and logged in redirect to app

const Login: FC = () => {
    const defaultValue: IDefaultFormValues = {
        email: "",
        password: "",
    }

    const [
        newPasswordRequired,
        setNewPasswordRequired,
    ] = useState<INewPasswordRequired>({
        required: false,
    })

    const [passwordError, setPasswordError] = useState<string>("")

    const [value, setValue] = useState(defaultValue)

    const size = useContext(ResponsiveContext)

    const router = useRouter()

    const handleSignInResponse = (
        userResponse: Zess.ZessGraphQLResponse<CognitoUser>
    ) => {
        if (UtilError.hasZessError(userResponse)) {
            const error = userResponse.errors[0]
            if (UtilError.isNotAuthorisedError(error)) {
                setPasswordError("Incorrect username or password")
            }
        } else {
            router.push("/app")
        }
    }

    const signIn = async (event) => {
        if (event.value.email && event.value.password) {
            try {
                const Auth = Zess.Api.getAuth()
                const userResponse = await Auth.signIn(
                    event.value.email,
                    event.value.password
                )
                if (
                    userResponse.data?.challengeName === "NEW_PASSWORD_REQUIRED"
                ) {
                    setNewPasswordRequired({
                        required: true,
                        newPasswordRequiredUser: userResponse,
                        newPasswordRequiredFields: { email: event.value.email },
                    })
                    // Store the user data in localstorage so that it can be retrieved by the 'change-password' page
                    // localStorage.setItem('newPasswordRequiredUser', JSON.stringify(user))
                    // Store the form data into localStorage so that it can be retrieved by the 'change-password' page
                    // localStorage.setItem('newPasswordRequiredFields', JSON.stringify({ email: event.value.email }))
                    // router.push("/app/change-password")
                } else {
                    handleSignInResponse(userResponse)
                }
            } catch (e) {
                console.log("There was a caught signIn error:", e)
            }
        } else {
            setPasswordError("Please enter a username and password")
        }
    }

    return (
        <Fragment>
            {!newPasswordRequired.required && (
                <Box
                    align="center"
                    margin={{ horizontal: size === "small" ? "large" : "0px" }}
                >
                    <SignInContainer
                        margin={{ top: "medium", bottom: "xlarge" }}
                    >
                        <Heading size="xxlarge" color="black">
                            Sign In
                        </Heading>
                        <Form
                            value={value}
                            onChange={(nextValue: IDefaultFormValues) => {
                                setPasswordError("")
                                setValue(nextValue)
                            }}
                            onReset={() => setValue(defaultValue)}
                            onSubmit={(event) => signIn(event)}
                        >
                            <FormField margin={{ bottom: "medium" }}>
                                <TextInput
                                    name="email"
                                    placeholder="name@work-email.com"
                                    dropHeight="xlarge"
                                />
                            </FormField>
                            <FormField
                                margin={{ bottom: "medium" }}
                                type="password"
                            >
                                <TextInput
                                    name="password"
                                    type="password"
                                    placeholder="Your password"
                                />
                            </FormField>
                            {passwordError && (
                                <Box margin={{ bottom: "medium" }}>
                                    <Text size="medium" color="errorRed">
                                        {passwordError}
                                    </Text>
                                </Box>
                            )}
                            <Anchor
                                margin={{ bottom: "medium" }}
                                size="medium"
                                style={{ display: "block" }}
                            >
                                Forgot password?
                            </Anchor>
                            <Box direction="row">
                                <Button
                                    type="submit"
                                    primary
                                    label="Login"
                                    size="small"
                                    fill={true}
                                />
                            </Box>
                        </Form>
                    </SignInContainer>
                </Box>
            )}
            {newPasswordRequired.required && (
                <ChangePassword
                    user={
                        newPasswordRequired.newPasswordRequiredUser as CognitoUser
                    }
                    requiredFields={
                        newPasswordRequired.newPasswordRequiredFields
                    }
                />
            )}
        </Fragment>
    )
}

export default Login
