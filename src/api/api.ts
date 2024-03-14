import { routeGetApi, routePostApi } from ".";
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
    const response = await routePostApi("/createlock", props);
    // return response
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
