export interface Response<T = any> {
  status: "OK" | "ERROR";
  message?: string;
  data?: T;
}

export const createResponse = <T>(
  status: "ERROR" | "OK",
  data: T,
  message: string
): Response<T> => {
  return { status: status, data: data, message: message };
};

export const createSuccessResponse = <T>(data: T, message: string) => {
  return createResponse("OK", data, message);
};

export const createErrorResponse = (message: string) => {
  return createResponse("ERROR", undefined, message);
};
