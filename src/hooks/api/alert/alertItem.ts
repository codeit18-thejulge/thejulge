import { ApplicationStatus, Link, ResultStatus, SeoulAddress, ShopCategory } from "@/types/global";

export interface AlertItemWrapper {
  item: AlertItem;
  links: Link[];
}

export interface AlertItem {
  id: string;
  createdAt: string;
  result: ResultStatus;
  read: boolean;
  application: {
    item: {
      id: string;
      status: ApplicationStatus;
    };
    href: string;
  };
  shop: {
    item: {
      id: string;
      name: string;
      category: ShopCategory;
      address1: SeoulAddress;
      address2: string;
      description: string;
      imageUrl: string;
      originalHourlyPay: number;
    };
    href: string;
  };
  notice: {
    item: {
      id: string;
      hourlyPay: number;
      description: string;
      startsAt: string;
      workhour: number;
      closed: boolean;
    };
    href: string;
  };
  links: Link[];
}
