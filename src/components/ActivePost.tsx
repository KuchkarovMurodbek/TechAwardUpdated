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
  
  const useStyles = createStyles((theme) => ({
    card: {
      transition: "transform 150ms ease, box-shadow 150ms ease",
      boxShadow: theme.shadows.md,
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
 

  interface typePost {
    id: number;
    title: string;
    shortcontent: string;
    likes: number;
    img: string;
    created_at: string;
    updated_at: string;
    isactive: boolean;
    actived_at: string;
    category: number;
    content: string;
    user_id: number;
    name:string
  }
  [];
  
  export default function ActivePostComponent({ data }: { data: typePost[] }) {
    const { classes } = useStyles();
    const navigate = useNavigate();
  
    return (
      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {data.map((post) => (
            <Card
              key={post.id}
              p="md"
              radius="md"
              component="a"
              className={classes.card}
              onClick={() => navigate(`/activepost/${post.id}`)}
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
                    <Badge color="green" variant="filled">Active</Badge>
                    <Badge color="teal" mx={1}>{post.name}</Badge>
                    <Text
                      mx={1}
                      color="dimmed"
                      size="xs"
                      transform="uppercase"
                      weight={700}
                    >
                      {post.created_at.slice(0, 10)}
                    </Text>
                  </Flex>
                </div>
              
                <Image
                  src={`http://tech.nextlevelgroup.uz/${post.img}`}
                  width={100}
                  radius={10}
                />
              
              </Flex>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    );
  }
  