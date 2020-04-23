import {h, FunctionalComponent} from "preact";
import style from "../Layout/Layout.css";

import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import FormPage from "../../pages/FormPage";
import FormExample from "../FormExample/FormExample";

const Layout: FunctionalComponent = () => (
    <div className={style.layout}>
        <aside className={style.aside}>
            nav
        </aside>
        <main className={style.main}>
            <HomePage path="/"/>
            <AboutPage path="/about"/>
            <FormPage path="/form">
                <FormExample/>
            </FormPage>
        </main>
    </div>
);

export default Layout
