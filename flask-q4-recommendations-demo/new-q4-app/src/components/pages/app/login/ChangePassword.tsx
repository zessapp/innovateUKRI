import {
    Box,
    Heading,
    Text,
    Form,
    FormField,
    TextInput,
    ResponsiveContext,
} from "grommet"
import { Hide, View } from "grommet-icons"
import { useRouter } from "next/router"
import styled from "styled-components"
import Button from "../../../common/Button"
import { useState, useContext } from "react"
import { Zess } from "zess-client"

const SignInContainer = styled(Box)`
    width: 100%;
    min-width: 350px;

    @media only screen and (min-width: ${(props) =>
            props.theme.global.breakpoints.small.value + 1}px) {
        width: 30vw;
    }
`
interface IDefaultFormValues {
    newPassword: string
}

interface ILoginProps {
    user: any
    requiredFields: object
}

// TODO - If loaded and logged in redirect to app

const Login: React.FC<ILoginProps> = (props) => {
    const defaultFormValue: IDefaultFormValues = {
        newPassword: "",
    }

    const [value, setValue] = useState(defaultFormValue)

    // const [user, setUser] = useState()

    const [passwordVisible, setPasswordVisible] = useState(false)

    const size = useContext(ResponsiveContext)

    const router = useRouter()

    // TODO - https://github.com/aws-amplify/amplify-js/issues/24

    const updatePassword = async (event, currentUser, requiredFields) => {
        if (event.value.newPassword && props.user && props.requiredFields) {
            try {
                const Auth = Zess.Api.getAuth()

                const user = await Auth.completeNewPassword(
                    props.user.data,
                    event.value.newPassword,
                    { ...requiredFields, name: event.value.name },
                    {}
                )
                // TODO - User experience for other kinds of errors
                if (user) {
                    router.push("/app")
                }
            } catch (error) {
                console.log("error updating password", error)
            }
        } else {
            console.log(
                "Please enter all information required for updating your password"
            )
            router.push("/app/login")
        }
    }
    /**
     * challengeParam.requiredAttributes
     */

    return (
        <Box
            align="center"
            margin={{ horizontal: size === "small" ? "large" : "0px" }}
        >
            <SignInContainer margin={{ top: "medium", bottom: "xlarge" }}>
                <Heading
                    size="xxlarge"
                    color="black"
                    margin={{ bottom: "small" }}
                >
                    {props.user &&
                    props.user.data?.challengeParam?.requiredAttributes.length >
                        0
                        ? "Update your details"
                        : "Change Password"}
                </Heading>
                <Text color="brandGrey3" margin={{ bottom: "medium" }}>
                    {props.user &&
                    props.user.data?.challengeParam?.requiredAttributes.length >
                        0
                        ? "Please update your details for your security."
                        : "Please change your password for your security."}
                </Text>
                <Form
                    value={value}
                    onChange={(nextValue: IDefaultFormValues) => {
                        setValue(nextValue)
                    }}
                    onReset={() => setValue(defaultFormValue)}
                    onSubmit={(event) =>
                        updatePassword(event, props.user, props.requiredFields)
                    }
                >
                    {props.user.data?.challengeParam?.requiredAttributes.map(
                        (value) => {
                            return (
                                <Box direction="column">
                                    <Text
                                        size="medium"
                                        weight="bold"
                                        color="black"
                                        margin={{ bottom: "small" }}
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {value}
                                    </Text>
                                    <FormField margin={{ bottom: "medium" }}>
                                        <TextInput
                                            name={value}
                                            type="text"
                                            placeholder={`Enter a ${value}`}
                                            reverse={true}
                                            style={{
                                                border: "none",
                                                height: "3rem",
                                            }}
                                        />
                                    </FormField>
                                </Box>
                            )
                        }
                    )}
                    <Text
                        size="medium"
                        weight="bold"
                        color="black"
                        style={{ textTransform: "capitalize" }}
                    >
                        Password
                    </Text>
                    <FormField margin={{ top: "small", bottom: "medium" }}>
                        <Box direction="row" align="center" round="small">
                            <TextInput
                                name="newPassword"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Your new password"
                                reverse={true}
                                style={{ border: "none", height: "3rem" }}
                            />
                            <Button
                                style={{
                                    paddingRight: "1rem",
                                    width: "auto",
                                }}
                                icon={
                                    passwordVisible ? (
                                        <Hide size="medium" />
                                    ) : (
                                        <View size="medium" />
                                    )
                                }
                                onClick={() => {
                                    setPasswordVisible(!passwordVisible)
                                }}
                            />
                        </Box>
                    </FormField>
                    <Box direction="row">
                        <Button
                            type="submit"
                            primary
                            label="Save"
                            size="small"
                            fill={true}
                        />
                    </Box>
                </Form>
            </SignInContainer>
        </Box>
    )
}

export default Login
