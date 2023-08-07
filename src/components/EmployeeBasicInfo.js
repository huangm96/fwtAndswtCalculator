import React, { useState } from "react";
import "./EmployeeBasicInfo.css";
export default function EmployeeBasicInfo({ setEmployeeInfo }) {
  const initialState = {
    name: "",
    payPeriods: 24,
    wage: "",
    status: "single",
    multipleJobs: false,
    allowances: 0,
    w4: "earlier2020",
  };
  const [employeeForm, setEmployeeForm] = useState(initialState);
  const handleChange = (event) => {
    if (event.target.name === "multipleJobs") {
      setEmployeeForm({
        ...employeeForm,
        multipleJobs: !employeeForm.multipleJobs,
      });
    } else {
      setEmployeeForm({
        ...employeeForm,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await setEmployeeInfo(employeeForm);
    setEmployeeForm(initialState);
  };

  const loop10 = () => {
    const arr = [];
    for (let i = 0; i <= 10; i++) {
      arr.push(i);
    }
    return arr;
  };
  return (
    <div className="employeeBasicInfo-container">
      <h3>Employee Basic Info</h3>
      <form onSubmit={handleSubmit}>
        <div className=" form-item column">
          <label>Employee Name: </label>
          <input
            type="text"
            name="name"
            value={employeeForm.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-item column">
          <label>Pay Periods: </label>
          <select
            value={employeeForm.payPeriods}
            name="payPeriods"
            onChange={handleChange}
          >
            <option value={24}>Semimonthly</option>
            <option value={12}>Monthly</option>
            <option value={26}>Biweekly</option>
            <option value={52}>Weekly</option>
            <option value={260}>Daily</option>
            <option value={2}>Semiannually</option>
            <option value={4}>Quarterly</option>
          </select>
        </div>
        <div className="form-item column">
          <label>Employee Wage: </label>
          <input
            type="number"
            name="wage"
            value={employeeForm.wage}
            onChange={handleChange}
          />
        </div>
        <div className="form-item column">
          <label>Marriage Status: </label>{" "}
          <div>
            <input
              type="radio"
              id="status-single"
              name="status"
              value="single"
              onChange={handleChange}
              checked={employeeForm.status === "single"}
            />{" "}
            <label htmlFor="status-single">
              Single or Married filing separately
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="status-married"
              name="status"
              value="married"
              onChange={handleChange}
              checked={employeeForm.status === "married"}
            />{" "}
            <label htmlFor="status-married">Married filing jointly</label>
          </div>
          <div>
            <input
              type="radio"
              id="status-head"
              name="status"
              value="head"
              onChange={handleChange}
              checked={employeeForm.status === "head"}
            />
            <label htmlFor="status-head">Head of Household</label>
          </div>
        </div>
        <div className="form-item">
          <label>Multiply Jobs?: </label>
          <input
            type="checkbox"
            id="multiplyJobs"
            name="multipleJobs"
            value={employeeForm.multipleJobs}
            onChange={handleChange}
            checked={employeeForm.multipleJobs}
          />
          <label htmlFor="multiplyJobs">Yes</label>
        </div>
        <div className="form-item">
          <label>Allowances: </label>
          <select
            value={employeeForm.allowances}
            name="allowances"
            onChange={handleChange}
          >
            {loop10().map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-item">
          <label>W4 version: </label>
          <input
            type="radio"
            id="w2Version-earlier2020"
            name="w4"
            value="earlier2020"
            onChange={handleChange}
            checked={employeeForm.w4 === "earlier2020"}
          />
          <label htmlFor="w2Version-earlier2020">Earlier 2020</label>
          <input
            type="radio"
            id="w2Version-2020Later"
            name="w4"
            value="2020Later"
            onChange={handleChange}
            checked={employeeForm.w4 === "2020Later"}
          />
          <label htmlFor="w2Version-2020Later">2020 or Later</label>
        </div>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
