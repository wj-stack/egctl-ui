import { http } from "@/utils/http";

export interface EtcdItem {
  name: string;
  address: string;
  description: string;
  comment: string;
  status: number;
}

type Result = {
  code: number;
  data: {
    etcd: Array<EtcdItem>;
  };
};

const prefix = "/api/group";

export const getEtcdList = () => {
  return http.request<Result>("get", prefix + "/etcds");
};

// 新增/修改
export const addEtcd = (data?: EtcdItem) => {
  return http.request<Result>("post", prefix + "/etcd", { data });
};

export const delEtcd = (data?: EtcdItem) => {
  return http.request<Result>("delete", prefix + "/etcd", { data });
};
