
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { verifyToken } from "../../utils/verifyToken/verifyToken";
import { Logout } from "../../redux/features/user/authSlice";
import { TProtectedRoute } from "../../types/protectedRoute.type";

const PrivateRoute = ({ children, role }: TProtectedRoute) => {
  const location = useLocation();
  console.log(role);
  const token = useAppSelector((state) => state.auth.token);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  // @ts-expect-error: Unreachable code error
  if (role && !role.includes(user?.role)) {
    dispatch(Logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default PrivateRoute;
