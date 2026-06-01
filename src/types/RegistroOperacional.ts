export interface RegistroOperacional {
  id?: number;
  nomeSensor: string;
  detalhesOperacionais: string;
  alertaCritico: boolean;
  dataRegistro?: string;
}