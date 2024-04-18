import React, { useState, useEffect } from "react";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import DepartmentForm from "./DepartmentForm";
import DepartmentItem from "./DepartmentList";
import axios from "axios";

const Department = () => {
  const [fields, setFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/departments")
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
        ...prevValues[id],
        [fieldName]: value,
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
        console.log(response);
        // console.log("Data submitted:", data);
        console.log(data);
        console.log(departments);
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
      <ProfileField title={"Department"}>
        <DepartmentForm
          fields={fields}
          fieldValues={fieldValues}
          handleChange={handleChange}
          setFieldValues={setFieldValues}
          removeField={removeField}
          addField={addField}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
        {departments.map((data, index) => {
          // console.log(data);
          return (
            <DepartmentItem
              key={index}
              department={data.department}
              subdepartments={data.subdepartments}
            />
          );
        })}
      </ProfileField>
    </>
  );
};

export default Department;
