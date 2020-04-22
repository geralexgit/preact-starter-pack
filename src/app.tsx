import {h, FunctionalComponent} from 'preact';
import {StoreContext} from 'storeon/preact'
import Router from 'preact-router';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FormPage from "./pages/FormPage";

import FormExample from "./components/FormExample/FormExample";

import { store } from "./store/index"

const App: FunctionalComponent = () => (
    <StoreContext.Provider value={store}>
        <div className='container'>
            <Router>
                <HomePage path="/"/>
                <AboutPage path="/about"/>
                <FormPage path="/form">
                    <FormExample/>
                </FormPage>
            </Router>
        </div>
    </StoreContext.Provider>
);

export default App;
