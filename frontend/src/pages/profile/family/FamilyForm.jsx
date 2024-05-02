const FamilyForm = ({
  formData,
  formErrors,
  handleInputChange,
  handleSubmit,
  handleCancel,
  handleCheckboxChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {/* Family Name */}
        <div className="col-md-4">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="family_name" className="font-weight-bold">
                Name:
              </label>
              <input
                type="text"
                className="form-control no-focus-box-shadow"
                placeholder="Name"
                name="family_name"
                value={formData.family_name}
                onChange={handleInputChange}
              />
              {formErrors.family_name && (
                <div className="text-danger">{formErrors.family_name}</div>
              )}
            </div>
          </div>
        </div>
        {/* Family Relationship */}
        <div className="col-md-4">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="family_relationship" className="font-weight-bold">
                Relationship:
              </label>
              <select
                className="form-select no-focus-box-shadow"
                name="family_relationship"
                value={formData.family_relationship}
                onChange={handleInputChange}
              >
                <option value="">Select Relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Husband">Husband</option>
                <option value="Wife">Wife</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
              </select>
              {formErrors.family_relationship && (
                <div className="text-danger">
                  {formErrors.family_relationship}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Date of Birth */}
        <div className="col-md-2">
          <div className="form-group row">
            <div className="col mb-3">
              <label htmlFor="family_birth_date" className="font-weight-bold">
                Date of Birth:
              </label>
              <input
                type="date"
                className="form-control no-focus-box-shadow"
                placeholder="Date of Birth"
                name="family_birth_date"
                value={formData.family_birth_date}
                onChange={handleInputChange}
              />
              {formErrors.family_birth_date && (
                <div className="text-danger">
                  {formErrors.family_birth_date}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Dependant */}
        <div className="col-md-2">
          <div className="form-group row">
            <div className="col mb-3">
              <label
                htmlFor="dependant"
                className="font-weight-bold d-flex pb-1"
              >
                Dependant:
              </label>
              <input
                type="checkbox"
                name="dependant"
                checked={formData.dependant}
                onChange={handleCheckboxChange}
                style={{ transform: "scale(2)" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div>
        <button
          type="button"
          className="btn btn-danger me-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};
export default FamilyForm;
