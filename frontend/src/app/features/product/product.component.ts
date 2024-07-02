import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { products, user } from '../../interfaces/testProduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  user:user = {
    image: '',
    username: '',
    phone: '',
    emailAddress: ''
  }
  products:products[] = [
    {
      image:"https://th.bing.com/th/id/OIP.DPl9aqsf9VbqyyuuIzHZoAHaEG?w=318&h=180&c=7&r=0&o=5&pid=1.7",
      name:"iphone",
      rating:5,
      amount:"$1000"
    },
    {
      image:"https://diamondsbyraymondlee.com/wp-content/uploads/2023/02/4A090C58-5D87-48E8-B84F-BD7C6BF3CA17.jpg",
      name:"rolex watches",
      rating:4,
      amount:"$1000"
    },
    {
      image:"https://th.bing.com/th/id/OIP.JeV7opwyBzOoX2NXfXv8QgHaIC?rs=1&pid=ImgDetMain",
      name:"Baby play",
      rating:3,
      amount:"$100"
    },
    {
      image:"https://th.bing.com/th/id/OIP.4mNQDEQHDNUd6pU9AjnLCgAAAA?rs=1&pid=ImgDetMain",
      name:"Airpods pro",
      rating:5,
      amount:"$10"
    },
    {
      image:"https://images.furnituredealer.net/img/products/signature_design_by_ashley/color/ralene%20-%201195589344_d594-35%2B4x01%2B00-b0.jpg",
      name:"dining table",
      rating:4,
      amount:"$100"
    },
    {
      image:"https://th.bing.com/th/id/OIP.XbIRu-fWlDIVUmo0OVjZNAAAAA?rs=1&pid=ImgDetMain",
      name:"Beauty products",
      rating:5,
      amount:"$100"
    },
  ];

  getRating(length:number):number[]{
    return Array.from({length},(_, i)=> i);
  }
}
