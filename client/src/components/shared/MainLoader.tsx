type MainLoaderPropsType = {
  message?: string;
  size?: number;
};

const MainLoader = ({
  message = "Loading...",
  size = 50,
}: MainLoaderPropsType) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background">
      <div className="corner-pulse-loader mb-4" />
      <p className="text-muted-foreground text-sm">{message}</p>

      <style>
        {`
          .corner-pulse-loader {
            width: ${size}px;
            aspect-ratio: 1;
            --_g: no-repeat radial-gradient(farthest-side,#2664ec 94%, #0000); /* use your brand color */
            background:
              var(--_g) 0    0,
              var(--_g) 100% 0,
              var(--_g) 100% 100%,
              var(--_g) 0    100%;
            background-size: 40% 40%;
            animation: l38 0.5s infinite;
          }

          @keyframes l38 {
            100% {
              background-position: 100% 0, 100% 100%, 0 100%, 0 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MainLoader;
