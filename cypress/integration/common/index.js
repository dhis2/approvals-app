import { Then, When } from 'cypress-cucumber-preprocessor/steps'

When('the admin user visits the app', () => {
    cy.visit('/')
})

Then('the user has workflow "Mortality < 5 years" preselected', () => {
    cy.get('[data-test="workflow-context-select-button"]')
        .find('[data-test="value"]')
        .should('have.text', 'Mortality < 5 years')
})

When('the user selects period "Februari 2021"', () => {
    cy.get('[data-test="period-context-select-button"]').click()
    cy.get('[data-test="period-context-select-popover"]')
        .contains('February 2021')
        .click()
})

const openOrgUnitNode = orgUnitName =>
    cy
        .get('[data-test="org-unit-context-select-popover"]')
        .contains(orgUnitName)
        .closest('.node')
        .find('[data-test="dhis2-uiwidgets-orgunittree-node-toggle"]')
        .click()

When('the user selects organisation unit "Badjia"', () => {
    cy.get('[data-test="org-unit-context-select-button"]').click()

    openOrgUnitNode('Sierra Leone')
    openOrgUnitNode('Bo')

    cy.get('[data-test="org-unit-context-select-popover"]')
        .contains('Badjia')
        .click()
})
