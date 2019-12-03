Cypress.Commands.add('createBlog', (title, author, url) => {
  cy.get('[data-cy=new_blog]').click()
  cy.get('[data-cy=title_input]').type(title)
  cy.get('[data-cy=author_input]').type(author)
  cy.get('[data-cy=url_input]').type(url)
  cy.get('[data-cy=submit]').click()
});
