import { Cookie } from "../types/Cookie";

export const serializeCookie = ({ name, value }: Cookie) => {
  return `${name}=${value}`;
};
