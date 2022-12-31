import axios, {AxiosResponse} from "axios";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(undefined, error=>{
  if (error.response.data.error) throw error.response.data.error
  throw error.response.statusText
})

export enum Url { PRODUCT, AUTH };

const baseUrl = (requestFor: Url): string => {
    if(requestFor === Url.PRODUCT) return "http://localhost:2000/";
    if(requestFor === Url.AUTH) return "http://localhost:8000/";
    return "invalid prop";
}

const Requests = {
    get: (url: Url, endpoint: string) => axios.get(baseUrl(url) + endpoint).then(responseBody),
    getWithCredentials: (url: Url, endpoint: string) => axios.get(baseUrl(url) + endpoint, { withCredentials: true }).then(responseBody),
    postWithImage: (url: Url, endpoint: string, body: {}) => axios.post(baseUrl(url) + endpoint, body, {withCredentials: true, headers: {'Content-Type': 'multipart/form-data'}}).then(responseBody),
    post: (url: Url, endpoint: string, body: {}) => axios.post(baseUrl(url) + endpoint, body, {withCredentials: true}).then(responseBody),
    patch: (url: Url, endpoint: string, body: {}) => axios.patch(baseUrl(url) + endpoint, body, {withCredentials: true, headers: {'Content-Type': 'multipart/form-data'}}).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody),
    auth: () => axios.get("http://localhost:8000/isVerified", { withCredentials: true }).then(responseBody),
    test: (url: string, body: {}) => axios.post(url,body).then(responseBody)
}
export default Requests;
