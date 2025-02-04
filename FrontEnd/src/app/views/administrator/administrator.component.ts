import { Component, OnInit } from '@angular/core';
import { NavBarButton } from '../../models/NavBarButton';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
})
export class AdministratorComponent implements OnInit {
  optionsOfNavBar: NavBarButton[] = [
    new NavBarButton('administrator/companies', 'Companies'),
    new NavBarButton('administrator/users', 'Users'),
    new NavBarButton('administrator/devices', 'Devices'),
  ];

  ngOnInit(): void {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    if (roles.length === 1 && roles[0] === 'Administrator') {
      this.optionsOfNavBar.push(
        new NavBarButton('administrator/homeowner', 'Change to Homeowner')
      );
    }

    if (roles.includes('HomeOwner')) {
      this.optionsOfNavBar.push(
        new NavBarButton('homeowner/homedevices', 'Change to HomeOwner')
      );
    }
  }
}
