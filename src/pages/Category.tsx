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

import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { category } from "../api/category";

const useStyles = createStyles(() => ({
  parentdIv: {
    display: "flex",
    marginTop: "20px",

    "@media (max-width:476px)": {
      flexDirection: "column",
    },
  },
}));

interface typeCategory {
  id: number;
  name: string;
}
function Category() {
  const { classes } = useStyles();
  const [categoryData, setCategoryData] = useState<typeCategory[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useLocalStorage({ key: "access_token" });
  const [disableAdd,setDisableAdd]=useState(false)

  const getCategory = async () => {
    setIsLoading(true);
    await category
      .getCategory()
      .then((res) => {
        if (res) {
          setCategoryData(res.data.results);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  async function CreateCategory() {
    setDisableAdd(true)
    await axios
      .post(
        "https://tech.nextlevelgroup.uz/api/v1/categories",
        { name: categoryInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCategoryInput("");
        if (res) {
          notifications.show({
            title: "Success",
            color: "green",
            message: "Added Category",
            autoClose: 2000,
          });
          setDisableAdd(false)
        }
      }).catch((err)=>{
        console.log(err)
        if(err){
          setDisableAdd(false)
        }
      });
    getCategory();
  }

  async function DeleteCategory(id: number) {
    await axios
      .delete(`https://tech.nextlevelgroup.uz/api/v1/categories/${id}`, {
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
      });
    getCategory();
  }

  return (
    <Layout>
      <Navbarlogout />

      <div className={classes.parentdIv}>
        <Box w={300} p={10}>
          <Input.Wrapper id="input-demo" label="Categoriya"
             description={!categoryInput?'Firstly write category into input in order to save':''}>
            <Input
              id="input-demo"
              placeholder="Categoriya qo'shish"
              name="name"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            />
          </Input.Wrapper>
          <Button mt={4} color="dark" onClick={CreateCategory} disabled={!categoryInput?true :disableAdd}>
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
              <thead style={{background:'#00b2a7'}}>
                <tr>
                  <th style={{color:'#fff'}}> Mavjud Categoriya Ro'yhati</th>
                </tr>
              </thead>

              <tbody>
                {categoryData.map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                       
                        {item.name}
                      </span>
                      <CloseButton
                        title="Close popover"
                        size="xl"
                        iconSize={20}
                        onClick={() => DeleteCategory(item.id)}
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

export default Category;
