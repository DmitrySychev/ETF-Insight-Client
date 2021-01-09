import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
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

export default function Holdings(props) {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);

  const sortHoldings = () => {
    if (props.holdings) {
      var a = [...props.holdings].sort(function(a, b) { 
        return a.id - b.id;
      })
    }
    return a
  }

  const render_holdings = () => {
    const sortedHoldings = sortHoldings()
    return (
      clicked ?
        sortedHoldings.map((holding) => (
          <TableRow key={holding.id}>
            <TableCell>{holding.ticker}</TableCell>
            <TableCell>{holding.name}</TableCell>
            <TableCell>{holding.percentage}%</TableCell>
          </TableRow>))
      :
        sortedHoldings.slice(0, 10).map((holding) => (
          <TableRow key={holding.id}>
            <TableCell>{holding.ticker}</TableCell>
            <TableCell>{holding.name}</TableCell>
            <TableCell>{holding.percentage}%</TableCell>
          </TableRow>))
    )
  }

  return (
    <>
      <Title>
        Holding Details
      </Title>
        { props.holdings ?
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {render_holdings()}
        </TableBody>
      </Table>
      :
      <div className={classes.seeMore}>
        <CircularProgress />
      </div>
    }
      <div className={classes.seeMore}>
        <Button color="primary" onClick={() => (setClicked(!clicked))}>
          {clicked ?
          'See less holdings'
          :
          'See more holdings'
          }
        </Button>
      </div>
    </>
  );
}