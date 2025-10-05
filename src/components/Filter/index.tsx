import Ic_X from "@/assets/svgs/ic_X.svg";

interface FilterProps {
  onClose: () => void;
}

const Filter = ({ onClose }: FilterProps) => {
  return (
    <div className="flex h-845 w-375 flex-col gap-24 rounded-10 border border-gray-20 px-12 py-24 shadow-md tablet:w-390 tablet:px-20">
      <div className="flex justify-between">
        <p className="font-sans text-xl font-bold text-black">상세 필터</p>
        <Ic_X onClick={onClose} className="cursor-pointer" />
      </div>
      <div className="flex flex-col gap-12">
        <p className="font-sans text-16 text-black">위치</p>
        <div className="h-258 w-350 overflow-x-scroll rounded-6 border border-gray-20"></div>
        <div className="grid h-82 grid-cols-2 gap-8"></div>
      </div>
      <hr />
      <div className="h-92 border">
        <p>인풋 자리1</p>
      </div>
      <hr />
      <div className="h-92 border">
        <p>인풋 자리2</p>
      </div>
      <div className="h-48 border">
        <p>버튼 자리</p>
      </div>
    </div>
  );
};

export default Filter;
