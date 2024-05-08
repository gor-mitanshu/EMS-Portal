import React, { useState } from "react";
import "./Register.css";
import Step1Register from "./stepOne/StepOne";
import Step2Register from "./stepTwo/StepTwo";
import FormWrapper from "../../UI/formWrapper/FormWrapper";
import "../../UI/formWrapper/FormWrapper.css";
import {
  registerStepOneValidations,
  registerStepTwoValidations,
} from "../../utils/formValidations";

const setFormDataStepOneinitialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};
const setFormDataStepTwoinitialState = {
  companyName: "",
  employeeStrength: "",
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [formDataStep1, setFormDataStep1] = useState(
    setFormDataStepOneinitialState
  );
  const [formDataStep2, setFormDataStep2] = useState(
    setFormDataStepTwoinitialState
  );
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState()

  const handleNextStep = (id) => {
    setStep(step + 1);
    setUserId(id)
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handleChangeStep1 = (e, fieldName) => {
    const { name, value } = e.target;
    setFormDataStep1({ ...formDataStep1, [name]: value });

    // Validate the field that changed
    const newErrors = registerStepOneValidations({
      [name]: value,
    });

    setErrors(newErrors);
  };

  const handleChangeStep2 = (e, fieldName) => {
    const { name, value } = e.target;
    setFormDataStep2({ ...formDataStep2, [name]: value });

    // Validate the field that changed
    const newErrors = registerStepTwoValidations({
      [name]: value,
    });
    setErrors(newErrors);
  };

  const isStep1Valid =
    formDataStep1.firstName !== "" &&
    formDataStep1.lastName !== "" &&
    formDataStep1.email !== "" &&
    formDataStep1.phone !== "" &&
    formDataStep1.password !== "";

  return (
    <FormWrapper title={ "Create an Account" }>
      <div>
        { step === 1 && (
          <Step1Register
            formDataStep1={ formDataStep1 }
            handleChangeStep1={ handleChangeStep1 }
            isStep1Valid={ isStep1Valid }
            handleNextStep={ handleNextStep }
            errors={ errors }
            setErrors={ setErrors }
          />
        ) }
        { step === 2 && (
          <Step2Register
            user_id={ userId }
            formDataStep2={ formDataStep2 }
            handleChangeStep2={ handleChangeStep2 }
            handleBackStep={ handleBackStep }
            errors={ errors }
            setErrors={ setErrors }
          />
        ) }
      </div>
    </FormWrapper>
  );
};

export default Register;
