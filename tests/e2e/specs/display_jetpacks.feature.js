describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display 2 jetpacks', () => {
    cy.get('.jetpack').should('have.length', 2)
  })

  it('should display Fortnite jetpack', () => {
    cy.get('.jetpack').contains('Jetpack Fortnite Wiki')
  })

  it('should display JackTalior jetpack', () => {
    cy.get('.jetpack').contains('Jetpack JackTalior')
  })
})
