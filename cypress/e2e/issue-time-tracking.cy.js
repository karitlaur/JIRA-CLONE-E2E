describe('Issue time tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });


    it('Should add, edit, and delete estimation and time tracking for an issue', () => {

        const trackingModal = () => cy.get('[data-testid="modal:tracking"]')

        // Adding estimation and time tracking
        cy.get('input[placeholder="Number"]').clear().type('15');
        cy.get('[data-testid="icon:stopwatch"]').click();
        trackingModal().within(() => {
            cy.get('input[placeholder="Number"]').eq(0).clear().type('5');
            cy.get('input[placeholder="Number"]').eq(1).clear().type('10');
            cy.contains('button', 'Done').click();
        })
        // Checking the addition
        cy.get('input[placeholder="Number"]').should('have.value', '15');
        cy.get('[data-testid="icon:stopwatch"]').click();
        trackingModal().within(() => {
            cy.get('input[placeholder="Number"]').eq(0).should('have.value', '5');
            cy.get('input[placeholder="Number"]').eq(1).should('have.value', '10');
            cy.contains('button', 'Done').click();
        })
        cy.get('input[placeholder="Number"]').eq(0).clear().type('20');
        cy.get('[data-testid="icon:stopwatch"]').click();
        // Editing estimation and time tracking
        trackingModal().within(() => {

            cy.get('input[placeholder="Number"]').eq(0).clear().type('10');
            cy.get('input[placeholder="Number"]').eq(1).clear().type('10');
            cy.contains('button', 'Done').click();
        })
        // Checking the editing
        cy.get('input[placeholder="Number"]').should('have.value', '20');
        cy.get('[data-testid="icon:stopwatch"]').click();
        trackingModal().within(() => {
            cy.get('input[placeholder="Number"]').eq(0).should('have.value', '10');
            cy.get('input[placeholder="Number"]').eq(1).should('have.value', '10');
            cy.contains('button', 'Done').click();
        })
        // Deleting estimation and time tracking
        cy.get('input[placeholder="Number"]').clear();
        cy.get('[data-testid="icon:stopwatch"]').click();
        trackingModal().within(() => {
            cy.get('input[placeholder="Number"]').eq(0).clear();
            cy.get('input[placeholder="Number"]').eq(1).clear();
            cy.contains('button', 'Done').click();
        })
        // Checking the deletion
        cy.get('input[placeholder="Number"]').should('have.value', '');
        cy.get('[data-testid="icon:stopwatch"]').click();
        trackingModal().within(() => {
            cy.get('input[placeholder="Number"]').eq(0).should('have.value', '');
            cy.get('input[placeholder="Number"]').eq(1).should('have.value', '');
        })
    })
})








