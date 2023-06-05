import { Alert, Flex } from "@mantine/core";
import Navbarlogout from "../components/Navbarlogout";
import { Layout } from "../components/Layout";
import { CheckCircle } from "@phosphor-icons/react";

function Dashboard() {
  return (
    <Layout>
      <Navbarlogout />
      <Flex px={10} pt={5}>
        <Alert
          style={{ width: "100%" }}
          icon={<CheckCircle size={30} color={"green"} />}
          title="Accessed to system succesfully"
          color="green"
        >
          Something terrible happened! You made a mistake and there is no going
          back, your data was lost forever!
        </Alert>
      </Flex>
    </Layout>
  );
}

export default Dashboard;
