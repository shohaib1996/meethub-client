import { NavLink } from "react-router-dom";

const NavbarLinks = () => {
  const routes: string[] = [
    "/",
    "/meeting-rooms",
    "/about",
    "/contact",
    "/dashboard",
  ];

  const navbarItem: string[] = [
    "Home",
    "Meeting Rooms",
    "About Us",
    "Contact Us",
    "Dashboard",
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
                ? "text-base text-white bg-black"
                : "text-base"
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