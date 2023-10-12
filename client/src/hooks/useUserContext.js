import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
};