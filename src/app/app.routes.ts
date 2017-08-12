import {Routes} from '@angular/router';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {CountriesComponent} from './countries/countries.component';
import {CountryDetailsComponent} from './countries/country-details/country-details.component';
import {CountryRouteResolver} from './countries/country-route.resolver';
import {ErrorComponent} from './error/error.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full'
    // component: LoadingSpinnerComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'countries/:id',
    component: CountryDetailsComponent
    /*
    resolve: {
      country: CountryRouteResolver
    }
    */
  },
  {
    path: 'countries',
    component: CountriesComponent
  },
  {
    path: '**',
    redirectTo: 'countries',
    pathMatch: 'full'
    // loadChildren: './countries/countries.module#CountriesModule'
  }
];
