export declare class MTRequest {
  static postWithFormData(
    url: any,
    formData: any
  ): Promise<import("axios").AxiosResponse<any, any>>;
  static delete(url: any): Promise<import("axios").AxiosResponse<any, any>>;
}
