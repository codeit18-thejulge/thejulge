import IcXButton from "@/assets/svgs/ic_x.svg";

interface Props {
  propText: string;
  onDelete: () => void;
}

const ClosedBadge = ({ propText, onDelete }: Props) => {

  return (
    <div className="flex h-30 max-w-fit items-center gap-6 rounded-20 bg-red-10 px-10 py-6 text-12-regular leading-none text-primary tablet:text-14-bold">
      <span>{propText}</span>
      <button type="button" onClick={onDelete} aria-label="삭제">
        <IcXButton />
      </button>
    </div>
  );
};

export default ClosedBadge;
