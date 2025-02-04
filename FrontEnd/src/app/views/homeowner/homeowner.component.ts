import { Component, OnInit } from '@angular/core';
import { NavBarButton } from '../../models/NavBarButton';

@Component({
  selector: 'app-homeowner',
  templateUrl: './homeowner.component.html',
  styleUrls: ['./homeowner.component.css'],
})
export class HomeOwnerComponent implements OnInit {
  optionsOfNavBar: NavBarButton[] = [
    new NavBarButton('homeowner/homedevices', 'My Homes'),
    new NavBarButton('homeowner/homeusers', 'My Homes Members'),
    new NavBarButton('homeowner/notifications', 'Notifications'),
    new NavBarButton('homeowner/devices', 'Devices'),
    new NavBarButton('homeowner/homesasmember', "Homes I'm a member"),
  ];

  constructor() {}
  ngOnInit(): void {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    if (roles.includes('Administrator')) {
      this.optionsOfNavBar.push(
        new NavBarButton('administrator', 'Change to Admin')
      );
    }

    if (roles.includes('CompanyOwner')) {
      this.optionsOfNavBar.push(
        new NavBarButton('companyowner', 'Change to CompanyOwner')
      );
    }
  }
}
