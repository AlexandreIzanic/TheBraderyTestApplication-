import { Link } from "react-router-dom";
export default function ErrorPage() {
  return (
    <div className="flex px-10 min-w-[600px] m-auto  justify-center items-center text-center flex-col">
      <h2>ERROR 404</h2>

      <Link className="btn mt-10 normal-case text-xl" to="/">
        Return To Home
      </Link>
    </div>
  );
}
