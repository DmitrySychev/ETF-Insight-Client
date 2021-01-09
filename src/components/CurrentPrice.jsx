import React, { useState, useEffect } from 'react';
import axios from "axios";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import moment from "moment";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function CurrentPrice(props) {
  const classes = useStyles();

  // console.log(props.etf)

  return (
    <>
      <Title>{ props.etf ? 
                  props.etf[0]
                :
                  'Loading'  } Current Price</Title>
      <Typography component="p" variant="h4">
        ${  props.etf ? 
              props.etf.price
            :
            <CircularProgress />}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {moment().format('MMMM Do YYYY')}
      </Typography>
    </>
  );
}
