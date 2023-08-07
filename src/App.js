import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeBasicInfo from "./components/EmployeeBasicInfo";
import FederalWithholdingTax from "./utils/FWT";
function App() {
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [fwt, setFwt] = useState(0);
  useEffect(
    function () {
      if (employeeInfo && employeeInfo.name.length > 0) {
        const fwt_amount = new FederalWithholdingTax({
          multipleJobs: employeeInfo.multipleJobs,
          status: employeeInfo.status,
          taxableWage: +employeeInfo.wage,
          payPeriods: +employeeInfo.payPeriods,
          w4: employeeInfo.w4,
          allowances: +employeeInfo.allowances,
        });
        const fwtResult = fwt_amount.result();
        setFwt(fwtResult);
      }
    },
    [employeeInfo]
  );
  return (
    <div className="App">
      <h1>FWT and SWT Calculator</h1>
      <EmployeeBasicInfo
        employeeInfo={employeeInfo}
        setEmployeeInfo={setEmployeeInfo}
      />{" "}
      {employeeInfo && employeeInfo.name.length > 0 ? (
        <div className="result">
          <p>{employeeInfo.name}</p>
          <p>
            <b>Wage:</b> {employeeInfo.wage}
          </p>
          <p>
            <b>Status: </b>
            {employeeInfo.status}
          </p>
          <p>
            <b>Allowances: </b>
            {employeeInfo.allowances}
          </p>
          <p>
            <b>FWT:</b> {fwt}
          </p>
        </div>
      ) : null}
      <p>{JSON.stringify(employeeInfo)}</p>
    </div>
  );
}

export default App;
