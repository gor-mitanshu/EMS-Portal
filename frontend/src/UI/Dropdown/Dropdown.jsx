import { useNavigate } from "react-router-dom";
import useAuth from "../../authGuard/useAuth";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const Dropdown = ({ icon, menuItems }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: 'Confirm logout',
      text: "Are you sure you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        localStorage.removeItem("token");
        navigate("/login");
        toast.success("Logout Successfully");
      } else {
        return;
      }
    })
    // logout();
    // localStorage.removeItem("token");
    // navigate("/login");
    // toast.success("Logout Successfully");
  };
  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        { icon }
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="dropdownMenuButton"
      >
        { menuItems.map((item) => (
          <li key={ item.text } className="d-flex align-items-center">
            <button
              className="dropdown-item"
              href="/"
              onClick={ item.text === "Logout" ? handleLogout : null }
            >
              { item.text }
            </button>
          </li>
        )) }
      </ul>
    </div>
  );
};

export default Dropdown;
