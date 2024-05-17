import React, { useCallback, useEffect, useRef, useState } from "react";
import BasicInfoForm from "./BasicInfo/BasicInfoForm";
import WorkInfoForm from "./WorkInfo/WorkInfoForm";
import ResignationInfoForm from "./ResignationInfo/ResignationInfoForm";
import axios from "axios";
import Card from "../../../UI/card/Card";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const initialState = {
  employee_code: "",
  date_of_joining: "",
  probation_period: "",
  employment_type: "",
  work_location: "",
  employee_status: "",
  work_experience: "",

  designation: "",
  job_title: "",
  department: "",
  sub_department: "",

  resignation_date: "",
  resignation_status: "",
  notice_period: "",
  last_working_day: "",
}

const Work = ({ accessToken, userId }) => {
  const [editMode, setEditMode] = useState({
    basicInfo: false,
    workInfo: false,
    resignationInfo: false,
  });
  const initialUser = useRef(initialState);
  const [formData, setFormData] = useState(initialState);
  const [employee, setEmployee] = useState({})
  const [formErrors, setFormErrors] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleEditClick = (section) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [section]: true,
    }));
  };

  const handleCancelClick = (section) => {
    if (hasChanges(formData)) {
      Swal.fire({
        title: "Are you sure?",
        text: "Changes will not be saved.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Don't Save!",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData(employee)
          setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [section]: false,
          }));

          setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            ...(section === "basicInfo" && {
              employee_code: "",
              date_of_joining: "",
              probation_period: "",
              employment_type: "",
              work_location: "",
              employee_status: "",
              work_experience: "",
            }),
            ...(section === "workInfo" && {
              designation: "",
              job_title: "",
              department: "",
              sub_department: "",
            }),
            ...(section === "resignationInfo" && {
              resignation_date: "",
              resignation_status: "",
              notice_period: "",
              last_working_day: "",
            }),
          }));
        }
      });
    } else {
      setFormData(employee)
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [section]: false,
      }));

      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        ...(section === "basicInfo" && {
          employee_code: "",
          date_of_joining: "",
          probation_period: "",
          employment_type: "",
          work_location: "",
          employee_status: "",
          work_experience: "",
        }),
        ...(section === "workInfo" && {
          designation: "",
          job_title: "",
          department: "",
          sub_department: "",
        }),
        ...(section === "resignationInfo" && {
          resignation_date: "",
          resignation_status: "",
          notice_period: "",
          last_working_day: "",
        }),
      }));
    }
  };

  const getWorkData = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/employee/getWorkDetails/${userId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (res && res.status === 200) {
      const { workDetails } = res.data;
      setFormData(workDetails ? workDetails : initialState);
      setEmployee(workDetails ? workDetails : initialState);
      initialUser.current = workDetails ? workDetails : initialState;
    }
  }, [accessToken, userId]);

  useEffect(() => {
    getWorkData();
  }, [getWorkData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (editMode.basicInfo) {
      if (!formData.employee_code) {
        errors.employee_code = "Employee Id is required";
      }
      if (!formData.employment_type) {
        errors.employment_type = "Employment Type is required";
      }
      if (!formData.date_of_joining) {
        errors.date_of_joining = "Date of Joining is required";
      }
      if (!formData.work_location) {
        errors.work_location = "Work Location is required";
      }
      if (!formData.work_experience) {
        errors.work_experience = "Work Experience is required";
      }
      if (!formData.probation_period) {
        errors.probation_period = "Probation Period is required";
      }
    }
    if (editMode.workInfo) {
      if (!formData.designation) {
        errors.designation = "Designation is required";
      }
      if (!formData.job_title) {
        errors.job_title = "Job Title is required";
      }
      if (!formData.department) {
        errors.department = "Department is required";
      }
      if (!formData.sub_department) {
        errors.sub_department = "Sub-Department is required";
      }
    }
    if (editMode.resignationInfo) {
      if (!formData.resignation_date) {
        errors.resignation_date = "Resignation Info is required";
      }
      if (!formData.resignation_status) {
        errors.resignation_status = "Resignation Status is required";
      }
      if (!formData.notice_period) {
        errors.notice_period = "Notice Period is required";
      }
      if (!formData.last_working_day) {
        errors.last_working_day = "Last Working Day is required";
      }
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        if (!!employee) {
          const res = await axios.put(`${process.env.REACT_APP_API}/employee/updateWorkDetails/${employee._id}`,
            formData,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          if (res) {
            toast.success(res.data.message);
            getWorkData();
            setEditMode({
              basicInfo: false,
              workInfo: false,
              resignationInfo: false,
            });
          }
        } else {
          const res = await axios.post(`${process.env.REACT_APP_API}/employee/addWorkDetails/${userId}`, formData, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          if (res) {
            toast.success(res.data.message)
            getWorkData();
            setEditMode({
              basicInfo: false,
              workInfo: false,
              resignationInfo: false,
            });
          }
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const hasChanges = (changedData) => {
    console.log(changedData);
    return (
      changedData.employee_code !== initialUser.current.employee_code ||
      changedData.date_of_joining !== initialUser.current.date_of_joining ||
      changedData.probation_period !== initialUser.current.probation_period ||
      changedData.employment_type !== initialUser.current.employment_type ||
      changedData.work_location !== initialUser.current.work_location ||
      changedData.employee_status !== initialUser.current.employee_status ||
      changedData.work_experience !== initialUser.current.work_experience ||
      changedData.designation !== initialUser.current.designation ||
      changedData.job_title !== initialUser.current.job_title ||
      changedData.department !== initialUser.current.department ||
      changedData.sub_department !== initialUser.current.sub_department ||
      changedData.resignation_date !== initialUser.current.resignation_date ||
      changedData.resignation_status !== initialUser.current.resignation_status ||
      changedData.notice_period !== initialUser.current.notice_period ||
      changedData.last_working_day !== initialUser.current.last_working_day
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-7">
            <Card
              title="Basic Info"
              editMode={editMode.basicInfo}
              handleEditClick={() => handleEditClick("basicInfo")}
              handleCancelClick={() => handleCancelClick("basicInfo")}
            >
              {editMode.basicInfo ? (
                <>
                  <BasicInfoForm
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    handleCancel={() => handleCancelClick("basicInfo")}
                  />
                </>
              ) : (
                <>
                  <div className="user-details">
                    {employee ?
                      <>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <strong>Employee ID:</strong>
                              {employee.employee_code || ""}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <p>
                              <strong>Date of Joining:</strong>
                              {employee.date_of_joining || ""}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <p>
                              <strong>Probation Period:</strong>
                              {employee.probation_period || ""}
                            </p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <strong>Employee Type:</strong>
                              {employee.employment_type || ""}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <p>
                              <strong>Work Location:</strong>
                              {employee.work_location || ""}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <p>
                              <strong>Employee Status:</strong>
                              {employee.employee_status || ""}
                            </p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <p>
                              <strong>Work Experience:</strong>
                              {employee.work_experience || ""}
                            </p>
                          </div>
                        </div>
                      </> : <h3>No Data Found</h3>
                    }
                  </div>
                </>
              )}
            </Card>
          </div>

          <div className="col-md-5">
            <Card
              title="Work Info"
              editMode={editMode.workInfo}
              handleEditClick={() => handleEditClick("workInfo")}
              handleCancelClick={() => handleCancelClick("workInfo")}
            >
              {editMode.workInfo ? (
                <WorkInfoForm
                  formData={formData}
                  formErrors={formErrors}
                  handleInputChange={handleInputChange}
                  handleCancel={() => handleCancelClick("workInfo")}
                />
              ) : (
                <div className="user-details">
                  {employee ?
                    <>
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <strong>Designation:</strong>
                            {employee.designation || ""}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Job Title:</strong> {employee.job_title || ""}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <strong>Department:</strong>
                            {employee.department || ""}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Sub Department:</strong>
                            {employee.sub_department || ""}
                          </p>
                        </div>
                      </div>
                    </> :
                    <h3>No Data Found</h3>
                  }

                </div>
              )}
            </Card>
          </div>
        </div >

        < div className="row" >
          <div className="col-md-12">
            <Card title="Work History">
              <>
                <div className="user-details">
                  <div className="row">
                    <div className="col-md-3">
                      <p>
                        <strong>Department</strong>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p>
                        <strong>Designation</strong>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p>
                        <strong>From</strong>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p>
                        <strong>To</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            </Card>
          </div>
        </div >

        <div className="row" >
          <div className="col-md-12">
            <Card
              title="Resignation Info"
              editMode={editMode.resignationInfo}
              handleEditClick={() => handleEditClick("resignationInfo")}
              handleCancelClick={() => handleCancelClick("resignationInfo")}
            >
              {editMode.resignationInfo ? (
                <>
                  <ResignationInfoForm
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    handleCancel={() => handleCancelClick("resignationInfo")}
                  />
                </>
              ) : (
                <div className="user-details">
                  {employee ?
                    <>
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <strong>Resignation Date:</strong> {formData.resignation_date || ""}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Resignation Status:</strong> {formData.resignation_status || ""}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <strong>Notice Period:</strong> {formData.notice_period || ""}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Last Working Day:</strong> {formData.last_working_day || ""}
                          </p>
                        </div>
                      </div>
                    </> : <h3>
                      No data found</h3>
                  }
                </div>
              )}
            </Card>
          </div>
        </div >
      </form >
    </>
  );
};

export default Work;
