import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  
  @Output() ElegirReceta = new EventEmitter<Recipe>();
  public recipes: Recipe [] = [
    // tslint:disable-next-line: max-line-length
    new Recipe('Flan de turrón', 'Esto es una prueba de flan de turrón', 'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg'),
    new Recipe('Paella de verduras', 'Esto es una prueba de paella. Quiero aprender a hacer el arroz de conejo y verduras', 'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg'),
    new Recipe('Arroz de matanza', 'Arroz al horno muy rico. Bomba calórica.', 'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

  onSelectedReceta(miReceta: Recipe){
    this.ElegirReceta.emit(miReceta);
  }

}
