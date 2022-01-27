import { FormField, Select, FormFieldProps, Text } from "grommet"
import ErrorText from "./ErrorText"
import { FormikTouched } from "formik"
import Input from "./Input"
import TextArea from "./TextArea"

type GrometFormField = FormFieldProps &
    // eslint-disable-next-line no-undef
    Omit<JSX.IntrinsicElements["input"], "placeholder">

interface IFieldProps<V extends object> extends GrometFormField {
    values: any
    errors: Partial<
        {
            [errorKey in keyof V]: string
        }
    >
    type: "SELECT" | "INPUT" | "TEXT_AREA"
    label?: string
    fieldName: string
    touched: FormikTouched<V>
    options?: string[]
    required?: boolean
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}
const Field = <V extends object>(props: IFieldProps<V>) => {
    // function Field<V extends object>(props: IFieldProps<V>) {
    const requiredStar = props.required ? " *" : ""
    const label = props.label + requiredStar || ""
    return (
        <FormField
            label={label}
            error={props.errors[props.fieldName]}
            style={{ textTransform: "capitalize", ...props.style }}
        >
            {(() => {
                switch (props.type) {
                    case "SELECT":
                        return (
                            <Select
                                options={props.options}
                                name={props.fieldName}
                                value={props.values[props.fieldName] || ""}
                                onChange={(e) => {
                                    props.setFieldValue(
                                        props.fieldName,
                                        e.value
                                    )
                                }}
                            />
                        )
                    case "INPUT":
                        return (
                            <Input
                                name={props.fieldName}
                                value={props.values[props.fieldName]}
                                onChange={(e) => {
                                    props.setFieldValue(
                                        props.fieldName,
                                        e.target.value
                                    )
                                }}
                            />
                        )
                    case "TEXT_AREA":
                        return (
                            <TextArea
                                name={props.fieldName}
                                value={props.values[props.fieldName]}
                                onChange={(e) => {
                                    props.setFieldValue(
                                        props.fieldName,
                                        e.target.value
                                    )
                                }}
                            />
                        )
                    default:
                        break
                }
            })()}
        </FormField>
    )
}

export default Field
