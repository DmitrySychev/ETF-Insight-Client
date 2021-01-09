
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    searchBox: {
        width:120, 
    },
  }));

export default function FreeSolo() {
    const classes = useStyles();
    const [state, setState] = useState('');

    console.log(state)
  
    useEffect(() => {
      // fetch('http://localhost:8000/etfs')
      // .then(res => res.json())
      // .then((etf) => {
      //     setState({etf: [etf[0].symbol, etf[0].id], holdings: etf[0].holdings});
      // })
    }, [])

  return (
    <div className={classes.searchBox}>
      <TextField id="standard-basic" label="Search" />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const searchResults = [

];
