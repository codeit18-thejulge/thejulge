import { useState, useEffect, useCallback } from "react";
import IcCheck from "@/assets/svgs/ic_check.svg";
import Button from "@/components/Button";
import ToastContainer from "@/components/Toast";
import MessageModal from "@/components/Modal/MessageModal";
import { CardImageBox, CardTime, CardAddress, CardPay, CardDescription } from "@/components/ShopInfo";
import { getCookieValue } from "@/utils/getCookie";
import { isStartTimePassed } from "@/utils/formatTime";
import { addRecentViewedJob } from "@/utils/recentList";
import { useGetUserApplicationsQuery } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import { usePutShopApplicationQuery } from "@/hooks/api/application/usePutShopApplicationQuery";
import { usePostShopApplicationQuery } from "@/hooks/api/application/usePostShopApplicationQuery";
import {
  GetShopNoticeDetailRequest,
  GetShopNoticeDetailResponse,
} from "@/hooks/api/notice/useGetShopNoticeDetailQuery";
import SkeletonUI from "@/components/Skeleton";

interface ButtonSetting {
  buttonText: string;
  onClick: () => void;
  style: "filled" | "lined";
  className: string;
}

interface JobDetailProps extends GetShopNoticeDetailRequest {
  jobData: GetShopNoticeDetailResponse | undefined;
  isPending: boolean;
}

