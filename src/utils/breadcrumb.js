import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconFolder from 'react-icons/lib/md/folder-open';


const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    background: '#F5F5F5',
    marginBottom: '-24px'
  },
  paper: {
    padding: theme.spacing(1, 2),
    background: '#F5F5F5',
  },
}));

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a breadcrumb.');
}

export default function SimpleBreadcrumbs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick}>
            <IconFolder size="15"/>
          </Link>
          <Link color="inherit" href="/" onClick={handleClick}>
            Product
          </Link>
          <Typography color="textPrimary">Add Product</Typography>
        </Breadcrumbs>
      </Paper>
      <br />
    </div>
  );
}