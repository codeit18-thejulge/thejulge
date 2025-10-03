import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { AlertItemWrapper } from "./alertItem";

export interface PutUserAlertsRequest {
  userId: string;
  alertId: string;
}

export interface PutUserAlertsResponse {
  offset: number;
  limit: number;
  items: AlertItemWrapper[];
}

const putUserAlerts = async ({ userId, alertId }: PutUserAlertsRequest): Promise<PutUserAlertsResponse> => {
  const response = await instance.put(`/users/${userId}/alerts/${alertId}`);
  return response.data;
};

export const usePutUserAlertsQuery = () => {
  return useMutation({
    mutationFn: putUserAlerts,
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
};
