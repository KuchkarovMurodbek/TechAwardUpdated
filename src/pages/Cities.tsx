import {
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  Loader,
  ScrollArea,
  Table,
  createStyles,
} from "@mantine/core";
import Navbarlogout from "../components/Navbarlogout";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";
import { cities } from "../api/cities";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles(() => ({
  parentdIv: {
    display: "flex",
    marginTop: "20px",

    "@media (max-width:476px)": {
      flexDirection: "column",
    },
  },
}));

interface typeCity {
  id: number;
  name: string;
}

function Cities() {
  const { classes } = useStyles();
  const [handleInput, setHandleInput] = useState("");
  const [city, setCity] = useState<typeCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useLocalStorage({ key: "access_token" });
  const [disableAdd,setDisableAdd]=useState(false)
 
  const fetchData = async () => {
    setIsLoading(true);

    await cities
      .getCities()
      .then((res) => {
        if (res) {
          setCity(res.data.results);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHandleInput(event.target.value);
  }

  async function CreateCity() {
    setDisableAdd(true)
    await axios
      .post(
        "http://tech.nextlevelgroup.uz/api/v1/cities",
        { name: handleInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setHandleInput("");
        if (res) {
          notifications.show({
            title: "Success",
            color: "green",
            message: "Added cities",
            autoClose: 2000,
          });
          setDisableAdd(false)
        }
      }).catch((err)=>{
        console.log(err);
        if(err){
          setDisableAdd(false)
        }
        
      });
    fetchData();
  }

  async function DeleteCity(id: number) {
   
   
    await axios
      .delete(`http://tech.nextlevelgroup.uz/api/v1/cities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res) {
          notifications.show({
            title: "Success",
            color: "red",
            message: "Removed cities",
            autoClose: 2000,
          });
         
        }
      }).catch((err)=>{
        console.log(err)
        if(err){
         console.log(err)
         
        }
      });
    fetchData();
  }

  return (
    <Layout>
      <Navbarlogout />
      <div className={classes.parentdIv}>
        <Box w={300} p={10}>
          <Input.Wrapper id="input-demo" label="Shahar">
            <Input
              id="input-demo"
              placeholder="Shaharlar qo'shish"
              name="name"
              value={handleInput}
              onChange={handleInputChange}
            />
          </Input.Wrapper>
          <Button mt={4} color="dark" onClick={CreateCity} disabled={disableAdd}>
            Qo'shish
          </Button>
        </Box>
        {isLoading ? (
          <Flex align={"center"} justify={"center"} h={100} w={100}>
            <Loader color="dark" variant="dots" />
          </Flex>
        ) : (
          <ScrollArea h={270}>
            <Table
              striped
              highlightOnHover
              withBorder
              withColumnBorders
              mt={2}
              w={400}
            >
              <thead style={{ background: "#148db4" }}>
                <tr>
                  <th style={{ color: "#fff" }}> Mavjud Viloyatlar Ro'yhati</th>
                </tr>
              </thead>

              <tbody>
                {city.map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{item.name}</span>
                      <CloseButton
                        title="Close popover"
                        size="xl"
                        iconSize={20}
                        onClick={() => DeleteCity(item.id)}
                       
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        )}
      </div>
    </Layout>
  );
}

export default Cities;
