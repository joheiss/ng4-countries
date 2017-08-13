import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Country, SearchCriteria} from './country';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {find, isEqual, cloneDeep} from 'lodash';
import {COUNTRIES} from '../../data/countries-data';

export const GOOGLE_API_KEY = 'AIzaSyDqlILRg6fQ6l5SVZevmstZxNZdpKVc4Xc';

@Injectable()
export class CountriesService {

  allCountries$ = new ReplaySubject<Country[]>(1);
  filteredCountries$ = new ReplaySubject<Country[]>(1);
  filteredCountriesCount$ = new ReplaySubject<number>(1);
  currentCountry$ = new ReplaySubject<Country>(1);
  searchCriteria$ = new ReplaySubject<SearchCriteria>(1);

  breadcrumbs: string[] = [];

  private _countries: Country[] = [];
  private _emptyCriteria;
  private _searchCriteria;

  constructor(private http: Http) {
    this._emptyCriteria = new SearchCriteria();
    this._searchCriteria = new SearchCriteria();
  }

  load(): Promise<any> {

    this._countries = null;

    return this.loadCountries()
      .toPromise()
      .then(data => {
        this._countries = data;
        this.loadSubjects(data);
      })
      .catch(err => Promise.resolve());
  }

  get countries(): any {
    return this._countries;
  }

  getCountryByCode(code: string): Country {

    const country =  this.findCountry(code);
    if (country.borders) {
      country.borders = country.borders.map(border => {
        if (border['code']) {
          return border; // has been mapped already before
        }
        const mappedBorder: any = {};
        mappedBorder.name = `${this.findCountry(border).name} (${border})`;
        mappedBorder.code = border;
        return mappedBorder;
      });
    }
    return country;
  }

  getMap(latitude, longitude) {

  }
  searchCountries(criteria: SearchCriteria) {

    console.log('Search with: ', criteria);
    this._searchCriteria = criteria;
    const results = this.findCountries();
    if (results) {
      const count = results.length || 0;
      this.filteredCountriesCount$.next(count);
    } else {
      this.filteredCountriesCount$.next(0);
    }
    this.filteredCountries$.next(results);
    this.searchCriteria$.next(this._searchCriteria);
  }

  selectCountry(country: Country) {
    this.currentCountry$.next(country);
  }

  private fillContinentsForSearch(): string[] {
    const continents = [];
    if (this._searchCriteria.africa) {
      continents.push('africa');
    }
    if (this._searchCriteria.america) {
      continents.push('americas');
    }
    if (this._searchCriteria.asia) {
      continents.push('asia');
    }
    if (this._searchCriteria.australia) {
      continents.push('oceania');
    }
    if (this._searchCriteria.antarctica) {
      continents.push('polar');
    }
    if (this._searchCriteria.europe) {
      continents.push('europe');
    }
    if (this._searchCriteria.none) {
      continents.push('none');
    }
    return continents;
  }

  private findCountries() {

    if (isEqual(this._searchCriteria, this._emptyCriteria)) {
      return this._countries;
    }

    const continents = this.fillContinentsForSearch();

    let results = this._countries;
    if (continents.length > 0) {
      results = results.filter(country => continents.includes(country.region.toLocaleLowerCase()));
    } else {
      results = [];
    }

    if (this._searchCriteria.term !== '') {
      results = results.filter(country => country.name.toLocaleLowerCase().includes(this._searchCriteria.term) ||
        country.nativeName.toLocaleLowerCase().includes(this._searchCriteria.term) ||
        country.alpha3Code.toLocaleLowerCase().includes(this._searchCriteria.term)
      );
    }
    return results;
  }

  private findCountry(code): Country {

    return find(this._countries, country => country.alpha3Code === code);
  }

  private loadCountries(): Observable<Country[]> {

    return this.http.get('https://restcountries.eu/rest/v2/all')
      .retry(3)
      .map(response => response.json())
      .map(response => response.map(item => {
        item.region = item.region || 'None';
        return item;
      }))
      .catch(err => {
        // take from local data store in case rest service is not available
        return Observable.of(COUNTRIES)
          .map(response => response.map(item => {
            item.region = item.region || 'None';
            return item;
          }));
      });
  }

  private loadCountry(code: string): Observable<Country> {

    return this.http.get(`https://restcountries.eu/rest/v2/alpha/${code}`)
      .map(response => response.json());
  }

  private loadSubjects(data: any) {
    this.allCountries$.next(data);
    this.filteredCountries$.next(data);
    this.filteredCountriesCount$.next(data.length);
    this.currentCountry$.next(data[0]);
    this.searchCriteria$.next(this._searchCriteria);
  }
}

