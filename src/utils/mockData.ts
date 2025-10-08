// 유저 알림 데이터 예시입니다. 본인꺼 필요하시면 추가해서 사용해주세요.

export const USER_ALERTS = {
  offset: 0,
  limit: 6,
  count: 15,
  hasNext: true,
  items: [
    {
      item: {
        id: "alert-01",
        createdAt: "2025-09-28T15:00:00Z",
        result: "accepted",
        read: false,
        application: {
          item: {
            id: "application-01",
            status: "accepted",
          },
          href: "https://api.example.com/applications/application-01",
        },
        shop: {
          item: {
            id: "shop-01",
            name: "달콤한 베이커리",
            category: "음식",
            address1: "부산광역시 해운대구",
            address2: "우동 123",
            description: "매일 아침 갓 구운 빵을 판매하는 동네 인기 베이커리입니다.",
            imageUrl: "https://images.unsplash.com/photo-1598373182133-52452f7691ef",
            originalHourlyPay: 12000,
          },
          href: "https://api.example.com/shops/shop-01",
        },
        notice: {
          item: {
            id: "notice-01",
            hourlyPay: 15000,
            description: "주말 오후 파트타이머를 구합니다. 밝고 성실한 분을 환영해요!",
            startsAt: "2025-10-11T14:00:00Z",
            workhour: 6,
            closed: false,
          },
          href: "https://api.example.com/notices/notice-01",
        },
        links: [],
      },
    },
    {
      item: {
        id: "alert-02",
        createdAt: "2025-09-27T11:30:00Z",
        result: "rejected",
        read: true,
        application: {
          item: {
            id: "application-02",
            status: "rejected",
          },
          href: "https://api.example.com/applications/application-02",
        },
        shop: {
          item: {
            id: "shop-02",
            name: "싱싱한 과일가게",
            category: "식료품",
            address1: "부산광역시 남구",
            address2: "대연동 456",
            description: "산지 직송 제철 과일을 전문으로 판매합니다.",
            imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
            originalHourlyPay: 11000,
          },
          href: "https://api.example.com/shops/shop-02",
        },
        notice: {
          item: {
            id: "notice-02",
            hourlyPay: 11000,
            description: "평일 오전 매장 정리 및 판매 보조 아르바이트생을 구합니다.",
            startsAt: "2025-10-10T09:00:00Z",
            workhour: 4,
            closed: false,
          },
          href: "https://api.example.com/notices/notice-02",
        },
        links: [],
      },
    },
    {
      item: {
        id: "alert-03",
        createdAt: "2025-09-25T18:00:00Z",
        result: "accepted",
        read: true,
        application: {
          item: {
            id: "application-03",
            status: "accepted",
          },
          href: "https://api.example.com/applications/application-03",
        },
        shop: {
          item: {
            id: "shop-03",
            name: "트렌디 편집샵",
            category: "패션",
            address1: "부산광역시 부산진구",
            address2: "전포동 789",
            description: "독특한 디자인의 의류와 액세서리를 판매하는 곳입니다.",
            imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
            originalHourlyPay: 13500,
          },
          href: "https://api.example.com/shops/shop-03",
        },
        notice: {
          item: {
            id: "notice-03",
            hourlyPay: 14000,
            description: "SNS 관리 및 고객 응대 담당자를 찾습니다. 패션에 관심 많은 분 지원해주세요.",
            startsAt: "2025-10-13T12:00:00Z",
            workhour: 8,
            closed: true,
          },
          href: "https://api.example.com/notices/notice-03",
        },
        links: [],
      },
    },
  ],
  links: [],
};

