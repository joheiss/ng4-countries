import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountryDetailsComponent} from './country-details/country-details.component';
import {CountriesComponent} from './countries.component';
import {CountryRouteResolver} from './country-route.resolver';

const countriesRoutes: Routes = [
    {
        path: 'countries/:id',
        component: CountryDetailsComponent,
        resolve: {
            country: CountryRouteResolver
        }
    },
    {
        path: 'countries',
        component: CountriesComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(countriesRoutes)
    ],
    declarations: [],
    providers: [],
    exports: [
        RouterModule
    ]
})
export class CountriesRoutingModule {}




