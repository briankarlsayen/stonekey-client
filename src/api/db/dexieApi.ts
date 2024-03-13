import { db } from "./db";

export const getAuthDetails = async () => {
  return await db.auth.where("id").equals(0).first();
};

export const storeAuthDetails = async (props) => {
  const { accessToken, masterKey } = props;
  await db.auth.clear();
  await db.auth.add({ id: 0, accessToken, masterKey });
};

export const deleteAuthDetails = async () => {
  await db.auth.clear();
};
