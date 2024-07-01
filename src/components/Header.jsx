import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpeg";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { logoutUser } from "../api/api";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to Sign Out:", err);
    }
  };

  return (
    <Navbar className="border-b-2 flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <div className="flex items-center justify-start sm:justify-center md:w-96 sm:w-auto order-1 sm:order-1 sm:py-0">
          <img
            className="object-fit:contain h-12 mr-0 bg-white rounded-l-full"
            src={Logo}
            alt="Logo Image"
          />
          <span className="h-12 px-4 py-2 bg-gradient-to-r from-orange-400 via-purple-600 to-sky-500 rounded-r-full text-white font-bold">
            <h1>Book Talk</h1>
          </span>
        </div>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search.."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-9 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-4 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user image" img={currentUser.avatar_url} rounded/>}
          >
            <Dropdown.Header>
              <span className="block font-medium text-sm">
                {currentUser.username}
              </span>
            </Dropdown.Header>
            <Link to={"/users/profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline pill>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className="text-lg">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about" className="text-lg">
            About
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
