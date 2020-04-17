import React from 'react';

function ReportList(props) {
    function renderList() {
        const reports = props.reports
        return reports.map(report => <li key={report.id}><button>{report.reportname}</button></li>)
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
