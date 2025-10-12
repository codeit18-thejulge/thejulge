import { GetMyInfoResponse } from "@/hooks/api/user/useGetMyInfoQuery";
import ProfileSection from "./ProfileSection";
import ApplicationLogSection from "./ApplicationLogSection";

interface Props {
  userInfo: GetMyInfoResponse;
}

const ProfileDetail = ({ userInfo }: Props) => {
  const { item } = userInfo;

  return (
    <div className="mx-auto max-w-6xl py-60">
      <ProfileSection item={item} />
      <ApplicationLogSection />
    </div>
  );
};

export default ProfileDetail;
