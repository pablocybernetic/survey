import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function GuestLayout() {

  const {userToken} = useStateContext();

  if (userToken) {
    return <Navigate to='/'/>
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://artcaffemenu.ubuntu.click/images/Artcaffe-Logo.png"
            alt="artcaffe"
          />
          <Outlet/>
        </div>
      </div>
    </>
  );
}
