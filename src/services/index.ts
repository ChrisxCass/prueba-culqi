import { type ValidateAccessI, type ValidatePaginationI } from '@/types/index';
import culqiApi from './axios';


class Service {

  async validateAccess(body: ValidateAccessI) {
    try {
      const { data } = await culqiApi.post("/auth/login", body);
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async getEmployees(params: ValidatePaginationI) {
    try {
      const { data } = await culqiApi.get(`/empleados?limit=${params.limit}&page=${params.page}`);
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

export default new Service();