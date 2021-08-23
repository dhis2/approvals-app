Feature: Users can view data set reports for data sets connected to a workflow

    Scenario: User views data
        Given the admin user visits the app
        Then the user has workflow "Mortality < 5 years" preselected
        When the user selects period "Februari 2021"
        And the user selects organisation unit "Badjia"
        Then a tab bar is displayed with a single tab "Mortality < 5 years"
        And a single table with data is displayed