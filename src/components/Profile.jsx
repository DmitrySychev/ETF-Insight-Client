import React, { useState, useEffect, useRef } from 'react';
import AuthService from "../services/auth.service";
import axios from "axios";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Copyright from "./Copyright";


const useStyles = makeStyles((theme) => ({
root: {
  display: 'flex',
  '& > * + *': {
    marginLeft: theme.spacing(2),
  },
},
appBarSpacer: theme.mixins.toolbar,
content: {
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
},
container: {
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
},
paper: {
  padding: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
},
fixedHeight: {
  height: 240,
},
}));


const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser)
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [state, setState] = useState([]);
  const form = useRef();
  const [clicked, setClicked] = useState(false);
  const [current_investment, setInvestment] = useState("");

  const onChangeInvestment = (e) => {
    const current_investment = e.target.value;
    console.log(e.target.value)
    setInvestment(current_investment);
  };

  useEffect(() => {
    // axios({
    //   method: 'POST',
    //   url: 'http://localhost:8080/user_etfs_all',
    //   headers: {
    //     "Authorization": `Bearer ${currentUser.accessToken}`
    //   }})
    //   .then(resp => {
    //     setState({ userEtfs: resp.data});
    //   }) 
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name)
    return axios
      .patch('http://localhost:8080/user_etfs', {
        current_investment
        })
        .then((response) => {
            console.log(response);  
        });
  };

  const render_user_etfs = () => {
    return (
      state.userEtfs.map((userEtfs) => (
        <TableRow key={userEtfs.etf.id}>
          <TableCell>{userEtfs.etf.id}</TableCell>
          <TableCell>{userEtfs.etf.symbol}</TableCell>
          <TableCell>{userEtfs.etf.name}</TableCell>
          <TableCell>{userEtfs.etf.asset_class}</TableCell>
          <TableCell>{                         
                        <form 
                          autoComplete="off"
                          onSubmit={handleSubmit}
                          ref={form}>
                          <TextField 
                            id={userEtfs.etf.id}
                            value={userEtfs.current_investment} 
                            onChange={onChangeInvestment}
                          />
                        </form>
          
          
                      // Dynamic text field rendering for the ETF when edit is clicked
                      // clicked ?
                      //   <form autoComplete="off">
                      //     <TextField id='standard-basic' />
                      //   </form>
                      // :
                      //   user_etf.investment
                      }
          </TableCell>
          <TableCell>
            <Button onClick={() => (setClicked(!clicked))}>
              <EditIcon /> 
            </Button>
          </TableCell>
          <TableCell><DeleteForeverIcon/></TableCell>
        </TableRow>))
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
              </p>
              <p>
                <strong>Id:</strong> {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <strong>Authorities:</strong> 
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
              </Paper>
            </Grid>
            {/* User ETF's */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  { state.userEtfs ?
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Asset Class</TableCell>
                        <TableCell>Invesment</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {render_user_etfs()}
                    </TableBody>
                  </Table>
                  :
                  <div>
                    <CircularProgress />
                  </div>
                }
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default Profile;