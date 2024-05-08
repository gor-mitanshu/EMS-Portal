// Login
export const loginValidations = {
     email: {
          required: "Please enter your email",
          pattern: {
               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
               message: "Please enter a valid email address",
          },
     },
     password: {
          required: "Please enter your password",
          minLength: {
               value: 6,
               message: "Password must be at least 6 characters long",
          },
     },
};

// SignUp
export const stepOneValidations = {
     firstName: {
          required: "First name is required",
          pattern: {
               value: /^[a-zA-Z ]{2,30}$/,
               message: "Please enter a valid First Name (2-30 characters, letters only)",
          },
     },
     lastName: {
          required: "Last name is required",
          pattern: {
               value: /^[a-zA-Z ]{2,30}$/,
               message: "Please enter a valid Last Name (2-30 characters, letters only)",
          },
     },
     email: {
          required: "Email is required",
          pattern: {
               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
               message: "Please enter a valid Email",
          },
     },
     phone: {
          required: "Phone number is required",
          pattern: {
               value: /^\d{10}$/,
               message: "Phone Number should be exactly 10 digits long",
          },
     },
     password: {
          required: "Password is required",
          pattern: {
               value: /^[\w@-]{5,10}$/,
               message: "Password should be 5 to 10 characters long and can contain letters, digits, and some special characters",
          },
     },
};

export const stepTwoValidations = {
     companyName: {
          required: "Company Name is required",
     },
     employeeStrength: {
          required: "Employee Strength is required",
     },
};

// Forgot Password 
export const forgotPasswordValidations = {
     email: {
          required: "Please enter your email",
          pattern: {
               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
               message: "Please enter a valid email address",
          },
     },
     otp: {
          required: "Please enter the OTP",
     },
};

// Reset Password
export const resetPasswordValidations = {
     password: {
          required: "Please enter a Password",
     },
     confirmPassword: {
          required: "Please enter a Confirm Password",
     },
};

// Profile Section
// Certificate
export const certificateValidations = {
     certificate_name: "Please select any Course Type",
     certificate_title: "Please enter any Certificate Title",
     certificate_file: "Please select any file",
};

// Identification
