Cypress.Commands.add('searchQuery', (query) => {
    cy.visit('/');
    cy.get('input.gsfi').first()
        .type(query);
    cy.wait(500);
    cy.get('ul[role="listbox"] > li').first().click();
});