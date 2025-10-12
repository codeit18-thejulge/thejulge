import { GetMyInfoResponse } from "@/hooks/api/user/useGetMyInfoQuery";
import ProfileSection from "./ProfileSection";

interface Props {
  userInfo: GetMyInfoResponse;
}

const ProfileDetail = ({ userInfo }: Props) => {
  const { item } = userInfo;

  return (
    <div className="mx-auto max-w-6xl py-60">
      <ProfileSection item={item} />
    </div>
  );
};

export default ProfileDetail;
