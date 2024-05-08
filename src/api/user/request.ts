import { useMutation } from "react-query";
import axios from "@/api/axios";

export const prefix = "/user";

// const transformPagination = (pagination: any) => {
//   if (!pagination) return;

//   const current = pagination.current
//     ? pagination.current
//     : pagination.defaultCurrent;
//   const pageSize = pagination.pageSize
//     ? pagination.pageSize
//     : pagination.defaultPageSize;

//   let offset = 0;
//   if (current && pageSize) {
//     offset = (current - 1) * pageSize;
//   }

//   return {
//     offset,
//     limit: pageSize,
//   };
// };

// const transformFilters = (filters: any) => {
//   if (!filters) return;
//   let result: any[] = [];
//   for (let key in filters) {
//     if (!filters[key] || filters[key] === null) continue;
//     result = [...result, [key + ":eq:" + filters[key]]];
//   }
//   return result;
// };

// const transformSorter = (sorter: any) => {
//   if (!sorter) return;

//   let result = "";
//   if (sorter.field && sorter.order) {
//     let order: string = "desc";
//     if (sorter.order === "ascend") order = "asc";
//     result = sorter.field + " " + order;
//   }

//   return result;
// };

// type listParams = {
//   limit?: number;
//   offset?: number;
//   filter?: string[];
//   order?: string;
// };
// const useGetList = <T>(
//   key: string,
//   url: string,
//   pagination?: any,
//   filters?: any,
//   sorter?: any
// ) => {
//   const service = async () => {
//     let params: listParams = {};

//     params = { ...transformPagination(pagination) };
//     params.filter = transformFilters(filters);
//     params.order = transformSorter(sorter);

//     const transformRequest: AxiosTransformer = (data, headers) => {};
//     console.log("params: ", params);
//     const data: T = await axios.get(`${url}`, {
//       params,
//       paramsSerializer: (params) => {
//         return qs.stringify(params, { arrayFormat: "repeat" });
//       },
//       transformRequest,
//     });

//     return data;
//   };
//   return useQuery(key, () => service());
// };

// const useGetOne = <T>(key: string, url: string, params?: any) => {
//   const service = async () => {
//     const data: T = await axios.get(`${url}`, params);

//     return data;
//   };
//   return useQuery(key, () => service());
// };

const useCreate = <T, U>(url: string) => {
  return useMutation(async (params: T) => {
    const data: U = await axios.post(`${url}`, params);
    return data;
  });
};

// const useUpdate = <T>(url: string) => {
//   const queryClient = useQueryClient();
//   return useMutation(async (item: T) => {
//     const data: T = await axios.patch(`${url}`, item);
//     return data;
//   });
// };

// const useDelete = <T>(url: string) => {
//   const queryClient = useQueryClient();
//   return useMutation(async (id: number) => {
//     const data: T = await axios.delete(`${url}?id=${id}`);
//     return data;
//   });
// };

// const useBatch = (url: string) => {
//   const queryClient = useQueryClient();
//   return useMutation(async (ids: number[]) => {
//     const data = await axios.post(`${url}`, { idList: ids });
//     return data;
//   });
// };

export { useCreate };
