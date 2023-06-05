import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Center,
  Pagination,
  Flex,
  ActionIcon,
  Drawer,
  Text,
  List,
  ThemeIcon
} from "@mantine/core";
import {
  At,
  Cake,
  Clock,
  Eye,
  GlobeHemisphereEast,
  Phone,
  User,
} from "@phosphor-icons/react";
import { useDisclosure } from "@mantine/hooks";
import { UserId, UserType } from "../interface/User";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
   

    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));



export default function UserTable({
  data,
  activePage,
  setPage,
  totalCount,
}: {
  data: UserType[];
  activePage: number;
  setPage: any;
  totalCount: number;
}) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [getUserId, setGetUserId] = useState<UserId>();

const getOneUserById = async (id: number) => {
    open();
    await axios
      .get(`http://tech.nextlevelgroup.uz/api/v1/users/${id}`)
      .then((res) => {
        setGetUserId(res.data);
      })
      .catch((err) => console.log(err));
  };

  const MapData = [
    { id: 1, label: "Firstname", icon: <User size={15} /> },
    { id: 2, label: "Lastname", icon: <User size={15} /> },
    { id: 3, label: "Email", icon: <At size={15} /> },
    { id: 4, label: "Phone", icon: <Phone size={15} /> },
    { id: 5, label: "Birthday", icon: <Cake size={15} /> },
    { id: 6, label: "Created at", icon: <Clock size={15} /> },
    { id: 7, label: "City", icon: <GlobeHemisphereEast size={15} /> },
  ];
  return (
    <>
      <ScrollArea
        h={470}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Center w={640} mx="auto" pt={15}>
          <Table miw={800} striped highlightOnHover withBorder>
            <thead
              style={{ color: "#fff" }}
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <th>N</th>
                <th>Firstname</th>
                <th>Phone</th>
                <th>Email</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.first_name}</td>
                  <td>{row.phone}</td>
                  <td>{row.email}</td>
                  <td >
                    <ActionIcon
                      variant="transparent"
                      onClick={() => getOneUserById(row.id)}
                    >
                      <Eye size={16} weight="duotone" />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Center>
      </ScrollArea>
      <Flex justify={"center"} pt={10}>
        <Pagination color="dark" radius={"lg"} value={activePage} onChange={setPage} total={totalCount} />
      </Flex>
      <Drawer
        opened={opened}
        onClose={close}
        title="Detailed Information"
        position="right"
        size="xs"
      >
        <List spacing="xs" size="sm" center listStyleType="none">
          {MapData.map((item) => (
            <List.Item
              key={item.id}
              icon={
                <ThemeIcon color="blue" variant="light" size={24} radius="xl">
                  {item.icon}
                </ThemeIcon>
              }
            >
              {item.label}:{" "}
              <Text fw={500}>
                {item.id == 1
                  ? getUserId?.first_name
                  : item.id == 2
                  ? getUserId?.last_name
                  : item.id == 3
                  ? getUserId?.email
                  : item.id == 4
                  ? getUserId?.phone
                  : item.id == 5
                  ? getUserId?.birthday.slice(0, 10)
                  : item.id == 6
                  ? getUserId?.created_at.slice(0, 10)
                  : getUserId?.city.name}
              </Text>
            </List.Item>
          ))}
        </List>
      </Drawer>
    </>
  );
}
