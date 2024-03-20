import { routeGetApi, routePostApi, routeUpdateApi } from ".";
import { CreateCategoryProps } from "../interfaces/category.interface";
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
export const getLocksApi = async () => {
  let locks;
  if (await checkOnline()) {
    const response = await routeGetApi("/viewlocks");
    locks = response?.data;
  }
  return locks;
};

export const createLockApi = async (props) => {
  if (await checkOnline()) {
    await routePostApi("/createlock", props);
  }
};

export const editLockApi = async (id, params) => {
  if (await checkOnline()) {
    const editLock = await routeUpdateApi({
      apiRoute: "/updatelock/" + id,
      params,
    });
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
export const getCategoriesApi = async () => {
  let categories;
  if (await checkOnline()) {
    const response = await routeGetApi("/displaycategories");
    categories = response?.data;
  }
  return categories;
};
export const createCategoryApi = async (props: CreateCategoryProps) => {
  if (await checkOnline()) {
    await routePostApi("/createcategory", props);
  }
};
export const editCategoryApi = async (id, params) => {
  if (await checkOnline()) {
    await routeUpdateApi({
      apiRoute: "/updatecategory/" + id,
      params,
    });
  }
};

// login types
export const getLoginTypesApi = async () => {
  let loginTypes;
  if (await checkOnline()) {
    const response = await routeGetApi("/displaylogintype");
    // return response
    loginTypes = response?.data;
  }
  return loginTypes;
};

// user
export const editUserApi = async (params) => {
  if (await checkOnline()) {
    await routeUpdateApi({
      apiRoute: "/updateaccount",
      params,
    });
  }
};

export const getAccountApi = async () => {
  let categories;
  if (await checkOnline()) {
    const response = await routeGetApi("/viewuser");
    categories = {
      ...response,
      ...response?.data,
      name: response?.name,
    };
  }
  return categories;
};

export const editPasswordApi = async (params): Promise<GenericResponse> => {
  if (await checkOnline()) {
    return await routeUpdateApi({
      apiRoute: "/updatepassword",
      params,
    });
  }
};

export const deleteAccountApi = async (id): Promise<GenericResponse> => {
  if (await checkOnline()) {
    return await routeUpdateApi({
      apiRoute: "/archiveuser/" + id,
    });
  }
};
