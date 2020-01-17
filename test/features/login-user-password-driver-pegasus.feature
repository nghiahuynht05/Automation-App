Feature: Login driver pegasus by username and password
    As an driver,
    I want to login driver pegasus app.

    Background:

    Scenario: 01. Check login username and password of driver status inactive in app
        Given Waiting open driver app succesfull
        And I want to logout driver app
        And I want to change server test in driver app with data
            | fleetCode |
            | autouser  |
        When I want to input data login form with
            | userName   | password |
            | autouser02 | password |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        And I want to get message error
        Then I should get the response message matches with language
            | response                                                                      |
            | {"en":"Your account has been deactivated. Please contact our administrator."} |

    Scenario: 02. Check login username and password of driver with password incorrect
        When I want to input data login form with
            | userName   | password  |
            | autouser01 | password1 |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        And I want to get message error
        Then I should get the response message matches with language
            | response                                                   |
            | {"en":"The username or password you entered is incorrect"} |

    Scenario: 03. Check login username and password of driver with username incorrect
        When I want to input data login form with
            | userName   | password |
            | autouser03 | password |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        And I want to get message error
        Then I should get the response message matches with language
            | response                                                                                     |
            | {"en":"This account has not been setup. Please contact our administrator for confirmation."} |

    Scenario: 04. Check case verify message when forot password
        When I want to tap forgot password
        And I want to get message forgot password
        Then I should get the response message matches with language
            | response                                                           |
            | {"en":"Please contact your fleet operator to reset your password"} |

    Scenario: 05. Check login username and password succesfull
        When I want to input data login form with
            | userName   | password |
            | autouser01 | password |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        Then I should open Home form