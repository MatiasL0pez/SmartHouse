import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css']
})
export class NotFoundComponent implements OnInit {
  message: string = 'Page not found';

  constructor(private route: ActivatedRoute, private router: Router,private sessionService:SessionService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.message = params['message'];
      }
    });
  }

  onLogout(): void {
    this.sessionService.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    this.router.navigate(['login']);
  }
}
