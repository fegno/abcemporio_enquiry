import React, { Suspense } from 'react';
import logo from './assets/logo.svg';
import app from './app.module.scss';
import { Spinner } from "./components/spinner/";
const ContactForm = React.lazy(() => import("./components/form"));
function App() {
  return (
    <div className="App">
      <header className={app.header}>
        <div className={app.header_contents}>
          <nav>
            <a href="/">
              <img src={logo} alt="ABC Emporio" width="220" />
            </a>
          </nav>
        </div>
      </header>
      <div className={app.contents}>
        <div className={app.form}>
          <div className={app.form_header}>
            <h3>Please fill out this form</h3>
          </div>
          <div className={app.form_contents}>
            <Suspense fallback={<Spinner />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
