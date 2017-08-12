import {Component, OnInit} from '@angular/core';
import {CountriesService} from './countries/countries.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'jo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  previousUrl = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: CountriesService) {

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if (!this.route.snapshot.queryParamMap.get('isBack')) {
          this.service.breadcrumbs.push(this.previousUrl);
          this.previousUrl = event.urlAfterRedirects;
        }
    });
  }

  ngOnInit(): void {

    if (!this.service.countries) {
      this.router.navigate(['error'], { replaceUrl: true });
    }
  }
}
