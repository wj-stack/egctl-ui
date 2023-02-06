import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
  };
};

const prefix = "/api/group";

export interface EtcdItem {
  name: string;
  address: string;
  description: string;
  comment: string;
  status: number;
}

export const getEtcdList = () => {
  http.request<Result>("get", prefix + "/etcds").then(function (data: object) {
    console.log(data);
  });
};

export const addEtcd = (data?: EtcdItem) => {
  return http.request<Result>("post", prefix + "/etcd", { data });
};
