import React from 'react';

function ReportList(props) {
    function renderList() {
        const reports = props.reports
        return reports.map(report => <li key={report._id}><button>{report.name}</button></li>)
    }
    return (
        <>
            <ul>
               {renderList()}
            </ul>
        </>
    );
}

export default ReportList;
