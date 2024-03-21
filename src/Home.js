
import './App.css';
import './Banner.css';
import './Navbar.css';
import requests from './Components/request';
import React,{useContext,createContext} from 'react';
import Row from './Components/Row';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';


const NRows=createContext()

function Home() {
  return (
    <div className="App">
     <Navbar/>
      <Banner/>
     <NRows.Provider value={{title:"NETFLIX ORIGINAL",genre:requests.NetflixOrg,isLargeRow:true}}>
      <Row/>
      </NRows.Provider>
     <NRows.Provider value={{title:"Trending Now",genre:requests.Popular}}>
     <Row/>
     </NRows.Provider>
     <NRows.Provider value={{title:"Animation Movies",genre:requests.Animation}}>
     <Row/>
     </NRows.Provider>
     <NRows.Provider value={{title:"Action Movies",genre:requests.action}}>
     <Row/>
     </NRows.Provider>
     <NRows.Provider value={{title:"Crime Movies",genre:requests.Crime}}>
     <Row/>
     </NRows.Provider>
     <NRows.Provider value={{title:"Adventure Movies",genre:requests.Adventure}}>
     <Row/>
     </NRows.Provider>
     <NRows.Provider value={{title:"Horror Movies",genre:requests.Horror}}>
     <Row/>
     </NRows.Provider>
     <NRows.Provider value={{title:"Comedy Movies",genre:requests.Comedy}}>
     <Row/>
     </NRows.Provider>
    
    </div>
  );
}

export default Home;
export {NRows};