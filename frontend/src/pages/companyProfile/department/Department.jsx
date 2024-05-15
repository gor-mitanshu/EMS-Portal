import React, { useState, useEffect } from "react";
import DepartmentForm from "./DepartmentForm";
import axios from "axios";
import Card from "../../../UI/card/Card";

const Department = ({ userId }) => {
  const [fields, setFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const addField = () => {
    setFields([...fields, { id: Date.now() }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
    setFieldValues((prevValues) => {
      const newValues = { ...prevValues };
      delete newValues[id];
      return newValues;
    });
  };

  const handleChange = (id, fieldName, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id], [fieldName]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const data = fields.map((field) => fieldValues[field.id]);
    setSubmittedData([...submittedData, ...data]);
    setFields([]);
    setFieldValues({});
    axios
      .post("http://localhost:3001/departments", data)
      .then((response) => {
        setDepartments([...departments, ...data]);
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  };

  const handleCancel = () => {
    setFields([]);
    setFieldValues({});
    setSubmittedData([]);
  };

  return (
    <>
      <Card title={ "Department" }>
        <DepartmentForm
          fields={ fields }
          fieldValues={ fieldValues }
          handleChange={ handleChange }
          setFieldValues={ setFieldValues }
          removeField={ removeField }
          addField={ addField }
          handleCancel={ handleCancel }
          handleSubmit={ handleSubmit }
        />
        { departments.map((data, index) => {
          return (
            <div>
              <h3>Department: { data.department }</h3>
              <ul>
                { data.subdepartments.map((subdepartment, index) => (
                  <li key={ index }>
                    Subdepartment { index + 1 }: { subdepartment }
                  </li>
                )) }
              </ul>
            </div>
          );
        }) }
      </Card>
    </>
  );
};

export default Department;
