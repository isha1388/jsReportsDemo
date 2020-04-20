import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ReportList(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index, report) => {
        setSelectedIndex(index);
        props.handleReportClicked(report)
    };
    function renderList() {
        const reports = props.reports;
        return reports.map((report, index) => (
            <ListItem
                button
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index, report)} key={report.id}>
                <ListItemText primary={report.reportname} />
            </ListItem>
        ));
    }
    return <List>{renderList()}</List>;
}

export default ReportList;
