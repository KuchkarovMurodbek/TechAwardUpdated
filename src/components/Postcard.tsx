import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  Badge,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { typePost } from "../interface/Post";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    boxShadow: theme.shadows.sm,
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export default function Postcard({ data }: { data: typePost[] }) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Container py="xl">
      <SimpleGrid cols={1} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {data.map((post) => (
          <Card
            key={post.id}
            p="md"
            radius="md"
            component="a"
            className={classes.card}
            onClick={() => navigate(`/newpost/${post.id}`)}
          >
            <Flex justify={"space-between"}>
              <div>
                <Text className={classes.title} mt={5}>
                  {post.title}
                </Text>
                <Text size="sm" lineClamp={1}>
                  {post.shortcontent}
                </Text>
                <Flex align="center" my={5}>
                  <Badge color="red">not active</Badge>
                  <Badge color="teal">{post.name}</Badge>
                  <Text
                    ml={1}
                    color="dimmed"
                    size="xs"
                    transform="uppercase"
                    weight={700}
                  >
                    {post.created_at.slice(0, 10)}
                  </Text>
                </Flex>
              </div>
              {post ? (
                <Image
                  src={`http://tech.nextlevelgroup.uz/${post.img}`}
                  width={100}
                />
              ) : (
                ""
              )}
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
