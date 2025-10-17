import { useState, useEffect, useCallback } from "react";
import IcCheck from "@/assets/svgs/ic_check.svg";
import LoadingSpinner from "@/components/LoadingSpinner";
import Button from "@/components/Button";
import ToastContainer from "@/components/Toast";
import MessageModal from "@/components/Modal/MessageModal";
import { CardImageBox, CardTime, CardAddress, CardPay, CardDescription } from "@/components/ShopInfo";
import { getCookieValue } from "@/utils/getCookie";
import { isStartTimePassed } from "@/utils/formatTime";
import { useGetUserApplicationsQuery } from "@/hooks/api/application/useGetUserApplicationsQuery";
import { useGetMyInfoQuery } from "@/hooks/api/user/useGetMyInfoQuery";
import { usePutShopApplicationQuery } from "@/hooks/api/application/usePutShopApplicationQuery";
import { usePostShopApplicationQuery } from "@/hooks/api/application/usePostShopApplicationQuery";
import {
  GetShopNoticeDetailRequest,
  GetShopNoticeDetailResponse,
} from "@/hooks/api/notice/useGetShopNoticeDetailQuery";

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
      setUserId(id);
    }
  }, []);

  const {
    mutate: postShopApplication,
    isPending: isApplyPending,
    isSuccess: isApplySuccess,
  } = usePostShopApplicationQuery();

  const {
    mutate: putShopApplication,
    isPending: isCancelPending,
    isSuccess: isCancelSuccess,
  } = usePutShopApplicationQuery();

  const { data: userData } = useGetMyInfoQuery(userId);

  const { data: applyData } = useGetUserApplicationsQuery({ userId });

  useEffect(() => {
    if (isApplySuccess) {
      const timer = setTimeout(() => {
        setIsApply(true);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isApplySuccess]);

  useEffect(() => {
    if (isCancelSuccess) {
      const timer = setTimeout(() => {
        setIsApply(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isCancelSuccess]);

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
    let profile = false;
    if (userData?.item?.address) {
      profile = true;
    }
    setIsProfile(profile);
  }, [userId]);

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
    return <LoadingSpinner />;
  }

  const notice = jobData?.item;
  const shop = notice?.shop.item;

  const handleApplyClick = () => {
    if (!userId) {
      setModalMessage("로그인이 필요합니다");
      setIsOpen(!isOpen);
      return;
    }
    if (!isProfile) {
      setModalMessage("내 프로필을 먼저 등록해주세요");
      setIsOpen(!isOpen);
      return;
    }
    postShopApplication(
      {
        shopId,
        noticeId,
      },
      {
        onSuccess: (data) => {
          if (data && data.item.id) {
            setApplicationId(data.item.id);
          }
          setIsApply(true);
        },
        onError: (err) => {
          console.error("신청 에러:", err);
        },
      },
    );
  };

  const handleCancelClick = () => {
    putShopApplication(
      {
        shopId,
        noticeId,
        applicationId,
        data: {
          status: "canceled",
        },
      },
      {
        onSuccess: () => {
          setIsApply(false);
          setIsOpen(!isOpen);
        },
      },
    );
  };

  const footers = getFooters();
  const isPassed = isStartTimePassed(notice.startsAt) || jobData.item.closed;

  return (
    <>
      <div>
        <p className="text-16 font-bold text-primary">{shop.category}</p>
        <h2 className="text-28 font-bold text-black">{shop.name}</h2>
      </div>
      <div className="align-center my-12 flex h-480 flex-col justify-center justify-around gap-10 rounded-12 border border-gray-20 p-20 desktop:my-24 desktop:flex-row desktop:justify-between desktop:p-24">
        <CardImageBox imageUrl={shop.imageUrl} name={shop.name} closed={false} startsAt={notice.startsAt} />
        <div className="flex w-full flex-col justify-between desktop:w-364">
          <div className="mb-40 flex flex-col gap-10 desktop:mb-60">
            <p className="text-16 font-bold text-primary">시급</p>
            <CardPay hourlyPay={notice.hourlyPay} originalHourlyPay={shop.originalHourlyPay} closed={notice.closed} />
            <CardTime startsAt={notice.startsAt} workhour={notice.workhour} />
            <CardAddress address={shop.address1} />
            <CardDescription description={shop.description} />
          </div>
          {userId && isApply ? (
            <Button
              status="lined"
              className="w-full py-14"
              onClick={() => {
                setModalMessage("신청을 취소하시겠어요?");
                setIsOpen(!isOpen);
              }}
              disabled={isCancelPending}
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
    </>
  );
};

export default JobDetail;
