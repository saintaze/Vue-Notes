export class Note {
  constructor(noteName) {
    this.name = noteName;
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