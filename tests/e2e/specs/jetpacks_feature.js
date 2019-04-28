describe('Jetpacks', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the jetpacks', () => {
    cy.get('[data-test="jetpack"]')
      .should('have.length', 2)
      .should('contain', 'Jetpack Fortnite Wiki')
      .should('contain', 'Jetpack JackTalior')
  })
})
