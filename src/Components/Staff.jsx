import React, { useEffect, useRef, useState } from "react";

//import PDF modules 
import jsPDF from "jspdf";
import "jspdf-autotable";

//import Needed Components
import TableBody from "./TableBody";

function Staff() {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    dob: "",
    select: "default",
    selectSec: "default",
  };

  const dataTable = useRef(null);

  const [values, setValues] = useState(initialValues);

  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target; //input name should be same as object key
    setValues({ ...values, [name]: value }); //It will set the individual value without removing the other values
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (initialValues !== values) {
      setList([...list,values]); //it will set new array of list
      setValues(initialValues); //It will reset all state
    }
    exportToPDF()//
  };

  const exportToPDF = () => { 
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        //Document title
        const title = "My Awesome Report";

        //Define table headers
        const initialValuesKeys = Object.keys(initialValues)
        const headers = [[...initialValuesKeys]];

        //Prepare table data
        let data = [];
        if(list.length) { 
            data = list.map( item => [
                item.name, 
                item.email,
                item.phone, 
                item.address,
                item.education, 
                item.dob,
                item.select, 
                item.selectSec,
            ]);
        }
        
        //PDF Content Now
        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    };

  return (
    <div className="staff">
      <div className="container ">
        <h1 className="text-center mt-5">Staff registration form</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputfield">
            <input
              className="form-control"
              name="name"
              placeholder="FullName"
              value={values.name}
              onChange={handleChange}
            />
            <br />
            <input
              className="form-control"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
            <br />
            <input
              className="form-control"
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={values.phone}
              onChange={handleChange}
            />
            <br />
            <input
              className="form-control"
              name="address"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
            />
            <br />
            <input
              className="form-control"
              name="education"
              placeholder="Education"
              value={values.education}
              onChange={handleChange}
            />
            <br />
            <input
              className="form-control"
              name="dob"
              type="date"
              placeholder="Date of Birth"
              value={values.dob}
              onChange={handleChange}
            />
            <br />
            <select
              className="form-control"
              name="select"
              value={values.select}
              onChange={handleChange}
            >
              <option value="default">-----Select the Gender-----</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"other"}>Others</option>
            </select>
            <br />
            <select
              className="form-control"
              name="selectSec"
              value={values.selectSec}
              onChange={handleChange}
            >
              <option value="default">
                -----Select the desire position-----
              </option>
              <option name="teacher" value={"teacher"}>
                Teacher
              </option>
              <option value={"management"}>Managemet</option>
            </select>
          </div>
          <button className="btn btn-primary mt-2">Submit</button>
        </form>
        <div>
          {/* <form> */}
          <table border="1" className="table table-striped mt-5 text-center" ref={dataTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Education</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Position</th>
              </tr>
            </thead>
            <TableBody data={list}/>
          </table>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default Staff;
