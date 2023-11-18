export interface ValidateAccessI {
  correo: string,
  password: string,
}

export interface ValidatePaginationI {
  limit: number,
  page: number,
}

export interface Employee {
  id: number;
  nombre: string;
  correo: string;
  cargo: string;
  departamento: string;
  oficina: string;
  estadoCuenta: string;
}