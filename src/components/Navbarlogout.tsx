import { Flex, Button, Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {  SignOut } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbarlogout() {
  const [, setToken] = useLocalStorage<string>({
    key: "access_token",
    defaultValue: "",
  });
  const [, setUserLength] = useLocalStorage<string>({
    key: "userlength",
    defaultValue: "",
  });
  const [, setAdminname] = useLocalStorage<string>({
    key: "adminname",
    defaultValue: "",
  });
 const [logLoad,setLoad]=useState(false)
  const navigate = useNavigate();
  
  function LogoutFunction() {
    setLoad(true)
    setTimeout(()=>{
      setLoad(false)
      navigate("/");
      setToken("");
      setUserLength('')
      setAdminname('')
    },2000)
   
  }
  return (
    <Flex bg={"#002120"} py={10} pr={5} justify={"end"}>
    
      <Button
        onClick={LogoutFunction}
        variant="filled"
        color="red"
        radius="xs"
        size="xs"
        uppercase
      >
       {logLoad?<Loader color="light" size="sm" variant="bars" mr={1} />:<SignOut size={20} weight="bold" />}  Logout
      </Button>
    </Flex>
  );
}

export default Navbarlogout;
