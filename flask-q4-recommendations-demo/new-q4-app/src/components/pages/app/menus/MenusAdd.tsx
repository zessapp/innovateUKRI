import { Box, Form, FormField, TextInput, TextArea } from "grommet"
import Button from "../../../common/Button"
import { useState } from "react"
import SecureComponent from "../SecureComponent"
import AppPageHeader from "../AppPageHeader"

import { useDispatch } from "react-redux"
import { createMenu } from "../../../../reducers/tasks"

interface IAppMenusProps {}

interface IDefaultFormValues {
    name: string
    description: string
}

// function createForm<IDefaultFormValues>(defaultValues: IDefaultFormValues, useState) {
//     return useState(defaultValues)
// }

const AppMenus: React.FC<IAppMenusProps> = () => {
    const dispatch = useDispatch()

    const defaultValue: IDefaultFormValues = {
        name: "",
        description: "",
    }

    const [value, setValue] = useState(defaultValue)

    const CreateMenu = async (event) => {
        if (event.value.name) {
            try {
                // redirect to the newly created menu
                // router.push("/app")
                dispatch(
                    createMenu({
                        name: event.value.name,
                        description: event.value.description
                            ? event.value.description
                            : "",
                    })
                )
            } catch (error) {
                console.log("There is an error creating a menu item", error)
            }
        } else {
            console.log("Please enter a name for the menu")
        }
    }

    return (
        <SecureComponent>
            <Box direction="column">
                <AppPageHeader
                    heading="Create Menu"
                    backButton={{ title: "Menus", href: "/app/menus" }}
                />
                <Form
                    value={value}
                    onChange={(nextValue: IDefaultFormValues) => {
                        setValue(nextValue)
                    }}
                    onReset={() => setValue(defaultValue)}
                    onSubmit={(event) => CreateMenu(event)}
                    style={{ maxWidth: "40rem" }}
                >
                    <FormField margin={{ bottom: "medium" }} label="Name">
                        <TextInput
                            name="name"
                            placeholder="My New Menu"
                            dropHeight="xlarge"
                            maxLength={100}
                        />
                    </FormField>
                    <FormField
                        margin={{ bottom: "medium" }}
                        label="Description"
                    >
                        <TextArea
                            name="description"
                            placeholder="My New Menu"
                            maxLength={250}
                        />
                    </FormField>
                    <Box direction="row">
                        <Button
                            type="submit"
                            primary
                            label="Create"
                            size="medium"
                            margin={{ top: "small" }}
                        />
                    </Box>
                </Form>
            </Box>
        </SecureComponent>
    )
}

export default AppMenus
