class TaskStatusDTO {
  id: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;

  constructor(
    id: number,
    titulo: string,
    descripcion: string,
    fechaCreacion: Date,
    fechaActualizacion: Date
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fechaCreacion = fechaCreacion;
    this.fechaActualizacion = fechaActualizacion;
  }
}

export { TaskStatusDTO };
