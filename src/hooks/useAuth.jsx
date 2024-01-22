
import { useContext } from "react";
import { GlobalContext } from "../context/ContextProvider";

const useAuth = () => {
    const auth =useContext(GlobalContext)
    return auth;
};

export default useAuth;