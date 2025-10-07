/// <reference types="cypress" />

describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message').type("Hello World");
    cy.get('[data-cy="contact-input-name').type("John Doe");

    cy.get('[data-cy="contact-btn-submit').then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });

    cy.get('[data-cy="contact-input-email').type("john@example.com{enter}");
    // cy.get('[data-cy="contact-btn-submit')
    //   .contains("Send Message")
    //   .should("not.have.attr", "disabled");

    cy.get('[data-cy="contact-btn-submit').as("submitBtn");
    // cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about");

    cy.get('[data-cy="contact-btn-submit').click();
    cy.get('[data-cy="contact-btn-submit').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });

    cy.get('[data-cy="contact-input-message"]').as("msgInput");
    cy.get("@msgInput").focus().blur();
    cy.get("@msgInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    // Funciona bien en Cypress Open pero no con Cypress Run
    // .then((el) => {
    //   expect(el.attr("class")).to.contains("invalid");
    // });

    cy.get('[data-cy="contact-input-name"]').as("nameInput");
    cy.get("@nameInput").focus().blur();
    cy.get("@nameInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.get('[data-cy="contact-input-email"]').as("emailInput");
    cy.get("@emailInput").focus().blur();
    cy.get("@emailInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
  });
});
