import Dexie, { Table } from "dexie";

export interface Auth {
  id?: number;
  accessToken: string;
  masterKey: string;
}

export class MySubClassedDexie extends Dexie {
  auth!: Table<Auth>;

  constructor() {
    super("stonekeyDB");
    this.version(1).stores({
      auth: "id, accessToken, masterKey",
    });
  }
}

export const db = new MySubClassedDexie();
