import { FC, useReducer, useState } from "react"
import Button from "../../../../common/Button"

import { Formik } from "formik"
import { Box, Text } from "grommet"
import Field from "src/components/common/Form/Field"
import Icon from "src/components/common/Icon"
import { ILocalEvidence } from "../AllergyAnnotation"

interface IInitialFormValues {
    title: string
    citation_snippet: string
    url?: string
    year?: string
    doi?: string
    author?: string
    notes?: string
    pages_used?: string
}

interface IEvidenceProps {
    deleteEvidence: Function
    saveEvidence: (updatedEvidence: ILocalEvidence) => void
    updateEvidence: (updatedEvidence: ILocalEvidence) => void
    evidence: ILocalEvidence
    title: string
}

const EvidenceForm: FC<IEvidenceProps> = (props: IEvidenceProps) => {
    const initialvalues: IInitialFormValues = {
        title: "",
        citation_snippet: "",
        url: "",
    }

    function reducer(state, action) {
        switch (action.type) {
            case "toggle":
                return { shouldShow: !state.shouldShow }
            default:
                throw new Error()
        }
    }

    const initialState = { shouldShow: true }

    // const [showEvidence, setShowEvidence] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Box margin={{ bottom: "medium" }}>
            <Box direction="row">
                <Text
                    color="brandGrey4"
                    weight="bold"
                    style={{ width: "fit-content" }}
                >
                    {props.title}
                </Text>
                <Box flex={{ grow: 1, shrink: 1 }} pad="0.3rem">
                    <Text
                        alignSelf="end"
                        onClick={() => {
                            dispatch({ type: "toggle" })
                        }}
                    >
                        <Icon
                            color="black"
                            icon={state.shouldShow ? "minus" : "plus"}
                            height="1rem"
                            width="1rem"
                        />
                    </Text>
                </Box>
            </Box>

            {state.shouldShow && (
                <Formik
                    validateOnChange={true}
                    validateOnBlur={true}
                    initialValues={props.evidence as IInitialFormValues}
                    validate={(values) => {
                        const errors: any = {}

                        if (!values.title) {
                            errors.title = "Please enter a title"
                        }
                        if (!values.citation_snippet) {
                            errors.citation_snippet =
                                "Please enter a citation snippet"
                        }
                        if (!values.url) {
                            errors.url = "Please enter a url"
                        }

                        // if (Object.keys(errors).length === 0) {
                        props.updateEvidence({
                            ...props.evidence,
                            citation_snippet: values.citation_snippet,
                            title: values.title,
                            doi: values.doi,
                            year: values.year,
                            author: values.author,
                            notes: values.notes,
                            url: values.url,
                            pages_used: values.pages_used,
                            saved: false,
                        })
                        // }

                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("Saving evidence to the cloud")
                        props.saveEvidence({
                            ...props.evidence,
                            citation_snippet: values.citation_snippet,
                            title: values.title,
                            doi: values.doi,
                            year: values.year,
                            author: values.author,
                            notes: values.notes,
                            url: values.url,
                            pages_used: values.pages_used,
                            saved: false,
                        })
                        setSubmitting(false)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleSubmit,
                        setFieldValue,
                        isValid,
                        dirty,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Field
                                values={props.evidence}
                                errors={errors}
                                fieldName="title"
                                label="Title"
                                setFieldValue={setFieldValue}
                                touched={touched}
                                type="INPUT"
                                required={true}
                                defaultValue={props.evidence.title}
                            />
                            <Field
                                values={props.evidence}
                                errors={errors}
                                fieldName="url"
                                label="Url"
                                setFieldValue={setFieldValue}
                                touched={touched}
                                type="INPUT"
                                required={true}
                                defaultValue={props.evidence.url}
                            />
                            <Field
                                values={props.evidence}
                                errors={errors}
                                fieldName="doi"
                                label="Doi"
                                setFieldValue={setFieldValue}
                                touched={touched}
                                type="INPUT"
                                defaultValue={props.evidence.doi}
                            />

                            <Box direction="row">
                                <Field
                                    values={props.evidence}
                                    errors={errors}
                                    fieldName="year"
                                    label="Year"
                                    setFieldValue={setFieldValue}
                                    touched={touched}
                                    type="INPUT"
                                    style={{ flex: 3, marginRight: "1rem" }}
                                    defaultValue={props.evidence.year}
                                />
                                <Field
                                    values={props.evidence}
                                    errors={errors}
                                    fieldName="author"
                                    label="Author"
                                    setFieldValue={setFieldValue}
                                    touched={touched}
                                    type="INPUT"
                                    style={{ flex: 3, marginRight: "1rem" }}
                                    defaultValue={props.evidence.author}
                                />
                                <Field
                                    values={props.evidence}
                                    errors={errors}
                                    fieldName="pages_used"
                                    label="Pages Used"
                                    setFieldValue={setFieldValue}
                                    touched={touched}
                                    type="INPUT"
                                    style={{ flex: 3 }}
                                    defaultValue={props.evidence.pages_used}
                                />
                            </Box>
                            <Field
                                values={props.evidence}
                                errors={errors}
                                fieldName="citation_snippet"
                                label="Citation Snippets"
                                setFieldValue={setFieldValue}
                                touched={touched}
                                type="TEXT_AREA"
                                required={true}
                                defaultValue={props.evidence.citation_snippet}
                            />
                            <Field
                                values={props.evidence}
                                errors={errors}
                                fieldName="notes"
                                label="Notes"
                                setFieldValue={setFieldValue}
                                touched={touched}
                                type="TEXT_AREA"
                                defaultValue={props.evidence.notes}
                            />
                            <Box justify="end" direction="row">
                                <Button
                                    primary
                                    label="Save"
                                    disabled={
                                        !!props.evidence?.saved ||
                                        !dirty ||
                                        !isValid
                                    }
                                    type="submit"
                                    size="medium"
                                    fill={false}
                                    alignSelf="end"
                                    margin={{
                                        vertical: "medium",
                                        right: "small",
                                    }}
                                />
                                <Button
                                    primary
                                    label="Delete"
                                    size="medium"
                                    color="#C32424"
                                    fill={false}
                                    alignSelf="end"
                                    onClick={() => {
                                        props.deleteEvidence()
                                    }}
                                    margin={{ vertical: "medium" }}
                                />
                            </Box>
                        </form>
                    )}
                </Formik>
            )}
        </Box>
    )
}

export default EvidenceForm
