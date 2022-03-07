import cypress from 'cypress';
describe('Test', () => {
  it('Test', () => {
    cypress.visit('/');
    cypress.get('#root').should('contain', 'Hello World');
  });
});
