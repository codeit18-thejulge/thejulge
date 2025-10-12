import { useRouter } from "next/router";
import IcPhone from "@/assets/svgs/ic_phone.svg";
import IcAddress from "@/assets/svgs/ic_address.svg";
import Button from "@/components/Button";
import { GetMyInfoResponse } from "@/hooks/api/user/useGetMyInfoQuery";

interface Props {
  item: GetMyInfoResponse["item"];
}

const ProfileSection = ({ item }: Props) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push("/profile/register");
  };
  return (
    <div className="flex">
      <h2 className="flex-[1] text-20-bold tablet:text-28-bold">내 프로필</h2>
      <section className="flex flex-[2] justify-between rounded-xl bg-red-10 p-32">
        <div className="flex flex-col gap-12">
          <p className="text-16-bold text-primary">이름</p>
          <p className="text-28-bold">{item.name}</p>
          <div className="flex items-center gap-8">
            <IcPhone className="h-20 w-20 text-red-30" />
            <p className="text-16-regular text-gray-50">{item.phone}</p>
          </div>
          <div className="flex items-center gap-8">
            <IcAddress className="h-20 w-20 text-red-30" />
            <p className="text-16-regular text-gray-50">선호 지역: {item.address}</p>
          </div>
          <p className="text-16-regular">{item.bio}</p>
        </div>

        <div>
          <Button status="lined" className="px-136 py-14 text-16-bold" onClick={handleEditClick}>
            편집하기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProfileSection;
