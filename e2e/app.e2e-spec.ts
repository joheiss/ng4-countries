import { Ng4CountriesPage } from './app.po';

describe('ng4-countries App', () => {
  let page: Ng4CountriesPage;

  beforeEach(() => {
    page = new Ng4CountriesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
