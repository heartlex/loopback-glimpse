import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TodoList, TodoListWithRelations} from './todo-list.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @belongsTo(() => TodoList)
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }

  //// Metodo aggiunto per effettuare test unitari
  getInfos() {
    let infosAsString = 'Title: ' + this.title + '\n';
    if (this.id !== undefined) infosAsString = infosAsString +  'Id: ' + this.id + '\n';
    return infosAsString;
  }
}

export interface TodoRelations {
  todoList?: TodoListWithRelations;

}

export type TodoWithRelations = Todo & TodoRelations;
