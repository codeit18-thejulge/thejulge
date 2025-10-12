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
    <div className="mx-auto max-w-6xl py-60">
      <ProfileSection userId={userId} />
      {hasApplicationLog ? <ApplicationLogSection userId={userId} /> : <EmptyApplicationLog />}
    </div>
  );
};

export default ProfileDetail;
