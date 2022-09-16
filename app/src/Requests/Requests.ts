import axios, {AxiosResponse} from "axios";

const responseBody = (response: AxiosResponse) => response.data;

const Requests = {
  get: (url:string) => axios.get(url).then(responseBody),
  getWithCredentials: (url:string) => axios.get(url, { withCredentials: true }).then(responseBody),
  post: (url:string, body: {}) => axios.post(url, body, {withCredentials: true}).then(responseBody),
}
export default Requests;
