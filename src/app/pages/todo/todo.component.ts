import { Component, computed, signal } from '@angular/core';
import {
  CheckBoxComponent,
  CentralWidgetComponent,
  FrameComponent,
  HBoxLayoutComponent,
  LabelComponent,
  LineComponent,
  LineEditComponent,
  MainWindowComponent,
  PushButtonComponent,
  StatusBarComponent,
  ToolBarComponent,
  VBoxLayoutComponent
} from '../../components/qt-widgets';
import { Action } from '../../core/action';
import { QProperty } from '../../core/property';

type TodoFilter = 'all' | 'active' | 'completed';

interface StoredTodo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItem extends StoredTodo {
  done: QProperty<boolean | null>;
  editing: QProperty<string>;
}

const STORAGE_KEY = 'qt-tauri.todo.items';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CheckBoxComponent,
    CentralWidgetComponent,
    FrameComponent,
    HBoxLayoutComponent,
    LabelComponent,
    LineComponent,
    LineEditComponent,
    MainWindowComponent,
    PushButtonComponent,
    StatusBarComponent,
    ToolBarComponent,
    VBoxLayoutComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  readonly newTask = new QProperty('');
  readonly filter = signal<TodoFilter>('all');
  readonly todos = signal<TodoItem[]>(this.restoreTodos());

  readonly addAction = new Action({ text: 'Nova', handler: () => this.addTodo() });
  readonly clearDoneAction = new Action({ text: 'Limpar concluidas', handler: () => this.clearCompleted() });
  readonly resetAction = new Action({ text: 'Exemplo', handler: () => this.loadSample() });

  readonly totalCount = computed(() => this.todos().length);
  readonly completedCount = computed(() => this.todos().filter(todo => todo.completed).length);
  readonly activeCount = computed(() => this.totalCount() - this.completedCount());
  readonly filteredTodos = computed(() => {
    const filter = this.filter();
    return this.todos().filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  });

  addTodo(): void {
    const title = this.newTask.value.trim();
    if (!title) return;

    this.todos.update(todos => [
      ...todos,
      this.createTodo({
        id: Date.now(),
        title,
        completed: false
      })
    ]);
    this.newTask.value = '';
    this.persist();
  }

  setFilter(filter: TodoFilter): void {
    this.filter.set(filter);
  }

  updateTodo(todo: TodoItem): void {
    const title = todo.editing.value.trim();
    if (!title) {
      this.removeTodo(todo.id);
      return;
    }

    todo.title = title;
    todo.completed = todo.done.value === true;
    this.todos.update(todos => [...todos]);
    this.persist();
  }

  removeTodo(id: number): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
    this.persist();
  }

  clearCompleted(): void {
    this.todos.update(todos => todos.filter(todo => !todo.completed));
    this.persist();
  }

  loadSample(): void {
    this.todos.set([
      this.createTodo({ id: 1, title: 'Revisar widgets Qt usados no app', completed: true }),
      this.createTodo({ id: 2, title: 'Adicionar tarefas pelo QLineEdit', completed: false }),
      this.createTodo({ id: 3, title: 'Filtrar tarefas pendentes e concluidas', completed: false })
    ]);
    this.persist();
  }

  private createTodo(todo: StoredTodo): TodoItem {
    return {
      ...todo,
      done: new QProperty<boolean | null>(todo.completed),
      editing: new QProperty(todo.title)
    };
  }

  private restoreTodos(): TodoItem[] {
    const fallback: StoredTodo[] = [
      { id: 1, title: 'Criar um todo app com widgets Qt', completed: false }
    ];

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) as StoredTodo[] : fallback;
      return stored.map(todo => this.createTodo(todo));
    } catch {
      return fallback.map(todo => this.createTodo(todo));
    }
  }

  private persist(): void {
    const stored: StoredTodo[] = this.todos().map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }
}
