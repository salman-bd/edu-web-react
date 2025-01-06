import {createContext, useContext} from "react"

export const UserContext = createContext({
    loginText: "Log In",
    signupText: "Sign Up",
    medhaOnneshonStatus: false,
    chitrangkanStatus: false,
    regFormHeadline: "",
    // regFormStatusHandler: () => {},
})


export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserContextProvider = UserContext.Provider