import '../common/index.js'
import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('a tab bar is displayed with a single tab "Mortality < 5 years"', () => {
    cy.get('[data-test="dhis2-uicore-tabbar"]').should('have.length', 1)
    cy.get('[data-test="dhis2-uicore-tab"]').should('have.length', 1)
    cy.get('[data-test="dhis2-uicore-tab"]').should(
        'have.text',
        'Mortality < 5 years'
    )
})
Then('a single table with data is displayed', () => {
    cy.get('[data-test="dhis2-uicore-datatable"]').should('have.length', 1)
})
