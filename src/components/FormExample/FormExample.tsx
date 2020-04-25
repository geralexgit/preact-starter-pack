import { h, FunctionalComponent, JSX } from "preact";
import { useState } from 'preact/hooks';
import { useStoreon } from "storeon/preact";

import style from '../FormExample/FormExample.css'
import {createPost} from "../../actions";

type InputEvent = JSX.TargetedEvent<HTMLInputElement, Event> | JSX.TargetedEvent<HTMLTextAreaElement, Event>

const FormExample: FunctionalComponent = () => {
    const [formState, setFormState] = useState({userId: 42});
    const {dispatch} = useStoreon();

    const inputHandler = ({currentTarget}: InputEvent) => {
        setFormState(() => {
            const newState = {
                ...formState,
                [currentTarget.name]: currentTarget.value.toString()
            };
            return {
                ...newState
            }
        })
    };

    const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
        e.preventDefault();
        dispatch(createPost, formState);
    };

    return (
        <div className={style.formWrapper}>
            <h1>From example</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label for="nameField">Title</label>
                    <input onInput={inputHandler} name='title' type="text" placeholder="Title" id="nameField"/>
                    <label for="commentField">Body</label>
                    <textarea onInput={inputHandler} name='body' type="text" placeholder="Input text here" id="commentField" />
                    <input class="button-primary" type="submit" value="Send"/>
                </fieldset>
            </form>
        </div>
    )
};

export default FormExample;
