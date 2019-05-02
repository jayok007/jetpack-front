describe('Jetpacks', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the jetpacks', () => {
    cy.get('[data-test="jetpack"]')
      .should('contain', 'Jetpack Fortnite Wiki')
      .and('contain', 'Jetpack JackTalior')
  })

  it('should add a jetpack', () => {
    cy.get('[data-test="createJetpackBtn"]').click()
    cy.get('[data-test="nameInput"]').type('Jetpack Joyride')
    cy.uploadImage('jetpack-4.png', '[data-test="imageInput"]')

    cy.get('[data-test="saveBtn"]').click()

    cy.get('[data-test="jetpack"]').should('contain', 'Jetpack Joyride')
  })
})
