import { Box, Heading, Text, Paragraph, Anchor, Form, FormField } from "grommet"
import Container from "../../../common/Container"
import styled from "styled-components"
import { colours } from "../../../../../config/theme"
import PrimaryButton from "../../../common/PrimaryButton"

const Signup: React.FC = (props) => {
    return (
        <Box align="center">
            <Box margin={{ top: "medium", bottom: "xlarge" }} width="medium">
                <Heading size="xxlarge" color="black">
                    Sign Up
                </Heading>
                <Form>
                    <FormField
                        placeholder="Name"
                        margin={{ bottom: "medium" }}
                    ></FormField>
                    <FormField
                        placeholder="name@work-email.com"
                        margin={{ bottom: "medium" }}
                    ></FormField>
                    <FormField
                        placeholder="Your password"
                        margin={{ bottom: "medium" }}
                    ></FormField>
                    <Anchor
                        margin={{ bottom: "medium" }}
                        style={{ display: "block" }}
                    >
                        Forgot password?
                    </Anchor>
                    <PrimaryButton
                        type="submit"
                        primary
                        label="Login"
                        style={{ minWidth: "100%" }}
                    />
                </Form>
            </Box>
        </Box>
    )
}

export default Signup
