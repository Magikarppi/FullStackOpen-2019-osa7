describe('Blog app', function() {
  const title = 'Harvard neuroscience';
  const author = 'Lisa';
  const url = 'https://www.harvardneuroblog.com/';

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset/');
    const user = {
      name: 'Sam Harris',
      username: 'samTheMan',
      password: 'consciousness124'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=username_input]').type('samTheMan');
    cy.get('[data-cy=password_input]').type('consciousness124');
    cy.get('[data-cy=submit]').click();
  });

  it('user can log in', function() {
    cy.contains('Sam Harris logged in');
  });

  it('a new blog can be created and it\'s details shown', function() {
    cy.createBlog(title, author, url);

    cy.contains('Harvard neuroscience - Lisa');
    cy.get('[data-cy=blog_div]')
      .should('exist')
      .click();
    cy.contains('Likes');
    cy.get('[data-cy=like_btn]').should('exist');
  });

  it('a list of users can be shown', function() {
    cy.get('[data-cy=users_link]').click();

    cy.contains('Users');
    cy.contains('Sam Harris as samTheMan');
    cy.get('[data-cy=users_div]').should('exist');
  });

  it('blog can be liked and commented', function() {
    cy.createBlog(title, author, url);

    cy.get('[data-cy=blog_div]')
      .click();
    cy.get('[data-cy=like_btn]').click()
    cy.contains('Likes: 1');

    cy.get('[data-cy=comment_input]').type('a comment from cypress')
    cy.get('[data-cy=submit]').click()
    cy.contains('a comment from cypress')
    cy.get('li').should('have.length', 1)
  });
});
