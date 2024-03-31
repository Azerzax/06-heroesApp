import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children:[
      {
        path: 'newhero',
        component: NewPageComponent
      },
      {
        path: 'search',
        component: SearchPageComponent
      },
      {
        path: 'edit/:id',
        component: NewPageComponent
      },
      {
        path: 'list',
        component: ListPageComponent
      },
      {
        path: ':id',
        component: HeroPageComponent
      }
      ,
      {
        path: '**',
        redirectTo: 'list'
      }
      // ES IMPORTANTE EL ORDEN, EN ESTE CASO EL :ID TIENE QUE IR
      //EL ULTIMO PORQUE ASI PRIMERO SE COMPRUEBA SI NO PASA POR OTRA RUTA,
      //SI ESTUVIESE :ID PRIMERO POR EJEMPLO BUSCARIA SEARCH COMO SI FUERA UN ID
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
