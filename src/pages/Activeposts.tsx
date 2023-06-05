import { useEffect, useState } from "react";
import Navbarlogout from "../components/Navbarlogout";
import { Layout } from "../components/Layout";
import { posts } from "../api/posts";
import {
  ActionIcon,
  Badge,
  Center,
  Flex,
  Input,
  Loader,
  Pagination,
  ScrollArea,
  Select,
} from "@mantine/core";
import { ArrowDown, ArrowUp, MagnifyingGlass } from "@phosphor-icons/react";

import ActivePostComponent from "../components/ActivePost";

function ActivePost() {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [search, setSearch] = useState("");
  const [filtervalue, setFilterValue] = useState<string | null>();
  const [IsTrue, setIsTrue] = useState(false);
  const  [ASC_DESC, setASC_DESC]=useState<'ASC' | 'DESC'>('ASC')
  const [totalPost,setTotalPost]=useState(null)


  const fetchData = async () => {
    setIsLoading(true);


    if(filtervalue){
        await posts.getActivePostFiltered(search, activePage, filtervalue,ASC_DESC).then((res) => {
          if (res) {
            console.log(res.data);
            setPost(res.data.results);
            setIsLoading(false);
            setTotalCount(Math.ceil(res.data.active_count / res.data.pageSize));
            setTotalPost(res.data.active_count)
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      await posts
        .getActivePost(search.length > 0 ? 1 : activePage, search)
        .then((res) => {
          if (res) {
            console.log(res.data);
            setPost(res.data.results);
            setIsLoading(false);
            setTotalCount(Math.ceil(res.data.active_count / res.data.pageSize));
            setTotalPost(res.data.active_count)
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      }
    
    // await posts
    //   .getActivePost(search, activePage)
    //   .then((res) => {
    //     if (res) {
    //       setPost(res.data.results);
    //       setIsLoading(false);
    //       setTotalCount(Math.ceil(res.data.totalCount / res.data.pageSize));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });
  };

  useEffect(() => {
    fetchData();
  }, [search, activePage,filtervalue,ASC_DESC]);


  const functionAscDesc = (true_false:boolean)=>{
    if(true_false===true){
      setASC_DESC('DESC')
    }else{
      setASC_DESC('ASC')
    }
    setIsTrue(true_false)
  }

  return (
    <Layout>
      <Navbarlogout />
      <Flex p={10} align={"center"}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<MagnifyingGlass size={20} />}
          placeholder="Your email"
          size="xs"
        />
        <Badge color="cyan" size="lg" radius="xs" variant="light" mx={2}>
          Total:{totalPost}
        </Badge>
        <Select
          ml={2}
          value={filtervalue}
          onChange={setFilterValue}
          placeholder="Filter by"
          clearable
          data={[
            { value: "title", label: "title" },
            { value: "created_at", label: "created_at" },
          ]}
        />

        {IsTrue ? (
          <ActionIcon
            mx={2}
            color="gray"
            size="lg"
            radius="xl"
            variant="filled"
            onClick={() => functionAscDesc(false)}
          >
            <ArrowUp size={20} />
          </ActionIcon>
        ) : (
          <ActionIcon
            mx={2}
            color="gray"
            size="lg"
            radius="xl"
            variant="filled"
            onClick={() => functionAscDesc(true)}
          >
            <ArrowDown size={20} />
          </ActionIcon>
        )}
      </Flex>
      {isLoading ? (
        <Flex align={"center"} justify={"center"} h={200} w={900}>
          <Loader color="dark" size="xl" variant="dots" />
        </Flex>
      ) : (
        <ScrollArea h={450}>
          <ActivePostComponent data={post} />
        </ScrollArea>
      )}

      <Center maw={400} h={60} mx="auto">
        <Pagination
          color="dark"
          radius="xl"
          value={activePage}
          onChange={setPage}
          total={totalCount}
        />
      </Center>
    </Layout>
  );
}

export default ActivePost;
