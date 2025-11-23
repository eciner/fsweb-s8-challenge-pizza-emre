// cypress/e2e/pizza.cy.js
/// <reference types="cypress" />

// Daha dayanıklı, kısa ve bakımı kolay testler.
describe("Teknolojik Yemekler - Pizza Sipariş Akışı", () => {
  // Kısa alias'lar / yardımcı fonksiyonlar
  const visitOrder = () => cy.visit('/order');

  const fillMinimumToppings = () => {
    // Click topping pills using data-cy attribute
    cy.get('[data-cy^="topping-pill-"]')
      .should('have.length.gte', 4)
      .each(($el, idx) => {
        if (idx < 4) cy.wrap($el).click({ force: true });
      });
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("Home sayfası yükleniyor ve hero görülebiliyor", () => {
    cy.contains(/Teknolojik\s+Yemekler/i).should('be.visible');
    cy.get('[data-cy="hero-heading"]', { timeout: 5000 }).should('exist');
    cy.get('[data-cy="hero-order-btn"]').should('be.visible');
  });

  it("ACIKTIM butonuyla /order sayfasına gidiliyor", () => {
    cy.get('[data-cy="hero-order-btn"]').click();
    cy.url({ timeout: 5000 }).should('include', '/order');
    cy.get('.order-inner, .order-main', { timeout: 5000 }).should('be.visible');
  });

  it("Sipariş formundaki temel alanlar render ediliyor", () => {
    visitOrder();

    // isim inputu
    cy.get('[data-cy="input-name"]').should('be.visible');

    // size pill buttons
    cy.get('[data-cy^="size-pill-"]').its('length').should('be.gte', 2);

    // crust pill
    cy.get('[data-cy^="crust-pill-"]').first().should('exist');

    // topping pills
    cy.get('[data-cy^="topping-pill-"]').its('length').should('be.gte', 4);

    // notes textarea
    cy.get('[data-cy="input-notes"]').should('exist');

    // quantity control
    cy.get('.quantity-control, .quantity-buttons').first().should('exist');

    // submit button
    cy.get('.order-submit-button').should('exist');
  });

  it("İsim validasyonu: 3 karakter sınırı", () => {
    visitOrder();
    cy.get('[data-cy="input-name"]').as('nameInput');
    cy.get('@nameInput').clear().type('Ab');
    cy.contains('İsim en az 3 karakter olmalı.').should('be.visible');
    cy.get('@nameInput').clear().type('Emre');
    cy.contains('İsim en az 3 karakter olmalı.').should('not.exist');
  });

  it('Ek malzemeler kuralı (4–10) çalışıyor', () => {
    visitOrder();
    cy.get('.topping-pill').as('toppings').should('have.length.gte', 4);

    // önce 2 seç -> hata (pill click)
    cy.get('@toppings').eq(0).click({ force: true });
    cy.get('@toppings').eq(1).click({ force: true });
    cy.contains('En az 4 malzeme seçmelisiniz.').should('be.visible');

    // 4'e tamamla
    cy.get('@toppings').eq(2).click({ force: true });
    cy.get('@toppings').eq(3).click({ force: true });
    cy.contains('En az 4 malzeme seçmelisiniz.').should('not.exist');
  });

  it('Form valid değilken buton disabled, valid olunca enabled', () => {
    visitOrder();
    const submitBtn = () => cy.get('.order-submit-button');
    submitBtn().should('be.disabled');

    // Geçerli formu doldur
    cy.get('[data-cy="input-name"]').type('Emre Ciner');
    cy.get('[data-cy="size-pill-M"]').click({ force: true });
    cy.get('[data-cy="crust-pill-İnce"]').click({ force: true });
    fillMinimumToppings();

    submitBtn().should('not.be.disabled');
  });

  it('Başarılı submit sonrası /success sayfası ve API body doğrulaması', () => {
    visitOrder();

    const fakeResponse = {
      name: 'Emre Ciner',
      size: 'M',
      crust: 'İnce',
      quantity: 2,
      toppings: ['Mantar', 'Zeytin', 'Biber', 'Kaşar'],
      price: 150.5,
      id: 'fake-id-123',
      createdAt: new Date().toISOString(),
    };

    cy.intercept('POST', 'https://reqres.in/api/pizza', (req) => {
      req.reply({ statusCode: 201, body: fakeResponse });
    }).as('createPizza');

    // doldurma (fallback selector'larla)
    cy.get('[data-cy="input-name"]').type(fakeResponse.name);
    cy.get(`[data-cy="size-pill-${fakeResponse.size}"]`).click({ force: true });
    cy.get(`[data-cy="crust-pill-${fakeResponse.crust}"]`).click({ force: true });
    fillMinimumToppings();
    cy.get('[data-cy="qty-increase"]').click({ force: true }); // quantity -> 2

    cy.get('[data-cy="submit-order"]').should('not.be.disabled').click();

    cy.wait('@createPizza').its('request.body').should((body) => {
      expect(body.name).to.equal(fakeResponse.name);
      expect(body.size).to.equal(fakeResponse.size);
      expect((body.toppings || []).length).to.be.gte(4);
    });

    cy.url().should('include', '/success');
    cy.contains(/SİPARİŞİN ALINDI|SİPARİŞ/).should('be.visible');
    // Success page doesn't display id by default; check product name and totals
    cy.contains('Position Absolute Acı Pizza').should('be.visible');
  });

  it('Ağ hatasında kullanıcıya hata mesajı gösteriliyor ve sayfada kalınıyor', () => {
    visitOrder();
    cy.intercept('POST', 'https://reqres.in/api/pizza', { forceNetworkError: true }).as('createFail');

    cy.get('[data-cy="input-name"]').type('Emre Ciner');
    cy.get('[data-cy="size-pill-M"]').click({ force: true });
    cy.get('[data-cy="crust-pill-İnce"]').click({ force: true });
    fillMinimumToppings();

    cy.get('[data-cy="submit-order"]').should('not.be.disabled').click();
    cy.wait('@createFail');

    // network error mesajı varsa görünsün (OrderForm displays a global form-error)
    cy.contains('Sipariş gönderilirken bir sorun oluştu').should('be.visible');
    cy.url().should('include', '/order');
  });

  it('Direct /success route shows no-order state', () => {
    cy.visit('/success');
    cy.contains(/SİPARİŞ BULUNAMADI|Sipariş Bulunamadı/i).should('exist');
    cy.get('[data-cy="success-new-order"]').click();
    cy.url().should('include','/order');
  });
});
