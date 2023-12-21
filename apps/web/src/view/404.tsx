import { Link } from "react-router-dom";

const NotFount = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl">Your requested resource not found</h1>
      <p>
        Go Back To{" "}
        <Link className="border-b-[1px] border-b-white py-1" to={"/"}>
          Home
        </Link>
      </p>
    </div>
  );
};

export default NotFount;
