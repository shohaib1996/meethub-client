import { NavLink } from "react-router-dom";

const NavbarLinks = () => {
  const routes: string[] = ["/", "/meeting-rooms", "/about", "/contact"];

  const navbarItem: string[] = [
    "Home",
    "Meeting Rooms",
    "About Us",
    "Contact Us",
  ];
  return (
    <>
      {navbarItem.map((item, index) => (
        <li key={index}>
          <NavLink
            to={routes[index]}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-base transition-all duration-300 ease-in-out text-white bg-gray-500 p-2 rounded-md scale-105"
                : "text-base transition-all duration-300 ease-in-out"
            }
          >
            {item}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default NavbarLinks;
