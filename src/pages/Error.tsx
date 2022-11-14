import { CONTAINER_STYLE } from "../utils/config";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`${CONTAINER_STYLE} text-center `}>
        <img
          src="/404.png"
          alt="error-img"
          className="w-[100px] h-[100px] block mx-auto"
        />
        <h1 className="text-5xl font-bold mb-5">Oops!</h1>
        <p className="mb-3">An unexpected error has occurred, Meow~</p>
        <p className="text-lg font-bold mb-5 text-gray-600 italic">
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error && error.message}
        </p>
        <Link to="/">
          <div className="w-fit mx-auto rounded-md py-2 px-3 bg-blue-500 text-white font-bold  flex items-center">
            Home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