const JobDetail = ({ shopId, noticeId, jobData, isPending }: JobDetailProps) => {
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const id = getCookieValue(document.cookie, "userId") as string;
      const type = getCookieValue(document.cookie, "userType") as string;
      setUserId(id);
      setUserType(type);
    }
  }, []);

  const {
    mutate: postShopApplication,
    isPending: isApplyPending,
    isSuccess: isApplySuccess,
  } = usePostShopApplicationQuery({
    onMutate: () => setIsApply(true),
    onSuccess: (data) => {
      if (data && data.item.id) {
        setApplicationId(data.item.id);
      }
    },
    onError: () => setIsApply(false),
  });

  const {
    mutate: putShopApplication,
    isPending: isCancelPending,
    isSuccess: isCancelSuccess,
  } = usePutShopApplicationQuery({
    onMutate: () => setIsApply(false),
    onError: () => setIsApply(true),
  });

  const { data: userData } = useGetMyInfoQuery(userId ?? "", { enabled: !!userId });
  const { data: applyData } = useGetUserApplicationsQuery({ userId }, { enabled: !!userId });

  useEffect(() => {
    let appliedStatus = false;
    if (applyData) {
      applyData.items.map((item) => {
        if (item.item.notice.item.id === noticeId && item.item.status !== "canceled") {
          appliedStatus = true;
          setApplicationId(item.item.id);
        }
      });
    }
    setIsApply(appliedStatus);
  }, [applyData, noticeId]);

  useEffect(() => {
    if (!userData) {
      return;
    }
    setIsProfile(!!userData?.item?.address);
  }, [userData]);

  useEffect(() => {
    if (!jobData) {
      return;
    }
    addRecentViewedJob({
      noticeId,
      shopId,
    });
  }, [jobData]);

  const handleCancelClick = () => {
    setIsOpen(false);
    putShopApplication({
      shopId,
      noticeId,
      applicationId,
      data: {
        status: "canceled",
      },
    });
  };

  const getFooters = useCallback((): ButtonSetting[] => {
    if (!isProfile && userId) {
      return [
        {
          buttonText: "확인",
          onClick: handleClose,
          style: "lined",
          className: "w-80 h-38",
        },
      ];
    }
    if (applicationId) {
      return [
        {
          buttonText: "닫기",
          onClick: handleClose,
          style: "lined",
          className: "w-80 h-38",
        },
        {
          buttonText: "취소하기",
          onClick: handleCancelClick,
          style: "filled",
          className: "w-80 h-38",
        },
      ];
    }
    if (!userId) {
      return [
        {
          buttonText: "확인",
          onClick: handleClose,
          style: "filled",
          className: "w-80 h-38",
        },
      ];
    }
    return [
      {
        buttonText: "닫기",
        onClick: handleClose,
        style: "filled",
        className: "w-80 h-38",
      },
    ];
  }, [userId, isProfile, applicationId]);

  if (!shopId || !noticeId || isPending || !jobData) {
    return (
      <div className="py-40 tablet:py-60">
        <div>
          <SkeletonUI count={1} boxClassName="w-[calc((100%)/3)] h-66" className="h-66" />
        </div>
        <div className="my-12 rounded-12 border border-gray-20 p-20 tablet:p-24 desktop:my-24">
          <SkeletonUI
            count={1}
            boxClassName="w-full tablet:h-645 desktop:h-308"
            className="tablet:h-645 desktop:h-308"
          />
        </div>
        <SkeletonUI count={1} boxClassName="w-full rounded-12 h-124" className="h-124" />
      </div>
    );
  }

  const notice = jobData?.item;
  const shop = notice?.shop.item;

  const handleApplyClick = () => {
    if (!userId) {
      setModalMessage("로그인이 필요합니다");
      setIsOpen(!isOpen);
      return;
    }
    if (userType === "employer") {
      setModalMessage("사장님은 공고 지원이 어렵습니다");
      setIsOpen(!isOpen);
      return;
    }
    if (!isProfile) {
      setModalMessage("내 프로필을 먼저 등록해주세요");
      setIsOpen(!isOpen);
      return;
    }
    postShopApplication({
      shopId,
      noticeId,
    });
  };

  const footers = getFooters();
  const isPassed = isStartTimePassed(notice.startsAt) || jobData.item.closed;

  return (
    <div className="py-40 tablet:py-60">
      <div>
        <p className="text-16 font-bold text-green-60">{shop.category}</p>
        <h2 className="text-28 font-bold text-black">{shop.name}</h2>
      </div>
      <div className="my-12 flex flex-col justify-center rounded-12 border border-gray-20 bg-white p-20 tablet:p-24 desktop:my-24 desktop:flex-row desktop:justify-between desktop:gap-x-31">
        <CardImageBox
          imageUrl={shop.imageUrl}
          name={shop.name}
          closed={jobData.item.closed}
          startsAt={notice.startsAt}
          className="desktop:h-308"
        />
        <div className="flex flex-col justify-between desktop:w-346">
          <div>
            <p className="pb-4 pt-16 text-16 font-bold text-green-60">시급</p>
            <div className="flex flex-col gap-y-8 tablet:gap-y-12">
              <CardPay hourlyPay={notice.hourlyPay} originalHourlyPay={shop.originalHourlyPay} closed={notice.closed} />
              <CardTime startsAt={notice.startsAt} workhour={notice.workhour} />
              <CardAddress address={shop.address1} />
              <CardDescription description={shop.description} />
            </div>
          </div>
          {userId && isApply ? (
            <Button
              status="lined"
              className="w-full py-14"
              onClick={() => {
                setModalMessage("신청을 취소하시겠어요?");
                setIsOpen(!isOpen);
              }}
              disabled={isCancelPending || jobData.item.closed}
            >
              취소하기
            </Button>
          ) : (
            <Button
              status="filled"
              className="w-full py-14"
              disabled={isApplyPending || isPassed}
              onClick={handleApplyClick}
            >
              {isPassed ? "신청 불가" : "신청하기"}
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-12 rounded-12 bg-gray-10 p-32">
        <p className="text-16 font-bold text-black">공고설명</p>
        <p>{notice.description}</p>
      </div>
      <MessageModal
        isOpen={isOpen}
        icon={<IcCheck className="h-24 w-24" />}
        message={modalMessage}
        onClose={handleClose}
        footers={footers}
      />
      {isApplySuccess && <ToastContainer label="신청이 완료 되었습니다" error={false} />}
      {isCancelSuccess && <ToastContainer label="신청이 취소 되었습니다" error={false} />}
    </div>
  );
};

export default JobDetail;
