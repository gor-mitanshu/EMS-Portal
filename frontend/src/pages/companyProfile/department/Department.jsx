import React, { useState, useEffect, useCallback } from "react";
import DepartmentForm from "./DepartmentForm";
import axios from "axios";
import Card from "../../../UI/card/Card";

const Department = ({ companyId, accessToken }) => {
  const [fields, setFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API}/company/getDepartments/${companyId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        setDepartments(response.data.departments);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [accessToken, companyId]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

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
    const data = fields.map((field) => ({
      company_id: companyId,
      department: fieldValues[field.id]?.department,
      sub_departments: fieldValues[field.id]?.subdepartments || []
    }));

    data.forEach(department => {
      axios.post(`${process.env.REACT_APP_API}/company/addDepartment/${companyId}`, department, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          setDepartments([...departments, response.data]);
          setFields([]);
          setFieldValues({});
        })
        .catch((error) => {
          console.error("Error submitting data: ", error);
        });
    });
  };

  const handleCancel = () => {
    setFields([]);
    setFieldValues({});
  };

  const deleteDepartment = (departmentId) => {
    axios.delete(`${process.env.REACT_APP_API}/company/deleteDepartmentById/${departmentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(() => {
        fetchDepartments();
      })
      .catch((error) => {
        console.error("Error deleting department: ", error);
      });
  };

  const deleteSubDepartment = (subDepartmentId) => {
    axios.delete(`${process.env.REACT_APP_API}/company/deleteSubDepartmentById/${subDepartmentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(() => {
        fetchDepartments();
      })
      .catch((error) => {
        console.error("Error deleting sub-department: ", error);
      });
  };

  const updateDepartmentName = (departmentId, newName) => {
    axios.put(`${process.env.REACT_APP_API}/company/updateDepartmentNameById/${departmentId}`, { department: newName }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(() => {
        fetchDepartments();
      })
      .catch((error) => {
        console.error("Error updating department name: ", error);
      });
  };

  const updateSubDepartmentName = (subDepartmentId, newName) => {
    axios.put(`${process.env.REACT_APP_API}/company/updateSubDepartmentNameById/${subDepartmentId}`, { sub_departments: newName }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(() => {
        fetchDepartments();
      })
      .catch((error) => {
        console.error("Error updating sub-department name: ", error);
      });
  };

  return (
    <>
      <Card title={ "Department" } addBtn={ true } addBtnTitle={ "Add Department" } handleAdd={ addField }>
        <DepartmentForm
          fields={ fields }
          fieldValues={ fieldValues }
          handleChange={ handleChange }
          removeField={ removeField }
          handleCancel={ handleCancel }
          handleSubmit={ handleSubmit }
        />
        { departments.map((data, index) => (
          <div key={ index }>
            <h3>Department: { data.department }</h3>
            <button onClick={ () => deleteDepartment(data._id) }>Delete Department</button>
            <button onClick={ () => updateDepartmentName(data._id, prompt("New department name:")) }>Update Department Name</button>
            <ul>
              { data.subdepartments.map((subdepartment, subIndex) => (
                <li key={ subIndex }>
                  Subdepartment { subIndex + 1 }: { subdepartment.sub_departments }
                  <button onClick={ () => deleteSubDepartment(subdepartment._id) }>Delete Subdepartment</button>
                  <button onClick={ () => updateSubDepartmentName(subdepartment._id, prompt("New sub-department name:")) }>Update Subdepartment Name</button>
                </li>
              )) }
            </ul>
          </div>
        )) }
      </Card>
    </>
  );
};

export default Department;
