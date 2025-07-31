import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type NotFoundPropsType = {
  message?: string;
  backLinkText?: string;
  backTo?: string;
};

const NotFound = ({
  message = "The page you’re looking for doesn’t exist.",
  backLinkText = "Go back home",
  backTo = "/",
}: NotFoundPropsType) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-muted-foreground text-center">
        {message}
      </p>
      <Link to={backTo}>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          {backLinkText}
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
