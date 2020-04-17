import React, { useState, useEffect } from "react";
import axios from "axios";

function ReportView() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileURL, setfileURL] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      let res, fileURL;

      try {
        res = await axios("http://localhost:8080/report/pdf/", {
          method: "GET",
          responseType: "blob", //Force to receive data in a Blob Format
        });
      } catch (err) {
        setError(err.message);
      } finally {
        //Create a Blob from the PDF Stream
        const file = new Blob([res.data], { type: "application/pdf" });

        //Build a URL from the file
        setfileURL(URL.createObjectURL(file));
      }
    };
    fetchReport();
  }, []);

  return (
    <>
      <h1>iframe test</h1>
      <iframe title="pdf" src={fileURL} width="100%" height="100%"></iframe>
    </>
  );
}

export default ReportView;
