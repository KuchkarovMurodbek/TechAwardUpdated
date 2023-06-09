import { Flex, Button } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { SignOut } from "@phosphor-icons/react";
import {  useState } from "react";
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
  const [logLoad, setLoad] = useState(false);
  const navigate = useNavigate();

  function LogoutFunction() {
    setLoad(true);
    setTimeout(() => {
      navigate("/");
      setLoad(false);
      setUserLength("");
      setAdminname("");
      
      setToken("");
      window.location.reload();
    }, 2000);
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
        disabled={logLoad?true:false}
      >
        {logLoad ? (
          <SignOut size={20} weight="bold"  />
        ) : (
          <SignOut size={20} weight="bold" />
        )}{" "}
        Logout
      </Button>
    </Flex>
  );
}

export default Navbarlogout;
