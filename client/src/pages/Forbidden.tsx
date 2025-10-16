import { useLocation } from "react-router-dom";

const Forbidden = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message =
    params.get("message") || "You are not allowed to access this resource";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="text-5xl font-bold text-red-600">403 - Forbidden</h1>
      <p className="mt-4 text-muted-foreground">{message}</p>
    </div>
  );
};
export default Forbidden;
