// src/components/shared/Forbidden.tsx
const Forbidden = ({ message }: { message?: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
    <h1 className="text-5xl font-bold text-red-600">403 - Forbidden</h1>
    <p className="mt-4 text-muted-foreground">
      {message || "You are not allowed to access this resource."}
    </p>
  </div>
);
export default Forbidden;
