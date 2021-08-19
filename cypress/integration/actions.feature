Feature: Users can approve, accept, unapprove, and unaccept data

    Background:
        When the admin user visits the app
        Then the user has workflow "Mortality < 5 years" preselected
        When the user selects period "Februari 2021"
        And the user selects organisation unit "Badjia"

    # These scenarios need to be executed in sequence, because the current
    # available actions depend on the previous ones.

    # In "Ready for approval" state the "Approve" action becomes available
    Scenario: User approves data
        Then the status tag indicates this data is Ready for approval
        And the Approve button is visible and enabled
        When the user clicks the Approve button
        Then a modal confirmation dialog is displayed
        When the confirmation button is clicked
        Then a circular loader is rendered
        And an alert bar is displayed with the text Approval saved
        And the status tag indicates this data is Approved
        And the Approve button is not rendered
        And the Accept button is visible and enabled
        And the Unapprove button is visible and enabled
        And the Unaccept button is not rendered

    # In "Approved" state the "Accept" action becomes available
    Scenario: User accepts data
        Then the status tag indicates this data is Approved
        And the Accept button is visible and enabled
        When the user clicks the Accept button
        Then a circular loader is rendered
        And the status tag indicates this data is Ready for approval — Accepted
        And the Approve button is visible and enabled
        And the Accept button is not rendered
        And the Unapprove button is visible and enabled
        And the Unaccept button is visible and enabled

    # In "Ready for approval — Accepted" state the "Unaccept" action becomes available
    Scenario: User unaccepts data
        Then the status tag indicates this data is Ready for approval — Accepted
        And the Unaccept button is visible and enabled
        When the user clicks the Unaccept button
        Then a circular loader is rendered
        And the status tag indicates this data is Approved
        And the Approve button is not rendered
        And the Accept button is visible and enabled
        And the Unapprove button is visible and enabled
        And the Unaccept button is not rendered

    # After unaccepting the state jumps back to "Approved" and the "Unapprove" action becomes available
    Scenario: User unapproves data
        Then the status tag indicates this data is Approved
        And the Unapprove button is visible and enabled
        When the user clicks the Unapprove button
        Then a circular loader is rendered
        And the status tag indicates this data is Ready for approval
        And the Approve button is visible and enabled
        And the Accept button is not rendered
        And the Unapprove button is not rendered
        And the Unaccept button is not rendered