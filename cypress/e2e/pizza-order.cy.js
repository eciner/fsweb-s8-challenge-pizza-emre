describe('Pizza sipariş akışı (birleştirilmiş)', () => {
  beforeEach(() => {
    cy.visit('/')
    // stub the pizza POST to ensure stable success response
    cy.intercept('POST', 'https://reqres.in/api/pizza', {
      statusCode: 201,
      body: { id: 123, createdAt: new Date().toISOString() },
    }).as('postPizza')
  })

  it('Sipariş sayfası açılabiliyor ve `data-cy` ile sipariş verilebiliyor', () => {
    cy.get('[data-cy="hero-order-btn"]').click()

    // Fill form using custom command (use actual app values)
    cy.fillOrder({
      name: 'Cypress Tester',
      size: 'L',
      crust: 'İnce',
      quantity: 2,
      notes: 'Bitte extra cheese',
    })

    // Submit order
    cy.get('[data-cy="submit-order"]').should('not.be.disabled').click()

    // Wait for success page and confirm product name and home button
    cy.wait('@postPizza')
    cy.get('[data-cy="success-product-name"]', { timeout: 10000 }).should('exist')
    cy.get('[data-cy="success-home-btn"]').should('exist')
  })

  it('Minimum malzeme doğrulamasını yapar ve uyarı gösterir', () => {
    cy.get('[data-cy="hero-order-btn"]').click()

    // Name only
    cy.get('[data-cy="input-name"]').clear().type('Short Test')

    // select size & crust (required for submission)
    cy.get('[data-cy="size-pill-L"]').click({ force: true })
    cy.get('[data-cy="crust-pill-İnce"]').click({ force: true })

    // Make sure no toppings are selected, then try to submit
    cy.get('[data-cy="submit-order"]').should('be.disabled')

    // Select first three toppings (still invalid because app requires min 4)
    cy.get('[data-cy^="input-topping-"]').eq(0).check({ force: true })
    cy.get('[data-cy^="input-topping-"]').eq(1).check({ force: true })
    cy.get('[data-cy^="input-topping-"]').eq(2).check({ force: true })

    // Submit still disabled
    cy.get('[data-cy="submit-order"]').should('be.disabled')

    // Select a fourth topping to satisfy validation
    cy.get('[data-cy^="input-topping-"]').eq(3).check({ force: true })

    // Now submit enabled
    cy.get('[data-cy="submit-order"]').should('not.be.disabled')
  })
})
