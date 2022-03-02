describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Click on add button in the second appt
    cy.get("[alt=Add]").first().click();

    // Enter name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Choose interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // Click save button
    cy.contains("Save").click();

    // See changed booked appt
    cy.contains(".appointment__card--show", "Lydia Miller-Jones").contains(
      ".appointment__card--show",
      "Sylvia Palmer"
    );
  });

  it("should edit an interview", () => {
    // Select edit button
    cy.get("[alt=Edit]").first().click({ force: true });

    // Change name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    // Change interviewer
    cy.get("[alt='Tori Malcolm']").click();

    // Save edits
    cy.contains("Save").click();

    // Confirm changes
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Click delete button
    cy.get("[alt=Delete]").click({ force: true });

    // Click Confirm button
    cy.contains("Confirm").click();

    // Confirm Deleting indicator is showing
    cy.contains("DELETE").should("exist");

    // Confirm Deleting indicator does NOT exist
    cy.contains("DELETE").should("not.exist");

    // Confirm appointment card with text "Archie Cohen" does not exist
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
