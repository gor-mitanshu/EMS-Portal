import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileSection = ({
  title,
  editMode,
  handleEditClick,
  handleCancelClick,
  children,
}) => {
  console.log(editMode);
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title">{title}</h5>
        {editMode ? (
          <button
            className="btn btn-link edit-button"
            onClick={handleCancelClick}
            type="button"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" color="#ec5d5d" />
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-link edit-button"
            onClick={handleEditClick}
          >
            <FontAwesomeIcon
              icon={faPencilAlt}
              size="lg"
              color=" rgb(25, 113, 114)"
            />
          </button>
        )}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default ProfileSection;
