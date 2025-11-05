export const BASE_URL = import.meta.env.VITE_API_URL;
export const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL;

export const API_BASE_URL = BASE_URL + "/api";
export const STORAGE_BASE_URL = BASE_URL + "/api";

export const getApiCall = async (apiUrl: string): Promise<any | null> => {
    try {
        // debugger;
        const apiToken = window.localStorage?.getItem("apiToken") || "";
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + apiToken);
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        const resp = await fetch(`${API_BASE_URL}${apiUrl}`, requestOptions);
        const res: any = await resp.json();
        res["status"] = res.status || resp.status;
        if (res.status === 401) {
            window.localStorage.removeItem("apiToken");
            window.location.href = "/dental-world-admin/login";
        }
        console.log(res.status, resp.status, "GET");
        return res;
    } catch (error) {
        console.error(error, apiUrl);
    } finally {
    }
    return { status: 4000, message: "Something went wrong" };
};

export const patchApiCall = async (
    apiUrl: string,
    body: object
): Promise<any | null> => {
    try {
        const apiToken = window.localStorage?.getItem("apiToken") || "";
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + apiToken);
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions: RequestInit = {
            method: "PATCH",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(body),
        };

        const resp = await fetch(`${API_BASE_URL}${apiUrl}`, requestOptions);

        const res: any = await resp.json();
        res["status"] = res.status || resp.status;
        return res;
    } catch (error) {
        console.error(error);
    } finally {
    }
    return { status: 4000, message: "Something went wrong" };
};

export const postApiCall = async (
    apiUrl: string,
    body: object
): Promise<any | null> => {
    try {
        const apiToken = window.localStorage?.getItem("apiToken") || "";
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + apiToken);
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(body),
        };

        const resp = await fetch(`${API_BASE_URL}${apiUrl}`, requestOptions);

        const res: any = await resp.json();
        res["status"] = res.status || resp.status;
        console.log(res.status, resp.status);

        return res;
    } catch (error) {
        console.error(error);
    } finally {
    }
    return { status: 4000, message: "Something went wrong" };
};

export const putApiCall = async (
    apiUrl: string,
    body: object
): Promise<any | null> => {
    try {
        const apiToken = window.localStorage?.getItem("apiToken") || "";
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + apiToken);
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions: RequestInit = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(body),
        };

        const resp = await fetch(`${API_BASE_URL}${apiUrl}`, requestOptions);

        const res: any = await resp.json();
        res["status"] = res.status || resp.status;

        return res;
    } catch (error) {
        console.error(error);
    } finally {
    }
    return { status: 4000, message: "Something went wrong" };
};

export const uploadImages = async (
    files: File[],
    body: any,
    uploadUrl = "/api/files/upload"
) => {
    let token = window.localStorage.getItem("apiToken") || "";
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    // myHeaders.append("_apiToken", `${token}`);

    const formdata = new FormData();
    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        if (files.length == 1) {
            formdata.append(`file`, element, element.name);
        } else {
            formdata.append(`file[]`, element, element.name);
        }
    }
    for (let bodyItems = 0; bodyItems < body.length; bodyItems++) {
        const element = body[bodyItems];
        formdata.append(element["key"], element["value"]);
    }

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow" as RequestRedirect,
    };

    let response = await window.fetch(BASE_URL + uploadUrl, requestOptions);
    if (response.status !== 200) {
        throw new Error(await response.text());
    }
    const result: any = await response.json();
    result["status"] = response.status;
    return result;
};
