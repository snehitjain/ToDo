import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceService } from './service.service';
import { CommonModule } from '@angular/common';
import ITodo from './model/list';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  data: ITodo[] = [];
  newItem: string='';
  id:string='';
  selectedTask!: string ;
  
 
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getData();
  }
  
  onTaskSelect(_id:string):void{
    this.selectedTask=_id;
    console.log(`selected id ${_id}`);
    this.service.deleteDatabyId(_id).subscribe(
      (deletion)=>{
        console.log(deletion);
        this.data = this.data.filter(item => item._id !== _id)
      },
      (error)=>{
        console.error('Error deleting task',error);
        alert('There was error deleting the task')
      }
    )
  }
  
  getData(): void {
    this.service.getData().subscribe(
      (response) => {
        console.log(response)
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data', error);
        alert('There was an issue fetching data from the server.');
      }
    );
  }
  addTodo():void{
    this.service.postData({name:this.newItem}).subscribe(
      (adding)=>{
        console.log(adding)
        this.data.push(adding)
        this.newItem=''
      },
      (error) => {
        console.error('Error sending data', error);
        alert('There was an issue sending data to the server.');
      }
    )
  }
}
