

import React,{useContext} from 'react';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Home';
import Register from './Components/Register';
import { AuthContext } from './store/Contexts';
function App() {
  const {user,setUser}=useContext(AuthContext)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!user ? (
            <Route path="/" element={<Register />} />
          ) : (
            <Route path="/" element={<Home />} />
          )}

        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
