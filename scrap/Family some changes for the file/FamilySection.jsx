import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileField from "../../../UI/ProfileFields/ProfileFields";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FamilyForm from "./FamilyForm";
import FamilyItem from "./FamilyItem";

const FamilySection = ({
  title,
  showForm,
  formData,
  formErrors,
  setFormErrors,
  familyList,
  handleAddClick,
  handleInputChange,
  handleCheckboxChange,
  handleSubmit,
  handleDeleteClick,
  handleSaveEdit,
  handleCancel,
}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <ProfileField title={title}>
          <>
            {!showForm ? (
              <button className="btn btn-primary mb-4" onClick={handleAddClick}>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="sm"
                  color="white"
                  style={{ paddingRight: "10px" }}
                />
                Add
              </button>
            ) : (
              <FamilyForm
                formData={formData}
                formErrors={formErrors}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}

            <div className="p-4 m-0">
              {(familyList && familyList.length) > 0 && (
                <>
                  {familyList.map((family, index) => (
                    <FamilyItem
                      key={index}
                      family={family}
                      formErrors={formErrors}
                      setFormErrors={setFormErrors}
                      valueIndex={index}
                      handleDeleteClick={() => handleDeleteClick(index)}
                      onSaveEdit={handleSaveEdit}
                      handleCancel={handleCancel}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        </ProfileField>
      </div>
    </div>
  );
};

export default FamilySection;
