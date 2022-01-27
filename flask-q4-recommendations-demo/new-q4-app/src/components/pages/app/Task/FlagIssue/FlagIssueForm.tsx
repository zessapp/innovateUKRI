import { FC } from "react"
import Button from "../../../../common/Button"

import { Formik } from "formik"
import { Box } from "grommet"
import Field from "src/components/common/Form/Field"

interface IInitialFormValues {
    issueType: string
    reason: string
    notes: string
}

const FormikExample: FC = () => {
    const initialvalues: IInitialFormValues = {
        issueType: "",
        reason: "",
        notes: "",
    }

    return (
        <Formik
            initialValues={initialvalues}
            validate={() => {
                // if (!values.email) {
                //     errors.email = "Required"
                // } else if (
                //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                //         values.email
                //     )
                // ) {
                //     errors.email = "Invalid email address"
                // }
                // return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                }, 400)
            }}
        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                setFieldValue,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        options={["Bad Data", "Problem with project"]}
                        values={values}
                        errors={errors}
                        fieldName="issueType"
                        label="Issue Type"
                        setFieldValue={setFieldValue}
                        touched={touched}
                        type="SELECT"
                    />
                    <Field
                        options={["Bad Data", "Problem with project"]}
                        values={values}
                        errors={errors}
                        fieldName="reason"
                        label="Reason"
                        setFieldValue={setFieldValue}
                        touched={touched}
                        type="SELECT"
                    />
                    <Field
                        values={values}
                        errors={errors}
                        fieldName="notes"
                        label="Notes"
                        setFieldValue={setFieldValue}
                        touched={touched}
                        type="TEXT_AREA"
                    />
                    <Box align="end">
                        <Button
                            primary
                            label="Flag Issue"
                            size="medium"
                            color="#C32424"
                            fill={false}
                            alignSelf="end"
                            onClick={() => {
                                // flagIssueModal.setFlagIssueModal(true)
                                console.log("Flag Issue")
                            }}
                            margin={{ vertical: "medium" }}
                        />
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default FormikExample
