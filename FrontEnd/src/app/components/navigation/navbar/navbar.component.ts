import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { NavBarButton } from '../../../models/NavBarButton';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() options : NavBarButton[] | undefined
  @Input() logInPage: boolean | undefined
  userPhoto: string | null = null;
  constructor(private router: Router,private sessionService:SessionService) { }

  ngOnInit(): void {
    this.userPhoto = localStorage.getItem('userPhoto');
  }

  onLogout(): void{
    this.sessionService.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("userPhoto");
    this.router.navigate(['login']);
  }

  navigate(option:String):void{
    this.router.navigate([option]);
  }
}
