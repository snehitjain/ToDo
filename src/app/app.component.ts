import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ServiceService } from './service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  data: ITodo[] = [];
  newItem: string='';
  interface ITodo {
    _id: number;
    name: string;
    complete:string;
    v:string;
}
 
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getData();
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
