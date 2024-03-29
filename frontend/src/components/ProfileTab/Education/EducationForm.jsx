const EducationForm = ({
  formData,
  formErrors,
  handleInputChange,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {/* Qualification Type */}
        <div className="col-md-12">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="qualification_type" className="font-weight-bold">
                Qualification Type:
              </label>
              <select
                className="form-select no-focus-box-shadow"
                name="qualification_type"
                value={formData.qualification_type}
                onChange={handleInputChange}
              >
                <option value="">Select Qualification Type</option>
                <option value="Graduation">Graduation</option>
                <option value="Post Graduation">Post Graduation</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Diploma">Diploma</option>
                <option value="Pre University">Pre University</option>
                <option value="Other Education">Other Education</option>
                <option value="Certificate">Certificate</option>
              </select>
              {formErrors.qualification_type && (
                <div className="text-danger">
                  {formErrors.qualification_type}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Course Name */}
        <div className="col-md-4">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="course_name" className="font-weight-bold">
                Course Name:
              </label>
              <input
                type="text"
                className="form-control no-focus-box-shadow"
                placeholder="Enter your Course Name"
                name="course_name"
                value={formData.course_name}
                onChange={handleInputChange}
              />
              {formErrors.course_name && (
                <div className="text-danger">{formErrors.course_name}</div>
              )}
            </div>
          </div>
        </div>
        {/* Course Type */}
        <div className="col-md-4">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="course_type" className="font-weight-bold">
                Course Type:
              </label>
              <select
                className="form-select no-focus-box-shadow"
                name="course_type"
                value={formData.course_type}
                onChange={handleInputChange}
              >
                <option value="">Select Employment Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="On Contract">Correspondance</option>
                <option value="Intern">Certificate</option>
              </select>
              {formErrors.course_type && (
                <div className="text-danger">{formErrors.course_type}</div>
              )}
            </div>
          </div>
        </div>
        {/* Stream */}
        <div className="col-md-4">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="stream" className="font-weight-bold">
                Stream:
              </label>
              <input
                type="text"
                className="form-control no-focus-box-shadow"
                placeholder="Enter Your Stream"
                name="stream"
                value={formData.stream}
                onChange={handleInputChange}
              />
              {formErrors.stream && (
                <div className="text-danger">{formErrors.stream}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Course Start Date */}
        <div className="col-md-4">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="course_startDate" className="font-weight-bold">
                Course Start Date:
              </label>
              <input
                type="date"
                className="form-control no-focus-box-shadow"
                placeholder="Enter Your Course Start Date"
                name="course_startDate"
                value={formData.course_startDate}
                onChange={handleInputChange}
              />
              {formErrors.course_startDate && (
                <div className="text-danger">{formErrors.course_startDate}</div>
              )}
            </div>
          </div>
        </div>
        {/* Course End Date */}
        <div className="col-md-4">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="course_endDate" className="font-weight-bold">
                Course End Date:
              </label>
              <input
                type="date"
                className="form-control no-focus-box-shadow"
                placeholder="Enter Your Course End Date"
                name="course_endDate"
                value={formData.course_endDate}
                onChange={handleInputChange}
              />
              {formErrors.course_endDate && (
                <div className="text-danger">{formErrors.course_endDate}</div>
              )}
            </div>
          </div>
        </div>
        {/* College Name*/}
        <div className="col-md-4">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="college_name" className="font-weight-bold">
                College Name:
              </label>
              <input
                type="text"
                className="form-control no-focus-box-shadow"
                placeholder="Enter Your College Name"
                name="college_name"
                value={formData.college_name}
                onChange={handleInputChange}
              />
              {formErrors.college_name && (
                <div className="text-danger">{formErrors.college_name}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* University Name */}
        <div className="col-md-4">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="university_name" className="font-weight-bold">
                University Name:
              </label>
              <input
                type="text"
                className="form-control no-focus-box-shadow"
                placeholder="Enter Your University Name"
                name="university_name"
                value={formData.university_name}
                onChange={handleInputChange}
              />
              {formErrors.university_name && (
                <div className="text-danger">{formErrors.university_name}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-danger me-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary ">
          Save
        </button>
      </div>
    </form>
  );
};
export default EducationForm;
