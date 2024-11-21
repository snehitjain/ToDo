import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceService } from './service.service';
import { CommonModule } from '@angular/common';
import ITodo from './model/list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  data: ITodo[] = [];
  filterdata: ITodo[] = [];

  newItem: string = '';
  id: string = '';
  selectedTask!: string;

  constructor(private service: ServiceService) {}

  taskLeft(): number {
    return this.data.filter((task) => !task.completed).length;
  }
  allTask() {
    console.log('alltask', this.filterdata);
    this.filterdata = this.data;
    this.selectedTask = 'all';
  }
  completedTask() {
    console.log('complted task');
    this.filterdata = this.data.filter((tasks) => tasks.completed);
    console.log(this.filterdata);
    this.selectedTask = 'completed';
  }
  activeTask() {
    console.log('active task');
    this.filterdata = this.data.filter((task) => !task.completed);
    console.log(this.filterdata);
    this.selectedTask = 'active';
  }

  ngOnInit(): void {
    this.getData();
  }
  onTaskSelect(oneitem: ITodo): void {
    let completed = !oneitem.completed;
    console.log(`selected id ${completed}`);
    this.service.updateData({ completed: completed }, oneitem._id).subscribe(
      (update) => {
        console.log(update);
        oneitem.completed = completed;
      },
      (error) => {
        console.error('Error deleting task', error);
        alert('There was error deleting the task');
      }
    );
  }

  onCrossSelect(_id: string): void {
    console.log(`selected id ${_id}`);
    this.service.deleteDatabyId(_id).subscribe(
      (deletion) => {
        console.log(deletion);
        this.data = this.data.filter((item) => item._id !== _id);
      },
      (error) => {
        console.error('Error deleting task', error);
        alert('There was error deleting the task');
      }
    );
  }

  getData(): void {
    this.service.getData().subscribe(
      (response) => {
        console.log(response);
        this.data = response;
        this.filterdata = response;
      },
      (error) => {
        console.error('Error fetching data', error);
        alert('There was an issue fetching data from the server.');
      }
    );
  }
  addTodo(): void {
    this.service.postData({ name: this.newItem }).subscribe(
      (adding) => {
        console.log(adding);
        this.data.push(adding);
        this.filterdata.push(adding);
        if (this.selectedTask === 'active') {
          this.filterdata = this.data.filter((task) => !task.completed);
        } else if (this.selectedTask === 'completed') {
          this.filterdata = this.data.filter((task) => task.completed);
        }
        this.newItem = '';
      },
      (error) => {
        console.error('Error sending data', error);
        alert('There was an issue sending data to the server.');
      }
    );
  }
}
