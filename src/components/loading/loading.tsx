type LoadingProps = {
  isLoading: boolean;
};

const Loading = ({ isLoading }: LoadingProps) => {
  if (!isLoading) return <></>;

  return (
    <p className="w-screen h-screen fixed top-0 left-0 bg-black opacity-80 flex justify-center items-center">
      loading...
    </p>
  );
};

export { Loading };
