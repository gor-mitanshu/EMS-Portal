import ProfileSection from "../ProfileCards/ProfileCard";

const ProfileField = ({
  title,
  editMode,
  handleEditClick,
  handleCancelClick,
  children,
}) => (
  <ProfileSection
    title={title}
    editMode={editMode}
    handleEditClick={handleEditClick}
    handleCancelClick={handleCancelClick}
  >
    {children}
  </ProfileSection>
);

export default ProfileField;
