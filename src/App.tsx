import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { useLocalStorage } from "@mantine/hooks";

function App() {
  const [token] = useLocalStorage<string>({
    key: 'access_token',
    defaultValue: '',
  })

  const [login, setLogin] = useState<boolean>(false)

  useEffect(() => {
    if (token!=='' && !login) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [token])

  
  if(login) return <RouterProvider key={1} router={privateRoutes } />

  return <RouterProvider key={2}   router={publicRoutes} />
}

export default App
