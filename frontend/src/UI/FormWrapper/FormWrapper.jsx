import React from "react";
import KarmDigitech from "../../assets/karmdigitech.png";

const FormWrapper = ({ children, title, subtitle }) => {
  return (
    <>
      <div className="container-fluid d-flex flex-wrap w-100 p-0 vh-100">
        <div className="form">
          <div className="wrapper-box">
            <div className="text-center">
              <img
                src={KarmDigitech}
                alt="Logo"
                width={200}
                height={30}
                className="mb-5 text-center"
              />
            </div>
            <div>
              <h5 className="text-center m-0 title">
                {title}
                <p className="mt-2 mb-4 subtitle">{subtitle}</p>
              </h5>
              {children}
            </div>
          </div>
        </div>

        <div className="bg-wrapper">
          <div className="bg-image"></div>
          <div className="background-color"></div>
        </div>
      </div>
    </>
  );
};

export default FormWrapper;
