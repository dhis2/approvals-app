import {
    Given,
    Then,
    When,
    defineParameterType,
} from 'cypress-cucumber-preprocessor/steps'

Given('the admin user visits the app', () => {
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
        .contains('March 2021')
        .click()
})

When('the user selects organisation unit "Badjia"', () => {
    cy.get('[data-test="org-unit-context-select-button"]').click()

    cy.openOrgUnitNodeByName('Bo')

    cy.get('[data-test="org-unit-context-select-popover"]')
        .contains('Badjia')
        .click()
})

const statuses = [
    'Ready for approval',
    'Approved',
    'Ready for approval — Accepted',
    'Cannot be approved',
    'Waiting for lower level approval',
    'Waiting for higher level approval',
]
defineParameterType({
    name: 'status',
    regexp: new RegExp(statuses.join('|')),
})

Then('the status tag shows the approval status "{status}"', status => {
    cy.get(
        '[data-test="bottom-bar"] [data-test="dhis2-uicore-tag-text"]'
    ).should('contain.text', status)
})
