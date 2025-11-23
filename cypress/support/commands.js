// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Custom Cypress commands for filling the pizza order form
// These commands use `data-cy` attributes added to the app for stable selectors.

Cypress.Commands.add('fillMinimumToppings', () => {
	// selects the first two topping checkboxes
	cy.get('[data-cy^="input-topping-"]').then(($inputs) => {
		// check first up to four inputs to satisfy app validation (min 4)
		const toCheck = Math.min(4, $inputs.length)
		for (let i = 0; i < toCheck; i++) {
			cy.wrap($inputs[i]).check({ force: true })
		}
	})
})

Cypress.Commands.add('fillOrder', ({
	name = 'Test User',
	size = 'L',
	crust = 'İnce',
	quantity = 1,
	toppings = [],
	notes = 'Please make it spicy',
} = {}) => {
	cy.get('[data-cy="input-name"]').clear().type(name)

	// size pills: data-cy="size-pill-<value>"
	cy.get(`[data-cy="size-pill-${size}"]`).click({ force: true })

	// crust pills: data-cy="crust-pill-<name>"
	const crustKey = crust.replace(/\s+/g, '-')
	cy.get(`[data-cy="crust-pill-${crustKey}"]`).click({ force: true })

	// ensure at least two toppings if none specified
	if (!toppings || toppings.length === 0) {
		cy.fillMinimumToppings()
	} else {
		toppings.forEach((t) => cy.get(`[data-cy="input-topping-${t}"]`).check({ force: true }))
	}

	if (quantity && quantity > 1) {
		const increase = quantity - 1
		for (let i = 0; i < increase; i++) {
			cy.get('[data-cy="qty-increase"]').click({ force: true })
		}
	}

	if (notes) cy.get('[data-cy="input-notes"]').clear().type(notes)
})

export {}