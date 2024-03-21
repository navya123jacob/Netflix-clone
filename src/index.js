import React  from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//importing context
import { firebaseapp,auth,firestore,storage} from './Configurationfire/config';
import { FirebaseContext } from './store/Contexts';
import { Context } from './store/Contexts';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{Firebase:firebaseapp,auth:auth,firestore,storage:storage}}>
    <Context>
    <App />
    </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);

reportWebVitals();
export {FirebaseContext};



