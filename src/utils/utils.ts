const server = import.meta.env.PUBLIC_SERVER;

class CustomError extends Error {
  details: Record<string, any>;

  constructor(message: string, details: Record<string, any>) {
    super(message);
    this.name = "CustomError";
    this.details = details;
  }
}

export async function fetchData(
  path: string,
  method: string,
  headers?: HeadersInit,
  body?: BodyInit
) {
  try {
    const response = await fetch(`${server}${path}`, {
      method: method,
      credentials: "include",
      headers: headers,
      body: body,
    });

    if (response.status === 401) {
      throw new CustomError(response.statusText, {
        success: false,
        message: response.statusText,
      });
    }

    const data = await response.json();

    if (!data.success) {
      throw new CustomError(data.message, {
        success: false,
        message: data.message,
        validationErrors: data.validationErrors || null,
      });
    }

    return data;
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(error.message);
      return error.details;
    }

    console.error("Unknown Error", error);
    return {
      success: false,
      message: "An unknown error ocurred",
    };
  }
}
