import '../common/index.js'
import {
    When,
    Then,
    defineParameterType,
} from 'cypress-cucumber-preprocessor/steps'

const statuses = [
    'Ready for approval',
    'Approved',
    'Ready for approval — Accepted',
]
defineParameterType({
    name: 'status',
    regexp: new RegExp(statuses.join('|')),
})

const buttonLabels = ['Approve', 'Accept', 'Unapprove', 'Unaccept']
defineParameterType({
    name: 'buttonLabel',
    regexp: new RegExp(buttonLabels.join('|')),
})

Then('the status tag indicates this data is {status}', status => {
    cy.get('[data-test="bottom-bar"]')
        .find('[data-test="dhis2-uicore-tag-text"]')
        .should('have.text', status)
})

Then('the {buttonLabel} button is visible and enabled', buttonLabel => {
    cy.get('[data-test="bottom-bar"]')
        .find('button')
        .contains(buttonLabel)
        .should('be.visible')
        .and('not.be.disabled')
})

Then('the {buttonLabel} button is not rendered', buttonLabel => {
    cy.get('[data-test="bottom-bar"]')
        .find('button')
        .contains(buttonLabel)
        .should('not.exist')
})

When('the user clicks the {buttonLabel} button', buttonLabel => {
    cy.get('[data-test="bottom-bar"]')
        .find('button')
        .contains(buttonLabel)
        .click()
})

Then('a circular loader is rendered', () => {
    cy.get('[data-test="dhis2-uicore-circularloader"]').should('be.visible')
})

Then('a modal confirmation dialog is displayed', () => {
    cy.get('[data-test="dhis2-uicore-modal"]').should('be.visible')
})

When('the confirmation button is clicked', () => {
    cy.get('[data-test="dhis2-uicore-modal"]')
        .find('button')
        .contains('Approve')
        .click()
})

Then('an alert bar is displayed with the text Approval saved', () => {
    cy.get('[data-test="dhis2-uicore-alertbar"]')
        .contains('Approval saved')
        .should('be.visible')
})
