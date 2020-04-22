import { h, FunctionalComponent } from 'preact';
import Router from 'preact-router';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FormPage from "./pages/FormPage";

import FormExample from "./components/FormExample/FormExample";

const App: FunctionalComponent = () => (
  <div className='container'>
      <Router>
          <HomePage path="/" />
          <AboutPage path="/about" />
          <FormPage path="/form">
              <FormExample />
          </FormPage>
      </Router>
  </div>
);

export default App;
