import React, { Suspense, useState } from 'react';
import logo from './assets/logo.svg';
import app from './app.module.scss';
import { Spinner } from "./components/spinner/";
import { ThankYou } from "./components/thank-you" ;
const ContactForm = React.lazy(() => import("./components/form"));
function App() {
  let [status , updateStatus ] = useState(false);
  const onComplete = ()=>{
    updateStatus( true );
  }
  const refresh = ()=>{
    updateStatus( false );
  }
  return (
    <div className="App">
      <header className={app.header}>
        <div className={app.header_contents}>
          <nav>
            <a href="https://www.abcemporio.com/" target="_blank">
              <img src={logo} alt="ABC Emporio" width="220" />
            </a>
          </nav>
        </div>
      </header>
      <div className={app.contents}>
        <div className={app.form}>
          {!status && <React.Fragment>
          <div className={app.form_header}>
            <h3>Please fill out this form</h3>
          </div>
          <div className={app.form_contents}>
            <Suspense fallback={<Spinner />}>
             <ContactForm  onComplete={onComplete}/>
            </Suspense>
          </div>
          </React.Fragment>}
          {status && <ThankYou onClose={refresh} />}
        </div>
      </div>
    </div>
  );
}

export default App;
