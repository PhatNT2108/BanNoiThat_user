import axios, { AxiosInstance } from "axios";
import PaginationDto from "../../model/PaginationDto";

class RestClient {
  private axiosInstance: AxiosInstance;
  private path: string = "";
  private authToken: string | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 100000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    // Thêm interceptor để tự động thêm Authorization vào headers
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Thêm interceptor để xử lý lỗi
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (typeof error.response === "undefined") {
          console.log("network error");
          window.location.href = "/error-page";
        }
        if (error.response.status === 401) {
          // Authorization error
          window.location.href = "/signin";
        } else if (error.response.status === 500) {
          // Server error
          window.location.href = "/500-error";
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  // Cấu hình lại baseURL và headers
  config(baseURL: string, headers: Record<string, string> = {}): this {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 100000,
      withCredentials: true,
      headers,
    });

    return this;
  }

  // Thiết lập đường dẫn dịch vụ
  service(path: string): this {
    this.path = path;

    return this;
  }

  // Xác thực tài khoản
  async authentication(email: string, password: string): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await this.axiosInstance.post(`/${this.path}`, formData);
      if (response.data.result.token) {
        this.authToken = response.data.result.token;
        if (this.authToken) {
          localStorage.setItem("userToken", this.authToken);
        }
      }

      return response.data;
    } catch (error) {
      console.error("Error during authentication", error);
      throw error;
    }
  }

  // Làm mới token xác thực
  async reAuthentication(): Promise<any> {
    if (!this.authToken) throw new Error("No authentication token found");
    try {
      const response = await this.axiosInstance.post(`/${this.path}/re-auth`, {
        token: this.authToken,
      });
      if (response.data?.token) {
        this.authToken = response.data.token;
        if (this.authToken) {
          localStorage.setItem("userToken", this.authToken);
        }
      }
      return response.data;
    } catch (error) {
      console.error("Error during re-authentication", error);
      throw error;
    }
  }

  // Tạo mới dữ liệu
  async create<T>(data: any): Promise<T> {
    try {
      const isFormData = data instanceof FormData;
      const authToken = localStorage.getItem("userToken");
      const response = await this.axiosInstance.post<T>(`/${this.path}`, data, {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating data", error);
      throw error;
    }
  }

  // Lấy dữ liệu theo ID
  async get<T>(objectId: string): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(
        `/${this.path}/${objectId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data by ID", error);
      throw error;
    }
  }

  // Tìm kiếm dữ liệu với query
  async find<T>(query: string = ""): Promise<T> {
    try {
      const url = query ? `/${this.path}?${query}` : `/${this.path}`;
      const response = await this.axiosInstance.get<T>(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        console.error("Network error", error);
        throw new Error("Network error");
      }
      console.error("Error finding data", error);
      throw error;
    }
  }

  // Tìm kiếm dữ liệu với query có phân trang
  async findPagedList<T>(
    query: string = ""
  ): Promise<{ data: T; pagination: PaginationDto }> {
    let paginationDto: PaginationDto;
    try {
      const url = query ? `/${this.path}?${query}` : `/${this.path}`;
      const response = await this.axiosInstance.get<T>(url);
      paginationDto = JSON.parse(response.headers["x-pagination"]);
      return { data: response.data, pagination: paginationDto };
    } catch (error: any) {
      if (!error.response) {
        console.error("Network error", error);
        throw new Error("Network error");
      }
      console.error("Error finding data", error);
      throw error;
    }
  }

  // Tìm kiếm dữ liệu với query có phân trang
  async findRecommend<T>(
    query: string = "",
    bodyForm: any
  ): Promise<{ data: T; pagination: PaginationDto }> {
    let paginationDto: PaginationDto;
    try {
      const url = query ? `/${this.path}?${query}` : `/${this.path}`;
      const isFormData = bodyForm instanceof FormData;
      const response = await this.axiosInstance.post<T>(url, bodyForm, {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
        withCredentials: true,
      });
      paginationDto = JSON.parse(response.headers["x-pagination"]);
      return { data: response.data, pagination: paginationDto };
    } catch (error: any) {
      if (!error.response) {
        console.error("Network error", error);
        throw new Error("Network error");
      }
      console.error("Error finding data", error);
      throw error;
    }
  }

  // Cập nhật dữ liệu
  async patch<T>(objectId: string, data: any): Promise<T> {
    try {
      const isFormData = data instanceof FormData;
      const response = await this.axiosInstance.patch<T>(
        `/${this.path}/${objectId}`,
        data,
        {
          headers: {
            "Content-Type": isFormData
              ? "multipart/form-data"
              : "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating data", error);
      throw error;
    }
  }

  async patchEachProperty<T>(objectId: string, data?: any): Promise<T> {
    try {
      const isFormData = data instanceof FormData;
      const response = await this.axiosInstance.patch<T>(
        `/${this.path}/${objectId}`,
        data,
        {
          headers: {
            "Content-Type": isFormData
              ? "multipart/form-data"
              : "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating data", error);
      throw error;
    }
  }

  // Cập nhật dữ liệu
  async put<T>(objectId: string, data: any): Promise<T> {
    try {
      const isFormData = data instanceof FormData;
      const response = await this.axiosInstance.put<T>(
        `/${this.path}/${objectId}`,
        data,
        {
          headers: {
            "Content-Type": isFormData
              ? "multipart/form-data"
              : "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating data", error);
      throw error;
    }
  }

  // Cập nhật dữ liệu
  async post<T>(objectId: string, data: any): Promise<T> {
    try {
      const isFormData = data instanceof FormData;
      const response = await this.axiosInstance.put<T>(
        `/${this.path}/${objectId}`,
        data,
        {
          headers: {
            "Content-Type": isFormData
              ? "multipart/form-data"
              : "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating data", error);
      throw error;
    }
  }

  // Xóa dữ liệu theo ID
  async remove<T>(objectId: string): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(
        `/${this.path}/${objectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting data", error);
      throw error;
    }
  }
}

const clientAPI = new RestClient().config(process.env.REACT_APP_BACKEND ?? "");
export default clientAPI;
