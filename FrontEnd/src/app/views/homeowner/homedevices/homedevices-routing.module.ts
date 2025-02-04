import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDevicesComponent } from './homedevices.component';

const routes: Routes = [
  {
    path: '',
    component: HomeDevicesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDevicesRoutingModule {}
