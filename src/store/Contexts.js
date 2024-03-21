//firebase config app being passed
import { createContext,useState } from "react";

const FirebaseContext=createContext()

const AuthContext=createContext(null)

const Context=({children})=>{
    // Here, `children` represents the elements passed between <Context> tags
    
    const [user,setUser]=useState(null)
    const [signin, setSignin] = useState(false);
    return(
        //   Render whatever children elements were passed 
        <AuthContext.Provider value={{user,setUser,signin,setSignin}}>
        {children}
        </AuthContext.Provider>
    )
}
export {FirebaseContext,AuthContext,Context};
