import { routePostApi } from ".";
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
