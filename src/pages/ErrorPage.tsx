import { createStyles, Title,  Button, Container, Group, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(65),
    paddingBottom: rem(60),
  },

 

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 200,
    fontSize: rem(18),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },


}));

export default function Errorpage() {
  const navigate=useNavigate()
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      
      <Title className={classes.title}>You have found a secret place.</Title>
    
      <Group position="center">
        <Button variant="subtle" size="md" onClick={()=>navigate('/')}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}