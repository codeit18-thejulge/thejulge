import XButton from "@/assets/svgs/x.svg";

interface Props {
  propText: string;
  deleteText: number;
}

const ClosedBadge: React.FC<Props> = ({ propText, deleteText }) => {
  const onClickDelete = () => {};

  return (
    <div className="flex max-w-fit items-center gap-6 rounded-20 bg-red-10 px-10 py-6 text-14-bold leading-none text-primary">
      <span>{propText}</span>
      <button type="button" onClick={onClickDelete} aria-label="삭제">
        <XButton />
      </button>
    </div>
  );
};

export default ClosedBadge;
