import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import {
  Button,
  Container,
  Flex,
  Image,
  ScrollArea,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { Rewind } from "@phosphor-icons/react";
import { PostOneId } from "../interface/Post";
import { posts } from "../api/posts";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";

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

function ActivepostId() {
  const { classes } = useStyles();
  const params = useParams<string>();
  const navigate = useNavigate();
  const [oneUser, setOneUSer] = useState<PostOneId>();
  const [disableDeactive, setDisableDeactivate] = useState(false);
  const [token] = useLocalStorage({ key: "access_token" });
  const deIsActive = false;

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

  const deActiveFunction = () => {
    setDisableDeactivate(true);
    setTimeout(() => {
      axios
        .post(
          `http://tech.nextlevelgroup.uz/api/v1/admin/posts/actived/?is_active=${deIsActive}`,
          { post_id: oneUser?.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res) {
            notifications.show({
              title: "Success",
              color: "red",
              message: "deactived post",
              autoClose: 1000,
            });
            setDisableDeactivate(false);
            setTimeout(() => {
              navigate(`/activepost`);
            }, 500);
          }
        })
        .catch((err) => {
          if (err) {
            setDisableDeactivate(false);
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
            variant="filled"
            color="green"
            radius="xs"
            compact
            uppercase
            onClick={() => navigate("/activepost")}
            mr={4}
          >
            Posts
          </Button>

          <Button
            onClick={deActiveFunction}
            color={"red"}
            radius="xs"
            compact
            uppercase
            disabled={disableDeactive}
          >
            Deactivate
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

export default ActivepostId;
