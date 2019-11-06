import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  public recipes: Recipe [] = [
    // tslint:disable-next-line: max-line-length
    new Recipe('Receta de pruebas', 'Esto es una prueba de recetas', 'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg'),
    new Recipe('Receta de pruebas', 'Esto es una prueba de recetas', 'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
