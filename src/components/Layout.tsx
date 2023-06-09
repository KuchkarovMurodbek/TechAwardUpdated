import {
  createStyles,
  Navbar,

  Badge,
  rem,
} from "@mantine/core";
import { Brand } from "./Brand";
import {
  Checks,
  Folder,
  GlobeStand,
  UserCircle,
  Users,
} from "@phosphor-icons/react";
import { EnvelopeOpen } from "@phosphor-icons/react";
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
    height: "100vh",
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
      marginTop: "10px",
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



  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    textDecoration:'none',
    color:'gray',
    "&:hover": {
      color: "black",
      backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  
    },
  },
  activeLink:{
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    textDecoration:'none',
    color:'gray',
    backgroundColor:
    theme.colorScheme === "dark"
      ? theme.colors.dark[6]
      : theme.colors.gray[0],
 
  },




}));

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { classes } = useStyles();
  const [usersLength] = useLocalStorage({ key: "userlength" });
  const [adminname] = useLocalStorage<string>({ key: "adminname" });
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
      label: "Noactive Maqola",
      notifications: null,
      color: "#FFD43B",
    },
    {
      link: "/activepost",
      icon: <Checks size={20} weight="regular" />,
      label: "Active Maqola",
      notifications: null,
      color: "#00DF7E",
    },

    {
      link: "/cities",
      icon: <GlobeStand size={20} weight="regular" />,
      label: "Shahar Qo'shish",
      notifications: null,
      color: "#c4e456",
    },
    {
      link: "/category",
      icon: <Folder size={20} weight="regular" />,
      label: "Categoriya Qo'shish",
      notifications: null,
      color: "#845EC2",
    },
  ];

  return (
    <div className={classes.parentdIv}>
      <Navbar width={{ sm: 200 }} px="md" className={classes.navbar}>
        <Navbar.Section className={classes.section}>
          <Brand
            name="Admin"
            email={adminname}
            icon={<UserCircle size={30} />}
          />
        </Navbar.Section>
        <Navbar.Section className={classes.section}>
          <div className={classes.mainLinks}>
            {links.map((link) => (
              <NavLink to={link.link} className={({isActive})=>isActive?classes.activeLink:classes.mainLinkInner} key={link.label}>
                <span style={{ marginRight: "2px", color: `${link.color}` }}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
               
          
              </NavLink>
        
            ))}
          </div>
        </Navbar.Section>
      </Navbar>
      <div style={{ width: "100%", height: "100%" }}>{children}</div>
    </div>
  );
};
