export class Note {
  constructor(noteTitle) {
    this.name = noteTitle;
    this.todos = []
  }
}

export class Todo {
  constructor(todoTitle){
    this.title = todoTitle;
    this.completed = false;
    this.editing = false;
  }
}