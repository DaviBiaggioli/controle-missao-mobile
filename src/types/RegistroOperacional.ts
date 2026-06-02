export interface Sensor {
  id: number;
  nomeSensor?: string;
}

export interface RegistroOperacional {
  id?: number;
  detalhesOperacionais: string;
  alertaCritico: boolean;
  dataRegistro?: string;
  sensor: Sensor;
}