import FamilySection from "./FamilySection";

const Family = () => {
  return (
    <>
      <FamilySection title="Family Members" emergency={false} />
      <FamilySection title="Emergency Contact" emergency={true} />
    </>
  );
};

export default Family;
