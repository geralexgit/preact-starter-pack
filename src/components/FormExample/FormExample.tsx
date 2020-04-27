import {h, FunctionalComponent, JSX} from "preact"
import {useState} from 'preact/hooks'
import {useStoreon} from "storeon/preact"

import {createPost} from "../../actions"
import {isEmail} from '../../utils/validators'
import style from '../FormExample/FormExample.css'

type InputEvent = JSX.TargetedEvent<HTMLInputElement, Event> | JSX.TargetedEvent<HTMLTextAreaElement, Event>

const FormExample: FunctionalComponent = () => {
    const [formState, setFormState] = useState({userId: 42, errors: { email: null }});
    const {dispatch} = useStoreon();
    //TODO: simplify validation
    const inputHandler = ({currentTarget}: InputEvent) => {
        setFormState(() => {
            const inputValue = currentTarget.value.toString();
            const newState = {
                ...formState,
                [currentTarget.name]: currentTarget.value.toString()
            };
            if (currentTarget.name === 'email') {
                const emailErrors = [];
                return {
                    ...newState,
                    errors: {
                        ...newState.errors,
                        [currentTarget.name]: isEmail(inputValue) === true ? '' : 'is not email',
                    }
                }
            } else {
                return {
                    ...newState
                }
            }
        })
    };

    const {errors} = formState;
    const hasEmailError = errors && errors.email !== '' && errors.email !== null;
    const emailErrorClass = hasEmailError ? style.inputError : '';

    const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
        e.preventDefault();
        if (!hasEmailError) {
            dispatch(createPost, formState);
        }
    };

    return (
        <div className={style.formWrapper}>
            <h1>From example</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label for="titleField">Title</label>
                    <input onInput={inputHandler} name='title' type="text" placeholder="Title" id="titleField"/>
                    <label for="emailField">Email</label>
                    <input className={`${emailErrorClass}`} onInput={inputHandler} name='email' type="email" placeholder="Email" id="emailField"/>
                    {hasEmailError && <span>{errors.email}</span>}
                    <label for="commentField">Body</label>
                    <textarea onInput={inputHandler} name='body' type="text" placeholder="Input text here"
                              id="commentField"/>
                    <input class="button-primary" type="submit" value="Send"/>
                </fieldset>
            </form>
        </div>
    )
};

export default FormExample;
