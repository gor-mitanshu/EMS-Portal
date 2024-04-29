import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FamilyForm from "./FamilyForm";
import FamilyItem from "./FamilyItem";
import Card from "../../../UI/ProfileCards/ProfileCard";

const FamilySection = ({
  title,
  emergency,
  setShowForm,
  setFormData,
  handleInputChange,
  handleCheckboxChange,
  setFormErrors,
  formData,
  showForm,
  formErrors,
  handleSubmit,
  familyList,
  handleDeleteClick,
  handleSaveEdit,
}) => {
  // For showing and hiding the form
  const handleAddClick = () => {
    setShowForm(true);
    // setFormData({
    //   family_name: "Sanjay Gor",
    //   family_relationship: "Father",
    //   family_birth_date: "1971-12-23",
    //   dependant: "",
    // });
    setFormData({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
  };

  // for canceling the form
  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
    setFormErrors({
      family_name: "",
      family_relationship: "",
      family_birth_date: "",
      dependant: "",
    });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <Card title={title}>
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
              {familyList.length > 0 && (
                <>
                  {familyList[0].familyMemberDetails.map((family, index) => (
                    <FamilyItem
                      key={index}
                      family={family}
                      formErrors={formErrors}
                      setFormErrors={setFormErrors}
                      valueIndex={index}
                      id={family._id}
                      handleDeleteClick={() =>
                        handleDeleteClick(index, family._id)
                      }
                      onSaveEdit={handleSaveEdit}
                      handleCancel={handleCancel}
                      handleCheckboxChange={handleCheckboxChange}
                      emergency={emergency}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        </Card>
      </div>
    </div>
  );
};

export default FamilySection;
