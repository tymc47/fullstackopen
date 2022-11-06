describe('blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const defaultUser = {
      username: 'tester1',
      name: 'Tester1',
      password: '123456'
    };

    const defaultUser2 = {
      username: 'tester2',
      name: 'Tester2',
      password: '123456'
    };

    cy.request('POST', 'http://localhost:3003/api/users', defaultUser);
    cy.request('POST', 'http://localhost:3003/api/users', defaultUser2);

    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function() {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('login', function() {
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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester1', password:'123456' });
    });

    it('a new blog can be created', function() {
      cy.contains('new blog').click();

      cy.get('input[placeholder="Blog Title"]').type('cy testing blog');
      cy.get('input[placeholder="Blog Author"]').type('Tester');
      cy.get('input[placeholder="Blog URL"]').type('cy.test/blog');
      cy.get('#createblog-btn').click();

      cy.contains('cy testing blog by Tester');
    });

    describe.only('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title:'cy blog1' , author:'Tester1', url:'cy.test/blog1' });
        cy.createBlog({ title:'cy blog2' , author:'Tester1', url:'cy.test/blog2' });
        cy.createBlog({ title:'cy blog3' , author:'Tester1', url:'cy.test/blog3' });
      });

      it('user can like a blog', function() {
        cy.contains('cy blog1 Tester1');
        cy.contains('show').click();
        cy.contains('likes 0');
        cy.contains('like').click();
        cy.contains('likes 1');
      });

      it('user can delete a blog', function() {
        cy.contains('cy blog1 Tester1');
        cy.contains('show').click();
        cy.contains('remove').click();
        cy.contains('cy blog1 Tester').should('not.exist');
      });

      it('user cannot delete other\'s blog', function() {
        cy.contains('logout').click();
        cy.login({ username:'tester2', password:'123456' });
        cy.contains('cy blog1 Tester1');
        cy.contains('show').click();

        cy.contains('remove').should('have.css','display','none');
      });

      it.only('blogs are ordered by likes', function() {
        cy.get('.blog-container')
          .contains('cy blog3 Tester1')
          .contains('show')
          .click()
          .parent()
          .parent()
          .contains('like')
          .click()
          .click();

        cy.get('.blog-container')
          .contains('cy blog1 Tester1')
          .contains('show')
          .click()
          .parent()
          .parent()
          .contains('like')
          .click();

        cy.get('.blog-container').eq(0).should('contain', 'cy blog3 Tester1');
        cy.get('.blog-container').eq(1).should('contain', 'cy blog1 Tester1');
      });
    });
  });
});


