import XButton from "@/assets/svgs/x.svg";

interface Props {
  propText: string;
  deleteText: number;
}

const ClosedBadge = ({ propText, deleteText }:Props) => {
  const onClickDelete = () => {};

  return (
    <div className="flex max-w-fit items-center gap-6 rounded-20 bg-red-10 px-10 py-6 text-12-regular leading-none text-primary mobile:text-14-bold">
      <span>{propText}</span>
      <button type="button" onClick={onClickDelete} aria-label="삭제">
        <XButton />
      </button>
    </div>
  );
};

export default ClosedBadge;
