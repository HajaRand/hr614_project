
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import CreateUserForm from '../components/CreateUser'
import Layout from "../components/Layout";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SetupUsers() {
  return (
    <Layout>
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} sm={6}>
        <Item>
          <CreateUserForm></CreateUserForm>
        </Item>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Item>
          {/* Add your second component here */}
        </Item>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Item>
          {/* Add your third component here */}
        </Item>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Item>
          {/* Add your fourth component here */}
        </Item>
      </Grid>
    </Grid>
    </Layout>
  );
}
