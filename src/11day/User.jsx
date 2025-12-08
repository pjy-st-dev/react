
import { useContext } from "react";
import { UserContext } from "./App";

function User(){
    return (
        <>
        이름 : {useContext(UserContext)}
        </>
    )
}

export default User;