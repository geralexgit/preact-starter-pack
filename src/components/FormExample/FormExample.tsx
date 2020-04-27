import {h, FunctionalComponent, JSX} from "preact"
import {useStoreon} from "storeon/preact"

import {createPost} from "../../actions"
import {isEmail} from '../../utils/validators'
import useForm from '../../utils/hooks'
import style from '../FormExample/FormExample.css'

const FormExample: FunctionalComponent = () => {
    const {dispatch} = useStoreon();
    const stateSchema = {
        userId: {value: 42, error: ''},
        title: {value: '', error: ''},
        body: {value: '', error: ''},
        email: {value: '', error: ''},
    };
    const stateValidatorSchema = {
        title: {
            required: true,
            validator: {
                func: (value: string) => /^[a-zA-Z]+$/.test(value),
                error: 'Invalid title format.',
            },
        },
        body: {
            required: true,
            validator: {
                func: (value: string) => /^[a-zA-Z]+$/.test(value),
                error: 'Invalid body format.',
            },
        },
        email: {
            required: true,
            validator: {
                func: (value: string) => isEmail(value),
                error: 'Invalid email format.',
            },
        },
    };
    function onSubmitForm(state: any) {
        dispatch(createPost, state);
        alert(JSON.stringify(state, null, 2));
    }
    const {
        values,
        errors,
        dirty,
        handleOnChange,
        handleOnSubmit,
        setFieldError,
        setFieldValue,
        setStateSchema,
        disable,
    } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);
    const {title, body, email} = values;
    return (
        <div className={style.formWrapper}>
            <h1>From example</h1>
            <form onSubmit={handleOnSubmit}>
                <fieldset>
                    {/*<label for="titleField">Title</label>*/}
                    {/*<input onInput={inputHandler} name='title' type="text" placeholder="Title" id="titleField"/>*/}
                    <label htmlFor="title">
                        Title:
                        <input
                            type="text"
                            name="title"
                            className={`${errors.title && dirty.title ? style.inputError : ''}`}
                            value={title}
                            onChange={handleOnChange}
                        />
                        {errors.title && dirty.title && (
                            <span className="error">{errors.title}</span>
                        )}
                    </label>

                    <label for="emailField">Email
                        <input className={`${errors.email && dirty.email ? style.inputError : ''}`}
                               value={email}
                               onInput={handleOnChange} name='email' type="email" placeholder="Email" id="emailField"/>
                        {errors.email && dirty.email && (
                            <span className="error">{errors.email}</span>
                        )}
                    </label>

                    <label for="commentField">Body
                        <textarea onInput={handleOnChange} value={body} name='body' type="text" placeholder="Input text here"
                                  id="commentField"/>
                        {errors.body && dirty.body && (
                            <span className="error">{errors.body}</span>
                        )}
                    </label>
                    <input class="button-primary" type="submit" value="Send" disabled={errors.body !== ''}/>
                </fieldset>
            </form>
        </div>
    )
};

export default FormExample;
