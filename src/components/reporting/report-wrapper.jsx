import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReportList from './report-list';
import ReportView from './report-view';
import axios from 'axios';
import '../../App.css';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    leftPanel: {
        flexGrow: 1,
    },
    rightPanel: {
        flexGrow: 2,
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
                res = await axios('http://localhost:5488/odata/templates?$select=name');
            } catch(err) {
                setError(err.message);
            } finally {
                // console.log(res.data)
                setReports(res.data.value);
                // console.log(reports);
            }
        }

        fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <Grid container>
            <Grid className={classes.leftPanel}>
                <h1>Reports</h1>
                <ReportList reports={reports} />
            </Grid>
            <Grid className={classes.rightPanel}>
                <ReportView />
            </Grid>
        </Grid>
    )
}

export default Report;
