const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-50 w-50 animate-spin rounded-full border-4 border-gray-300 border-t-green-20"></div>
    </div>
  );
};

export default LoadingSpinner;
