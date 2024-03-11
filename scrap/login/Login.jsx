import React from "react";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-3">Sign In</h1>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                Sign In
              </button>
              <div className="text-center">
                <a href="/" className="text-decoration-none me-3">
                  Forgot Password?
                </a>
                <a href="/" className="text-decoration-none">
                  Don't have an account? Sign Up
                </a>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://via.placeholder.com/600x400"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://via.placeholder.com/500x400"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://via.placeholder.com/700x400"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
