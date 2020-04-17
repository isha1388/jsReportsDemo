import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  h100: {
    height: '100%'
  }
}));

function ReportView() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileURL, setfileURL] = useState("");

  const classes = useStyles();

  useEffect(() => {
    const fetchReport = async () => {
      let res, apiURL;
      //http://10.3.0.104:8080/reportHTML/LS?limit=10 
      //http://10.3.0.104:8080/reportPDF/LS?pdfType=chrome-pdf&limit=10
      try {
        apiURL = 'http://10.3.0.104:8080/reportPDF/LS?pdfType=chrome-pdf&limit=10';
        res = await axios(apiURL, {
          responseType: "blob", //Force to receive data in a Blob Format
        });
      } catch (err) {
        setError(err.message);
      } finally {
        const mimeType = (apiURL.indexOf('PDF') >= 0) ? 'application/pdf' : 'text/html';
        //Create a Blob from the PDF Stream
        const file = new Blob([res.data], { type: mimeType });

        //Build a URL from the file
        setfileURL(URL.createObjectURL(file));

        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className={classes.h100}>
      {loading && <h1>LOADING!!</h1>}
      {error && <h1>{error}</h1>}
      {!loading && !error && <div className={classes.h100}>
        <h1>iframe test</h1>
        <iframe title="pdf" src={fileURL} width="100%" height="80%"></iframe>
      </div>}
    </div>
  );
}

export default ReportView;
