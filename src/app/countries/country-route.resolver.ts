import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {CountriesService} from './countries.service';

@Injectable()
export class CountryRouteResolver implements Resolve<any> {

  constructor(private service: CountriesService) {
  }

  resolve(route: ActivatedRouteSnapshot) {

    const id = route.paramMap.get('id');
    return this.service.getCountryByCode(id);
  }
}
