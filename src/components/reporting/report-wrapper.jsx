/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReportList from "./report-list";
import ReportView from "./report-view";
import axios from "axios";
import "../../App.css";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  leftPane: {
    height: "540px",
  },
  rightPane: {
    height: "518px",
  },
  iframePane: {
    height: "100%",
  },
}));

function Report() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const fetchReports = async () => {
      let res;
      try {
        res = await axios("http://localhost:5488/odata/templates?$select=name");
      } catch (err) {
        setError(err.message);
      } finally {
        // console.log(res.data)
        setReports(res.data.value);
        // console.log(reports);
      }
    };

    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid container item xs={3} className={classes.leftPane}>
        <Paper className={classes.paper}>
          <h1>Reports</h1>
          <ReportList reports={reports} />
        </Paper>
      </Grid>
      <Grid item xs={9} className={classes.rightPane}>
        <Paper className={classes.paper} className={classes.iframePane}>
          <ReportView />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Report;
