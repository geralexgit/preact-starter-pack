import { JSX } from "preact";
import { useState, useEffect, useCallback } from 'preact/hooks';
import { get_prop_values, is_object, is_required, VALUE, ERROR } from './index';
import { InputEvent as PreactInputEvent } from '../types'

/**
 * useForm hooks to handle your validation in your forms
 *
 * @param {object} stateSchema stateSchema.
 * @param {object} stateValidatorSchema stateSchemaValidation to validate your forms in react.
 * @param {function} submitFormCallback function to be execute during form submission.
 */
function useForm(
    stateSchema: any = {},
    stateValidatorSchema: any = {},
    submitFormCallback: (state: any) => void
) {
    const [state, setStateSchema] = useState(stateSchema);

    const [values, setValues] = useState(get_prop_values(state, VALUE));
    const [errors, setErrors] = useState(get_prop_values(state, ERROR));
    const [dirty, setDirty] = useState(get_prop_values(state, false));

    const [disable, setDisable] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    // Get a local copy of stateSchema
    useEffect(() => {
        setStateSchema(stateSchema);
        setInitialErrorState();
    }, []); // eslint-disable-line

    // Set a brand new field values and errors
    // If stateSchema changes
    useEffect(() => {
        // tslint:disable-next-line:no-shadowed-variable
        const values = get_prop_values(state, VALUE);
        // tslint:disable-next-line:no-shadowed-variable
        const errors = Object.keys(values).reduce((accu, curr) => {
            // @ts-ignore
            accu[curr] = validateField(curr, values[curr]);
            return accu;
        }, {});

        // Marked form as dirty if state was changed.
        setIsDirty(true);

        setValues(values);
        setErrors(errors);
    }, [state]); // eslint-disable-line

    // For every changed in our state this will be fired
    // To be able to disable the button
    useEffect(() => {
        if (isDirty) {
            setDisable(validateErrorState());
        }
    }, [errors, isDirty]); // eslint-disable-line

    // Set field value to specific field.
    const setFieldValue = ({ name, value }: {name: string; value: string;}) => {
        setValues((prevState) => ({ ...prevState, [name]: value }));
        // @ts-ignore
        setDirty((prevState) => ({ ...prevState, [name]: true }));
    };

    // Set to specific field.
    const setFieldError = ({ name, error }: {name: string, error: string}) => {
        setErrors((prevState) => ({ ...prevState, [name]: error }));
    };

    // Function used to validate form fields
    const validateField = useCallback(
        (name: string, value: string) => {
            const fieldValidator = stateValidatorSchema[name];
            // Making sure that stateValidatorSchema name is same in
            // stateSchema
            if (!fieldValidator) {
                return;
            }

            let error: string;
            error = is_required(value, fieldValidator['required']);

            // Bail out if field is not required and no value set.
            // To prevent proceeding to validator function
            if (!fieldValidator['required'] && !value) {
                return error;
            }

            // Run custom validator function
            if (error === '' && is_object(fieldValidator['validator'])) {
                // Test the function callback if the value is meet the criteria
                if (!fieldValidator['validator']['func'](value, values)) {
                    error = fieldValidator['validator']['error'];
                }
            }

            return error;
        },
        [stateValidatorSchema, values]
    );

    // Set Initial Error State
    // When hooks was first rendered...
    const setInitialErrorState = useCallback(() => {
        Object.keys(errors).map((name) =>
            setFieldError({ name, error: validateField(name, values[name]) })
        );
    }, [errors, values, validateField]);

    // Used to disable submit button if there's a value in errors
    // or the required field in state has no value.
    // Wrapped in useCallback to cached the function to avoid intensive memory leaked
    // in every re-render in component
    const validateErrorState = useCallback(
        () => Object.values(errors).some((error) => error),
        [errors]
    );

    // Use this callback function to safely submit the form
    // without any errors in state...
    const handleOnSubmit = useCallback(
        (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
            event.preventDefault();

            // Making sure that there's no error in the state
            // before calling the submit callback function
            if (!validateErrorState()) {
                submitFormCallback(values);
            }
        },
        [validateErrorState, submitFormCallback, values]
    );

    // Event handler for handling changes in input.
    const handleOnChange = useCallback(
        (event: PreactInputEvent) => {
            // @ts-ignore
            const name = event.target.name;
            // @ts-ignore
            const value = event.target.value;

            const error = validateField(name, value);

            setFieldValue({ name, value });
            setFieldError({ name, error });
        },
        [validateField]
    );

    return {
        dirty,
        values,
        errors,
        disable,
        setStateSchema,
        setFieldValue,
        setFieldError,
        handleOnChange,
        handleOnSubmit,
        validateErrorState,
    };
}

export default useForm;
