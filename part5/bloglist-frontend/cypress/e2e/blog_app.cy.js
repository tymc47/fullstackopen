describe('blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function() {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });
});

describe('login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const defaultUser = {
      username: 'tester1',
      name: 'Tester',
      password: '123456'
    };

    cy.request('POST', 'http://localhost:3003/api/users', defaultUser);
    cy.visit('http://localhost:3000');
  });

  it('succeeds with correct credentials', function() {
    cy.get('#username-input').type('tester1');
    cy.get('#password-input').type('123456');
    cy.get('#login-btn').click();

    cy.contains('Tester logged in');
  });

  it('fails with wrong credentials', function() {
    cy.get('#username-input').type('tester1');
    cy.get('#password-input').type('1234');
    cy.get('#login-btn').click();

    cy.get('.notification')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });
});