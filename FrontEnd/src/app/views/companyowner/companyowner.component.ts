import { Component, OnInit } from '@angular/core';
import { NavBarButton } from '../../models/NavBarButton';

@Component({
  selector: 'app-companyowner',
  templateUrl: './companyowner.component.html',
  styleUrls: ['./companyowner.component.css'],
})
export class CompanyOwnerComponent implements OnInit {
  optionsOfNavBar: NavBarButton[] = [
    new NavBarButton('companyowner/company', 'Company'),
    new NavBarButton('companyowner/devices', 'Devices'),
    new NavBarButton('companyowner/importer', 'Import Devices'),
  ];

  constructor() {}
  ngOnInit(): void {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    if (roles.length === 1 && roles[0] === 'CompanyOwner') {
      this.optionsOfNavBar.push(
        new NavBarButton('companyowner/homeowner', 'Change to Homeowner')
      );
    }

    if (roles.includes('HomeOwner')) {
      this.optionsOfNavBar.push(
        new NavBarButton('homeowner/homedevices', 'Change to HomeOwner')
      );
    }
  }
}
