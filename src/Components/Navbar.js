import React, { useEffect, useState, useContext } from 'react';
import logo from '../logo.png';
import avatar from '../netflix-avatar.jpg';
import '../Navbar.css';
import { AuthContext, FirebaseContext } from '../store/Contexts';
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const { user,setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const [myusername, setMyusername] = useState(null);

  useEffect(() => {
    const userEmail = user.user.email;
    if (user) {
      const name = userEmail.split('@')[0];
      setMyusername(name);
    } else {
      // User is signed out
      console.log("user is logged out")
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <div className={`nav`} style={{ "backgroundColor": isAtTop ? 'transparent' : 'black' }}>
      <img className="nav_logo" src={logo} alt='Netflix logo' />
      <div className="nav_right">
        <i className="search_icon fas fa-search"></i>
        <i className="bell_icon fas fa-bell"></i>
        <span className="username">{myusername ? myusername : 'Guest'}</span>
        <img className="nav_avatar" src={avatar} alt='Netflix Avatar' />
        
        <span className="username m-2" onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>

      </div>
    </div>
  );
}

export default Navbar;
