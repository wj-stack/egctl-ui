import { http } from "@/utils/http";

export interface GateWayItem {
  name: string;
  port: number;
  desc: string;
  tag: string;
}

type Result = {
  code: number;
  data: {
    gateway: Array<GateWayItem>;
  };
};

const prefix = "/api/group";

export const getGateWayList = () => {
  return http.request<Result>("get", prefix + "/gateway");
  // const arr = [];
  // for (let index = 0; index < 100; index++) {
  //   arr.push(<GateWayItem>{
  //     name: "string",
  //     port: 1,
  //     desc: "string",
  //     tag: "string"
  //   });
  // }
  // return { code: 0, data: { gateway: arr } };
};

// 新增/修改
export const addGateWay = (data?: GateWayItem) => {
  return http.request<Result>("post", prefix + "/gateway", { data });
};

export const delGateWay = (data?: GateWayItem) => {
  return http.request<Result>("delete", prefix + "/gateway", { data });
};
