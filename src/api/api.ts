import { routeGetApi, routePostApi, routeUpdateApi } from ".";
import { checkOnline } from "../utils/utils";

interface GenericResponse {
  success?: boolean;
  message?: string;
}

export const loginApi = async (input): Promise<GenericResponse> => {
  if (await checkOnline()) {
    const response = await routePostApi("/login", input);
    if (response.success) return response;
  }
};

// locks
export const getLocksApi = async (): Promise<void> => {
  let locks;
  if (await checkOnline()) {
    const response = await routeGetApi("/viewlocks");
    locks = response?.data;
  }
  return locks;
};

export const createLockApi = async (props): Promise<void> => {
  if (await checkOnline()) {
    await routePostApi("/createlock", props);
  }
};

export const editLockApi = async (id, params): Promise<void> => {
  if (await checkOnline()) {
    const editLock = await routeUpdateApi({
      apiRoute: "/updatelock/" + id,
      params,
    });
    console.log("edit", editLock);
  }
};
export const deleteLockApi = async (id): Promise<GenericResponse> => {
  if (await checkOnline()) {
    const deleteLockRes = await routeUpdateApi({
      apiRoute: "/archivelock/" + id,
    });
    if (deleteLockRes.success) return deleteLockRes;
  }
};

// categories
export const getCategoriesApi = async (): Promise<void> => {
  let categories;
  if (await checkOnline()) {
    const response = await routeGetApi("/displaycategories");
    // return response
    categories = response?.data;
  }
  return categories;
};

// login types
export const getLoginTypesApi = async (): Promise<void> => {
  let loginTypes;
  if (await checkOnline()) {
    const response = await routeGetApi("/displaylogintype");
    // return response
    loginTypes = response?.data;
  }
  return loginTypes;
};
