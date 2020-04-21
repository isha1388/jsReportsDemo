import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CodeIcon from '@material-ui/icons/Code';
import GetAppIcon from '@material-ui/icons/GetApp';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles((theme) => ({
  h100: {
    height: '100%'
  }
}));

function ReportView(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileURL, setfileURL] = useState("");
  const [formatType, setFormatType] = useState("reportPDF")
  const classes = useStyles();
  
  useEffect(() => {
    const fetchReport = async () => {
      let res, apiURL;
      //http://10.3.0.104:8080/reportHTML/LS?limit=10 
      //http://10.3.0.104:8080/reportPDF/LS?pdfType=chrome-pdf&limit=10
      try {
        //apiURL = 'http://10.3.0.104:8080/reportPDF/LS?pdfType=chrome-pdf&limit=10';
        const logType = props.selectedReport.type === 'Log Summary' ? 'LS' : 'LD';
        const chromeType = (formatType === 'reportHTML') ? '' : 'pdfType=chrome-pdf&'
        apiURL = `http://10.3.0.104:8080/${formatType}/${logType}?${chromeType}limit=20`;
        res = await axios(apiURL, {
          responseType: "blob", //Force to receive data in a Blob Format
        });
      } catch (err) {
        setError(err.message);
      } finally {
        const mimeType = (apiURL.indexOf('PDF') >= 0) ? 'application/pdf' : 'text/html';
        //Create a Blob from the PDF Stream

        if(res && res.data){
          const file = new Blob([res.data], { type: mimeType });

          //Build a URL from the file
          setfileURL(URL.createObjectURL(file));
        }

        setLoading(false);
      }
    };
    fetchReport();
  }, [formatType, props.selectedReport]);

  const downloadPdf = () => {
    const logType = props.selectedReport.type === 'Log Summary' ? 'LS' : 'LD';
    const apiURL = `http://10.3.0.104:8080/reportPDF/${logType}?pdfType=chrome-pdf&limit=10`
    window.open(apiURL, "_blank");
  }

  const changeFormat = (type) => {
    setFormatType(type);
  }
  return (
    <div className={classes.h100}>
      {loading && <h1>LOADING!!</h1>}
      {error && <h1>{error}</h1>}
      {!loading && !error && <div className={classes.h100}>
        <div>
          <h1>{props.selectedReport.reportname}</h1>
        </div><div>
          <ButtonGroup
            orientation="horizontal"
            color="primary"
            aria-label="outlined primary button group"
          >
            <IconButton color="primary" aria-label="upload picture" onClick={downloadPdf}>
              <GetAppIcon />
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" onClick={() => changeFormat('reportHTML')}>
              <CodeIcon />
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" onClick={() => changeFormat('reportPDF')}>
              <PictureAsPdfIcon />
            </IconButton>
          </ButtonGroup>

        </div>
        <iframe title="pdf" src={fileURL} width="100%" height="80%"></iframe>
      </div>
      }
    </div>
  );
}

export default ReportView;
