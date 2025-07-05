import { baseURL } from "@/config/baseUrl.config";
import { Button } from "../../../components/ui/button";

const GoogleOauthButton = (props: { label: string }) => {
  const { label } = props;

  const handleClick = () => {
    window.location.href = `${baseURL}/auth/google`;
  };

  return (
    <Button variant="outline" className="w-full mt-4" onClick={handleClick}>
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      {label} with Google
    </Button>
  );
};
export default GoogleOauthButton;
