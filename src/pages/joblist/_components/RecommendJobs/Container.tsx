import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  EarlyReturn?: boolean;
}

const Container = ({ children, EarlyReturn = true }: ContainerProps) => {
  return EarlyReturn ? (
    <div className="h-541 bg-green-20">
      <div className="mx-auto pl-12 mobile:max-w-350 tablet:max-w-678 tablet:pl-0 desktop:max-w-964">
        <h1 className="pt-60 text-20 font-bold tablet:text-28">맞춤 공고</h1>
        <div className="flex justify-center pt-125">
          <p className="text-18 font-bold tablet:text-26">{children} </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-541 bg-green-20">
      <div className="mx-auto pl-12 mobile:max-w-350 tablet:max-w-678 tablet:pl-0 desktop:max-w-964">
        <h1 className="pt-60 text-20 font-bold tablet:text-28">맞춤 공고</h1>
        {children}
      </div>
    </div>
  );
};

export default Container;
