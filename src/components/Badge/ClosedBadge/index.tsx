import XButtonIcon from "@/assets/svgs/x.svg";

interface Props {
  propText: string;
}

const ClosedBadge = ({ propText }: Props) => {
  const onClickDelete = () => {};
  
  return (
    <div className="flex max-w-fit items-center gap-6 rounded-20 bg-red-10 px-10 py-6 text-12-regular leading-none text-primary tablet:text-14-bold">
      <span>{propText}</span>
      <button type="button" onClick={onClickDelete} aria-label="삭제">
        <XButtonIcon />
      </button>
    </div>
  );
};

export default ClosedBadge;
