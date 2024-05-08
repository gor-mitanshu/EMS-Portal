const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const passwordPattern = /^[\w@-]{5,10}$/;
const namePattern = /^[a-zA-Z ]{2,30}$/;
const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// Login
export const loginValidations = (inputValues) => {
     const errors = {};
     let isValid = true;

     // Email validations
     if (("email" in inputValues) && inputValues.email === "") {
          errors.email = "Email is required."
          isValid = false;
     }
     //  else if (!!inputValues.email && !inputValues.email.match(emailPattern)) {
     //      errors.email = "Please enter a valid Email."
     //      isValid = false;
     // }

     // Password validations
     if (('password' in inputValues) && inputValues.password === "") {
          errors.password = "Password is required."
          isValid = false;
     }
     // else if (!!inputValues.password && !inputValues.password.match(passwordPattern)) {
     //      errors.password = "Password should be 5 to 10 characters long and can contain letters, digits, and some special characters"
     //      isValid = false;
     // }

     return { errors, isValid };
}

// Register
export const registerStepOneValidations = (inputValues) => {
     const errors = {};
     console.log(inputValues)
     // Firstname Validations
     if (('firstName' in inputValues) && inputValues.firstName === "") {
          errors.firstName = "Firstname is required."
     } else if (!!inputValues.firstName && !inputValues.firstName.match(namePattern)) {
          errors.firstName = "Please provide a valid firstname"
     }

     // Lastname Validations
     if (('lastName' in inputValues) && inputValues.lastName === "") {
          errors.lastName = "Lastname is required."
     } else if (!!inputValues.lastName && !inputValues.lastName.match(namePattern)) {
          errors.lastName = "Please provide a valid Lastname"
     }

     // Email validations
     if (('email' in inputValues) && inputValues.email === "") {
          errors.email = "Email is required."
     } else if (!!inputValues.email && !inputValues.email.match(emailPattern)) {
          errors.email = "Please enter a valid Email."
     }

     // Phone number validations
     if (('phone' in inputValues) && inputValues.phone === "") {
          errors.phone = "Phone number is required."
     } else if (!!inputValues.phone && !inputValues.phone.match(phonePattern)) {
          errors.phone = "Please enter a valid Phone number."
     }

     // Password validations
     if (('password' in inputValues) && inputValues.password === "") {
          errors.password = "Password is required."
     } else if (!!inputValues.password && inputValues.password.length < 8) {
          errors.password = "Password is more than 8 charactars."
     } else if (!!inputValues.password && inputValues.password.length >= 16) {
          errors.password = "Password is not more than 16 charactars."
     } else if (!!inputValues.password && !inputValues.password.match(passwordPattern)) {
          errors.password = "Password should be 5 to 10 characters long and can contain letters, digits, and some special characters"
     }

     return errors;

}

export const registerStepTwoValidations = (inputValues) => {
     const errors = {};

     // Company Name Validations
     if (("companyName" in inputValues) && inputValues.companyName === "") {
          errors.companyName = "Please select a company name";
     }

     // Employee Strength Validations
     if (("employeeStrength" in inputValues) && inputValues.employeeStrength === "") {
          errors.employeeStrength = "Please select a company name";
     }

     return errors;
}

// Forgot Password
export const forgotPasswordValidations = (inputValues) => {
     const errors = {};

     // Email Validations
     if (inputValues.email === "") {
          errors.email = "Email is required."
     } else if (!inputValues.email.match(emailPattern)) {
          errors.email = "Please enter a valid Email."
     }

     // OTP Validations
     if (inputValues.otp === "") {
          errors.otp = "Please enter the OTP";
     }
     return errors;
}