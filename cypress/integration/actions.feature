Feature: Users can approve, accept, unapprove, and unaccept data

    Background:
        Given the admin user visits the app
        Then the user has workflow "Mortality < 5 years" preselected
        When the user selects period "Februari 2021"
        And the user selects organisation unit "Badjia"

    # These scenarios need to be executed in sequence, because the current
    # available actions depend on the previous ones.

    # In "Ready for approval" state the "Approve" action becomes available
    Scenario: User approves data
        Given the status tag indicates this data is Ready for approval
        When the user clicks the Approve button
        Then a modal confirmation dialog is displayed
        When the confirmation button is clicked
        Then a circular loader is rendered
        And the following buttons are available
            | label     | available |
            | Approve   |           |
            | Accept    | yes       |
            | Unapprove | yes       |
            | Unaccept  |           |

    # In "Approved" state the "Accept" action becomes available
    Scenario: User accepts data
        Given the status tag indicates this data is Approved
        When the user clicks the Accept button
        Then a circular loader is rendered
        And the status tag indicates this data is Ready for approval — Accepted
        And the following buttons are available
            | label     | available |
            | Approve   | yes       |
            | Accept    |           |
            | Unapprove | yes       |
            | Unaccept  | yes       |

    # In "Ready for approval — Accepted" state the "Unaccept" action becomes available
    Scenario: User unaccepts data
        Given the status tag indicates this data is Ready for approval — Accepted
        When the user clicks the Unaccept button
        Then a circular loader is rendered
        And the status tag indicates this data is Approved
        And the following buttons are available
            | label     | available |
            | Approve   |           |
            | Accept    | yes       |
            | Unapprove | yes       |
            | Unaccept  |           |

    # After unaccepting the state jumps back to "Approved" and the "Unapprove" action becomes available
    Scenario: User unapproves data
        Given the status tag indicates this data is Approved
        When the user clicks the Unapprove button
        Then a circular loader is rendered
        And the status tag indicates this data is Ready for approval
        And the following buttons are available
            | label     | available |
            | Approve   | yes       |
            | Accept    |           |
            | Unapprove |           |
            | Unaccept  |           |