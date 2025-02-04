import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotLoggedAuthorization implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      const hasAccess = roles.length === 0;

      if (!hasAccess) {
        this.router.navigate(['/not-found'], { queryParams: { message: 'Access denied. You must be logged out.' } });
        return false;
      }

      return true;
  }
}

