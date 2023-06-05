import { useEffect, useState } from "react";
import Navbarlogout from "../components/Navbarlogout";
import { Layout } from "../components/Layout";
import Usertable from "../components/Usertable";
import { users } from "../api/users";
import { Loader, Flex } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

 const [,setUserLength]= useLocalStorage({key:'userlength'})

  const fetchData = async () => {
    setLoading(true);
    await users
      .getUsers(activePage)
      .then((res) => {
        if (res) {
          setData(res.data.results);
          setLoading(false);
          setTotalCount(Math.ceil(res.data.totalCount / res.data.pageSize));
          setUserLength(res.data.totalCount)
        }       
      })
      .catch((err) => {
      if(err){
        setLoading(false);
      }
      });
  };

  useEffect(() => {
    fetchData();
  }, [activePage]);

  return (
    <Layout>
      <Navbarlogout />
      {loading ? (
        <Flex align={"center"} justify={"center"} h={200} w={900}>
          {" "}
          <Loader />{" "}
        </Flex>
      ) : (
        <Usertable
          data={data}
          activePage={activePage}
          setPage={setPage}
          totalCount={totalCount}
        />
      )}
    </Layout>
  );
}

export default Users;
