import ProfileSection from "./ProfileSection";
import ApplicationLogSection from "./ApplicationLogSection";
import { useGetUserApplicationsQuery } from "@/hooks/api/application/useGetUserApplicationsQuery";
import EmptyApplicationLog from "./EmptyApplicationLog";

interface Props {
  userId: string;
}

const ProfileDetail = ({ userId }: Props) => {
  const { data: userApplication } = useGetUserApplicationsQuery({ userId });

  if (!userApplication) {
    return <p>데이터를 불러오지 못했습니다</p>;
  }

  const hasApplicationLog = userApplication?.items.length > 0;

  return (
    <div>
      <ProfileSection userId={userId} />

      <div className="bg-gray-5 pb-120 pt-60">
        {hasApplicationLog ? <ApplicationLogSection userId={userId} /> : <EmptyApplicationLog />}
      </div>
    </div>
  );
};

export default ProfileDetail;
