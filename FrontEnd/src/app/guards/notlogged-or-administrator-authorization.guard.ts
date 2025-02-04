import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotLoggedOrAdministratorAuthorization implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      const hasAccess = roles.length === 0 || roles.includes('Administrator');

      if (!hasAccess) {
        this.router.navigate(['/not-found'], { queryParams: { message: 'Access denied. Admins or logged-out users only.' } });
        return false;
      }

      return true;
  }
}
