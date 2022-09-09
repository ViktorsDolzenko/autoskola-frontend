import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-categories-images',
  templateUrl: './categories-images.component.html',
  styleUrls: ['./categories-images.component.scss']
})
export class CategoriesImagesComponent implements OnInit {

  //@ts-ignore
  @Input() public categories: string[]

  constructor() { }

  ngOnInit(): void {
  }

}
