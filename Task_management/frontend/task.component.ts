import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', status: 'Pending' };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks));
  }

  addTask(): void {
    this.taskService.createTask(this.newTask).subscribe(task => {
      this.tasks.push(task);
      this.newTask = { title: '', description: '', status: 'Pending' };
    });
  }

  deleteTask(id?: number): void {
    if (id) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
    }
  }
}