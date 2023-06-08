import { Layout } from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Flex,
  Image,
  Title,
  createStyles,
  Text,
  rem,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import { Rewind, Warning } from "@phosphor-icons/react";
import { posts } from "../api/posts";
import { useEffect, useState } from "react";
import { PostOneId } from "../interface/Post";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    padding: `calc(${theme.spacing.xl} * 1)`,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "30%",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 4)`,

    [theme.fn.smallerThan("sm")]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    flexDirection: "column",

    marginTop: theme.spacing.sm,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

function PostId() {
  const params = useParams<string>();
  const navigate = useNavigate();
  const [oneUser, setOneUSer] = useState<PostOneId>();
  const [token] = useLocalStorage({ key: "access_token" });
  const [diableIgnore, setDisableIgnore] = useState(false);
  const [disableActivate, setDisableActive] = useState(false);
  const isActive = true;
  const { classes } = useStyles();

  const fetchDataId = async () => {
    await posts
      .getPostId(params.id)
      .then((res) => {
        setOneUSer(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchDataId();
  }, [params]);
  console.log(oneUser);

  const activeFunction = () => {
    setDisableActive(true);
    setTimeout(() => {
      axios
        .post(
          `https://tech.nextlevelgroup.uz/api/v1/admin/posts/actived/?is_active=${isActive}`,
          { post_id: oneUser?.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res) {
            notifications.show({
              title: "Success",
              color: "green",
              message: "Actived post",
              autoClose: 1000,
            });

            setDisableActive(false);
          }

          setTimeout(() => {
            navigate(`/activepost`);
          }, 500);
        })
        .catch((err) => {
          if (err) {
            setDisableActive(false);
          }
        });
    }, 1000);
  };

  const ignoreFunction = () => {
    setDisableIgnore(true);
    setTimeout(() => {
      axios
        .post(
          "https://tech.nextlevelgroup.uz/api/v1/admin/posts/ignore",
          { post_id: oneUser?.id, user_id: oneUser?.user_id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res) {
            notifications.show({
              title: "Error",
              color: "red",
              message: "Ignored post",
              autoClose: 1500,
            });

            setDisableIgnore(false);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status) {
            notifications.show({
              title: "Error",

              color: "red",
              message: "This post is already ingnored",
            });
            setDisableIgnore(false);
          }
        });
    }, 1000);
  };

  return (
    <Layout>
      <Container py="xl">
        <Flex>
          <Button
            leftIcon={<Rewind size={18} />}
            variant="light"
            color="red"
            radius="xs"
            compact
            uppercase
            onClick={() => navigate("/newpost")}
            mr={4}
          >
            Posts
          </Button>
          <Tooltip label="Banned post" color="gray" position="bottom" withArrow>
            <Button
              onClick={ignoreFunction}
              color={"red"}
              radius="xs"
              compact
              uppercase
              mr={4}
              disabled={diableIgnore}
            >
              <Warning color="black" size={20} /> Ignore
            </Button>
          </Tooltip>
          <Button
            onClick={activeFunction}
            color={"teal"}
            radius="xs"
            compact
            uppercase
            disabled={disableActivate}
          >
            Activate
          </Button>
        </Flex>

        <div className={classes.wrapper}>
          <div className={classes.body}>
            <Title className={classes.title}> {oneUser?.title}</Title>
            <Text fw={500} fz="lg" mb={5}>
              {oneUser?.shortcontent}
            </Text>
            <Text fz="sm" c="dimmed">
              Created at {oneUser?.created_at.slice(0, 10)}
            </Text>

            <div className={classes.controls}>
              <Text ta="center" fz="lg" weight={500} mt="md">
                {oneUser?.author.first_name} {oneUser?.author.last_name}
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                {oneUser?.author.email} • {oneUser?.author.phone}
              </Text>
            </div>
          </div>
          {oneUser ? (
            <Image
              src={`http://tech.nextlevelgroup.uz/${oneUser?.img}`}
              className={classes.image}
              radius="lg"
            />
          ) : (
            ""
          )}
        </div>
        <ScrollArea h={370}>
          <Text
            fz="sm"
            dangerouslySetInnerHTML={{ __html: oneUser?.content }}
          ></Text>
        </ScrollArea>
      </Container>
    </Layout>
  );
}

export default PostId;
