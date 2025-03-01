export const JWT_SECRET: string = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "1d";
export const COOKIE_EXPIRES_IN =
  parseInt(process.env.COOKIE_EXPIRES_IN || "1") * 24 * 60 * 60 * 1000;
