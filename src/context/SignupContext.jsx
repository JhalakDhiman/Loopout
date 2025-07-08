import { createContext,useState } from "react";

export const SignupContext = createContext();

export const SignupContextProvider = ({children})=>{

    const [signupData,setSignupData] = useState();

    return(
        <SignupContext.Provider value={{signupData,setSignupData}}>
            {children}
        </SignupContext.Provider>
    )
}