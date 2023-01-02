import axios from "axios";

export class MTRequest {
  public static postWithFormData(url, formData) {
    return axios.post(url, formData, { headers: formData.getHeaders() });
  }

  public static delete(url) {
    return axios.delete(url);
  }
}
