interface Props {
  userId: string;
}

const ApplicationLogSection = ({ userId }: Props) => {
  return (
    <div className="">
      <h2 className="flex-[1] text-20-bold tablet:text-28-bold">신청내역</h2>
    </div>
  );
};

export default ApplicationLogSection;
