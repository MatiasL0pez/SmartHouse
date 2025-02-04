import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CompanyOwnerAuthorization implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      const hasAccess = roles.includes("CompanyOwner");

      if (!hasAccess) {
        this.router.navigate(['/not-found'], { queryParams: { message: 'Access denied. Only CompanyOwners.' } });
        return false;
      }

      return true;
  }
}
