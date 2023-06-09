import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";

type Props = {};

function Login({}: Props) {
  const [visible, handlers] = useDisclosure(false);
  const [, setToken] = useLocalStorage<string>({
    key: "access_token",
    defaultValue: "",
  });
  const [, setAdminName] = useLocalStorage<string>({ key: "adminname" });
  const handleLoginSubmit = async ({ email, password }: adminType) => {
    handlers.open();

    await axios
      .post("https://tech.nextlevelgroup.uz/api/v1/admin/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data) {
          setToken(res.data.admin_token);
          setAdminName(res.data.user.email);
          console.log(res.data);
          handlers.close();
        }
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "ERR_BAD_REQUEST":
            handlers.close();
            notifications.show({
              title: "Error",
              color: "red",
              message: `${err.response.data.message}`,
            });
            break;
          case 'ERR_NETWORK':
            handlers.close();
            notifications.show({
              title: "Error",
              color: "red",
              message: `${err.message}`,
            });
            break;
       
        }

     
      });
  };

  //form submit
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  // adminlogin
  interface adminType {
    email: string;
    password: string;
  }

  return (
    <>
      <Container size={420} mt={100}>
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 500,
          })}
        >
          Admin panel
        </Title>
        <form onSubmit={form.onSubmit((values) => handleLoginSubmit(values))}>
          <Paper p={30} mt={30} radius="md">
            <TextInput
              label="Elektron pochta"
              placeholder="Elektron pochtagizni kiriting kiriting"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Parol"
              placeholder="Parolingizni kiriting"
              required
              mt="md"
              {...form.getInputProps("password")}
            />

            <Button fullWidth mt="xl" type="submit">
              Tizimga kirish
            </Button>
          </Paper>
        </form>
      </Container>
    </>
  );
}

export default Login;
