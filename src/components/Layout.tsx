import {createStyles, Navbar,UnstyledButton,Badge,rem} from "@mantine/core";
import { Brand } from "./Brand";
import {  Checks, Folder, GlobeStand, UserCircle, Users } from "@phosphor-icons/react";
import {EnvelopeOpen} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import { useLocalStorage } from "@mantine/hooks";



const useStyles = createStyles((theme) => ({
  parentdIv: {
    display: "flex",
    "@media (max-width:476px)": {
      flexDirection: "column",
    },
  },

  navbar: {
    paddingTop: 0,
    "@media (max-width:476px)": {
      height: "100px",
  
      marginBottom: "200px",
    },
    background: "#002120",
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,
    "@media (max-width:476px)": {
      marginTop: "10px"
    },
    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

 
  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    color: "gray",
    textDecoration: "none",
    "&:hover": {
      color: "black",
    },
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },
}));

interface Props {
    children: ReactNode;
  }

export const Layout = ({ children }: Props) => {
  const { classes } = useStyles();
  const [usersLength]= useLocalStorage({key:'userlength'})
  const [adminname]=useLocalStorage<string>({key:'adminname'})
  const links = [
    {
      link: "/users",
      icon: <Users size={20} weight="regular" />,
      label: "Foydanaluvchilar",
      notifications: usersLength,
      color: "#2C73D2",
    },
    {
      link: "/newpost",
      icon: <EnvelopeOpen size={20} weight="regular" />,
      label: "Yangi Maqola",
      notifications: null,
      color: "#FFD43B",
    },
    {
      link: "/activepost",
      icon: <Checks  size={20} weight="regular" />,
      label: "Active Maqola",
      notifications: null,
      color: "#00DF7E",
    },
   
    {
      link: "/cities",
      icon: <GlobeStand size={20}  weight="regular" />,
      label: "Shahar Qo'shish",
      notifications: null,
      color: "#c4e456",
    },
    {
      link: "/category",
      icon: <Folder size={20} weight="regular"/>,
      label: "Categoriya Qo'shish",
      notifications: null,
      color: "#845EC2",
    },
    
  ];

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <NavLink to={link.link} className={classes.mainLinkInner}>
        <span style={{ marginRight: "2px", color: `${link.color}` }}>
          {link.icon}
        </span>
        <span>{link.label}</span>
      </NavLink>

      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  return (
    <div className={classes.parentdIv}>
      <Navbar
        height={800}
        width={{ sm: 200 }}
        px="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.section}>
          <Brand
            name="Admin"
            email={adminname}
            icon={<UserCircle size={30} />}
          />
        </Navbar.Section>
        <Navbar.Section className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </Navbar.Section>
      </Navbar>
     <div style={{ width: "100%", height: "100%" }}>{children}</div>
    </div>
  );
};
