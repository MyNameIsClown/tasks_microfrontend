class StatusDTO {
  id: number;
  name: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;

  constructor(
    id: number,
    name: string,
    fechaCreacion: Date,
    fechaActualizacion: Date
  ) {
    this.id = id;
    this.name = name;
    this.fechaCreacion = fechaCreacion;
    this.fechaActualizacion = fechaActualizacion;
  }
}

export { StatusDTO as StatusDTO };
