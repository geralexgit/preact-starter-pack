import {h, FunctionalComponent} from "preact"
import GetPosts from "../components/GetPosts/GetPosts";
import Posts from "../components/Posts/Posts";

const AboutPage: FunctionalComponent<{path: string}> = () => (
    <div>
        <GetPosts />
        <Posts />
    </div>
);

export default AboutPage
