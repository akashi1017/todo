import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule,NgClass,NgIf,NgFor,NgStyle,DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  newTask: string = '';
  priority: string = 'must';
  dueDate: string | null = null;
  tags: string[] = [];
  tagInput: string = '';
  updatedTask: string = '';
  updatedPriority: string = 'must';
  updatedDueDate: string | null = null;
  updatedTags: string = '';
  tasks: { text: string, priority: string, dueDate: string | null, tags: string[], completed: boolean }[] = [];
  showCalendar: boolean = false;
  showUpdate: boolean = false;
  updateIndex: number | null = null;

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'must':
        return 'lightblue';
      case 'required':
        return '#F8C9C9';
      case 'maybe':
        return 'lightgreen';
      default:
        return 'transparent'; // Default to transparent if no matching priority found
    }
  }
  
  addTask() {
    if (this.newTask.trim() !== '') {
      // Parse tags from tagInput string
      const tagsArray = this.tagInput.split(',').map(tag => tag.trim());
      this.tasks.push({ text: this.newTask, priority: this.priority, dueDate: this.dueDate, tags: tagsArray, completed: false });
      this.newTask = '';
      this.priority = 'must';
      this.dueDate = null;
      this.tagInput = ''; // Clear tagInput after adding task
    }
  }
  

  taskCompleted(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  deleteSelectedTasks() {
    this.tasks = this.tasks.filter(task => !task.completed);
  }

  fillUpdateForm(task: any) {
    this.showUpdate = true;
    this.updateIndex = this.tasks.indexOf(task);
    this.updatedTask = task.text;
    this.updatedPriority = task.priority;
    this.updatedDueDate = task.dueDate;
    this.updatedTags = task.tags.join(', ');
  }

  updateTask() {
    if (this.updateIndex !== null && this.updatedTask.trim() !== '') {
      this.tasks[this.updateIndex].text = this.updatedTask;
      this.tasks[this.updateIndex].priority = this.updatedPriority;
      this.tasks[this.updateIndex].dueDate = this.updatedDueDate;
      this.tasks[this.updateIndex].tags = this.updatedTags.split(',').map(tag => tag.trim());
      this.showUpdate = false;
      this.updateIndex = null;
      this.updatedTask = '';
      this.updatedPriority = 'must';
      this.updatedDueDate = null;
      this.updatedTags = '';
    }
  }

  addTag() {
    if (this.tagInput.trim() !== '') {
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }
}
