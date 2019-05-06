describe('Jetpacks', () => {
  beforeEach(() => {
    cy.visit('/search')
  })

  it('Should display form and button ', () => {
    cy.get('[data-test="searchForm"]')
      .should('contain', 'Date de fin')
      .and('contain', 'Date de début')
    cy.get('[data-test="searchBtn"]').and('contain', 'Rechercher')
  })

  it('On search, should unable form, change buton and return 1 jetpack', () => {
    cy.get('[data-test="dateStart"]').type('2019-05-03')
    cy.get('[data-test="dateEnd"]').type('2019-05-03')
    cy.get('[data-test="searchBtn"]').click()
    cy.get('[data-test="newSearch"]').should('not.contain', 'Rechercher')
    cy.get('[data-test="searchResult"]').should(
      'contain',
      '1 jetpack(s) disponnible :'
    )
    cy.get('[data-test="newSearch"]').should('contain', 'Nouvelle recherche')

    cy.get('[data-test="bookingBtn"]').click()
    cy.get('[data-test="newSearch"]').should(
      'not.contain',
      'Nouvelle recherche'
    )
    cy.get('[data-test="searchBtn"]').and('contain', 'Rechercher')
  })
})
