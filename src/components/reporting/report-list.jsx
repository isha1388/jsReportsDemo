import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ReportList(props) {
  function renderList() {
    const reports = props.reports;
    return reports.map((report) => (
      <ListItem key={report._id}>
        <ListItemText primary={report.name} />
      </ListItem>
    ));
  }
  return <List>{renderList()}</List>;
}

export default ReportList;
