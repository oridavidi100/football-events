import cy from 'cypress';
describe('football app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000');
  });
});
