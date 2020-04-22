import { h, FunctionalComponent } from "preact"
import { Link } from 'preact-router/match';
import Start from "../components/Start/Start";

const Home: FunctionalComponent = () => (
    <div className='container'>
        <Link href={'/about'}>about</Link>
        <Link href={'/form'}>form</Link>
        <Start />
    </div>
);

export default Home
