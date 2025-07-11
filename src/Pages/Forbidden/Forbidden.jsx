import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100 px-4 text-center">
      <div className="max-w-md">
        <div className="text-red-600 text-6xl mb-4 flex justify-center">
          <FaLock />
        </div>
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          403 - Forbidden
        </h1>
        <p className="mb-6 text-gray-600">
          Sorry, you don't have permission to access this page.
        </p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
