const CommonLoading = () => {
  return (
    <div className={"h-screen w-screen flex justify-center items-center"}>
      <div
        className={
          "w-40 h-40 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"
        }
      />
    </div>
  );
};

export default CommonLoading;
