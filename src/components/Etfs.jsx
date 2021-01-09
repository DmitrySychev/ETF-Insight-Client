import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import EtfDataService from "../services/etf.service";
import AuthService from "../services/auth.service";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Etfs() {
  const currentUser = AuthService.getCurrentUser();
  const classes = useStyles();
  const [etfs, setEtfs] = useState([]);
  const [currentETF, setCurrentETF] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [clicked, setClicked] = useState(false);

  const setActiveETF = (etf, index) => {
    console.log(etf, index)
    setCurrentETF(etf);
    setCurrentIndex(index);
  };

  const retrieveETFs = () => {
    EtfDataService.getAll()
      .then(response => {
        setEtfs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveETFs();
    setCurrentETF(null);
    setCurrentIndex(-1);
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const respEtfs = await axios(
  //       'http://localhost:8080/api/etfs'
  //     );
  //     if (currentUser) {
  //       const respUserEtfs = await axios({
  //         method: 'POST',
  //         url: 'http://localhost:8080/user_etfs_all',
  //         headers: {
  //           "Authorization": `Bearer ${currentUser.accessToken}`
  //         }})
  //         setEtfs({ etfs: respEtfs.data, userEtfs: respUserEtfs.data });
  //       } else {
  //         setEtfs({ etfs: respEtfs.data});
  //       }
  //   }
  //   fetchData()
  //   
  // }, [])

  useEffect(() => {
    retrieveETFs();
  }, []);

  

  const render_etfs = () => {
    return (
      clicked ?
          etfs && etfs.data.map((etf, index) => (
            <TableRow onClick={() => setActiveETF(etf, index)} key={index}>
              <TableCell >{etf['Symbol']}</TableCell>
              <TableCell >{etf['Name']}</TableCell>
              <TableCell>{etf['Asset Class']}</TableCell>
              <TableCell>{etf['Assets']}</TableCell>
              <TableCell>{etf['Price']}</TableCell>
              <TableCell>{<AddIcon/>
              
                          // state.userEtfs ?
                          //   state.userEtfs.map((userEtf) => 
                          //     ( userEtf.etf_id === etf.id ?
                          //         <DeleteForeverIcon />
                          //         :
                          //         <AddIcon/>)
                          //     ) 
                          //   :
                          //   <AddIcon/>
                          }
               </TableCell>
            </TableRow>))
        :
          etfs && etfs.data.slice(0, 10).map((etf, index) => (
            <TableRow onClick={() => setActiveETF(etf, index)} key={index}>
              <TableCell component={Link} to={"/etfs/" + etf._id}>{etf['Symbol']}</TableCell>
              <TableCell >{etf['Name']}</TableCell>
              <TableCell>{etf['Asset Class']}</TableCell>
              <TableCell>{etf['Assets']}</TableCell>
              <TableCell>{etf['Price']}</TableCell>
              <TableCell>{<AddIcon/>
                
                          // state.userEtfs ?
                          //   state.userEtfs.map((userEtf) => 
                          //     ( userEtf.etf_id === etf.id ?
                          //         <DeleteForeverIcon />
                          //       :
                          //         <AddIcon/>)
                          //   ) 
                          // :
                          //   <AddIcon/>
                          }
              </TableCell>
            </TableRow>))
    )
  }

  return (
    <>
      <Title>
        ETF Database
    </Title>
    { etfs && etfs.data ?
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Asset Class</TableCell>
            <TableCell>Assets</TableCell>
            <TableCell>Price</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {render_etfs()}
        </TableBody>
      </Table>
      :
      <div >
        <CircularProgress />
      </div>
    }
      <div className={classes.seeMore}>
        <Button color="primary" onClick={() => (setClicked(!clicked))}>
          {clicked ?
            "See less ETF's"
          :
            "See more ETF's"
          }
        </Button>
      </div>
    </>
  );
}