import {h, FunctionalComponent} from 'preact';
import {StoreContext} from 'storeon/preact'
import Router from 'preact-router';
import { Link } from 'preact-router/match';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FormPage from "./pages/FormPage";

import FormExample from "./components/FormExample/FormExample";
import FormHooks from "./components/FormHooks/FormHooks";

import style from "./components/Layout/Layout.css";

import {store} from "./store"

const App: FunctionalComponent = () => (
    <StoreContext.Provider value={store}>
        <div className={style.layout}>
            <aside className={style.aside}>
                <blockquote>
                    <ul>
                        <li><Link activeClassName="active" href="/">Home</Link></li>
                        <li><Link activeClassName="active" href="/about">About</Link></li>
                        <li><Link activeClassName="active" href="/form">Form</Link></li>
                    </ul>
                </blockquote>
            </aside>
            <main className={style.main}>
                <Router>
                    <HomePage path="/"/>
                    <AboutPage path="/about"/>
                    <FormPage path="/form">
                        <FormExample/>
                        <FormHooks />
                    </FormPage>
                </Router>
            </main>
        </div>
    </StoreContext.Provider>
);
export const modalContainer = document.getElementById('modals');
export default App;
