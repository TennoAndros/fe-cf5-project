import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner color="info" size="xl" />
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
