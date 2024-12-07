import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../app-routing.module';
import {
  spellCheckerIcon,
  logoutIcon,
  userIcon,
  bellIcon,
} from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  spellCheckerIcon = spellCheckerIcon;
  logoutIcon = logoutIcon;
  userIcon = userIcon;
  bellIcon = bellIcon;
  public items: any[];
  constructor(private router: Router, private route: ActivatedRoute) {
    this.items = this.mapItems(routes);
  }

  selectRoute(e: any) {
    if (!e.items) {
      this.router.navigate([`./${e.item.path}`], { relativeTo: this.route });
    }
  }

  private mapItems(routes: any[], path?: string): any[] {
    return routes.map((item) => {
      const result: any = {
        text: item.text,
        path: (path ? `${path}/` : '') + item.path,
      };

      if (item.children) {
        result.items = this.mapItems(item.children, item.path);
      }

      return result;
    });
  }
}
