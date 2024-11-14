class TaskDTO {
  id: number;
  name: string;
  description: string;
  status: number; 
  board: number;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    name: string,
    description: string,
    status: number,
    board: number,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.board = board;
    this.created_at = created_at;
    this.updated_at = updated_at;

  }
}

export { TaskDTO };
