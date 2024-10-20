class TaskDTO {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;

  constructor(
    id: number,
    titulo: string,
    descripcion: string,
    estado: string,
    fechaCreacion: Date,
    fechaActualizacion: Date
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.fechaActualizacion = fechaActualizacion;
  }
}

export { TaskDTO };
