import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {CountriesComponent} from './countries.component';
import {CountryListComponent} from './country-list/country-list.component';
import {CountryListItemComponent} from './country-list-item/country-list-item.component';
import {CountryDetailsComponent} from './country-details/country-details.component';
import {CountriesService} from './countries.service';
import {CountriesRoutingModule} from './countries-routing.module';
import {CountryRouteResolver} from './country-route.resolver';
import {CountriesSearchComponent} from './countries-search/countries-search.component';
import {LoadingSpinnerModule} from '../loading-spinner/loading-spinner.module';
import {ZippyModule} from '../zippy/zippy.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CountriesRoutingModule,
    LoadingSpinnerModule,
    ZippyModule
  ],
  declarations: [
    CountriesComponent,
    CountryListComponent,
    CountryListItemComponent,
    CountryDetailsComponent,
    CountriesSearchComponent
  ],
  providers: [
    CountryRouteResolver
  ],
  exports: [
    CountriesComponent
  ]
})
export class CountriesModule {
}

