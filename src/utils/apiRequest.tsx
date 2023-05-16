import axios, { Method } from "axios";

const apiRequest = async (
    url: string,
    method: Method,
    body?: Record<string, any>,
    content_type?: string
) => {
    const config = {
        method,
        url,
        headers: {
        "Content-Type": content_type ? content_type : "application/json",
        },
        data: body,
    };

    const response = await axios(config);
    return response.data;
};

export { apiRequest };