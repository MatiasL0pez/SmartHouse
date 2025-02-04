import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomesAsMemberComponent } from './homesasmember.component';

const routes: Routes = [
  {
    path: '',
    component: HomesAsMemberComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomesAsMemberRoutingModule {}
