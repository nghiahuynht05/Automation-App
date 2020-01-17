Feature: Login driver pegasus by phone and password
    As an driver,
    I want to login driver pegasus app.

    Background:

    Scenario: 01. Check login phone and password of driver status inactive in app
        Given Waiting open driver app succesfull
        And I want to logout driver app
        And I want to change server test in driver app with data
            | fleetCode |
            | autophone |
        And I want to input phone number form login with data
            | phoneNumber | password |
            | 348811001   | password |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        When I want to tap button Yes form login
        And I want to get message error
        Then I should get the response message matches with language
            | response                                                                      |
            | {"en":"Your account has been deactivated. Please contact our administrator."} |

    Scenario: 02. Check login phone and password of driver with password incorrect
        Given I want to input phone number form login with data
            | phoneNumber | password  |
            | 348811001   | password1 |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        When I want to tap button Yes form login
        And I want to get message error login
        Then I should get the response message matches with language
            | response                                                        |
            | {"en":"The phone number or password you entered is incorrect."} |

    Scenario: 03. Check login phone and password of driver with phone incorrect
        Given I want to input phone number form login with data
            | phoneNumber | password |
            | 348811003   | password |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        When I want to tap button Yes form login
        And I want to get message error
        Then I should get the response message matches with language
            | response                                                                                     |
            | {"en":"This account has not been setup. Please contact our administrator for confirmation."} |

    Scenario: 04. Check case verify message when forot password not input phonenumber
        Given I want to clear data phonenumber in login form
        When I want to tap forgot password
        And I want to get message forgot password
        Then I should get the response message matches with language
            | response                                                                       |
            | {"en":"Please enter your phone number and we will SMS you your new password."} |

    Scenario: 05. Check case verify message when forot password: turn on SMS verifycation
        Given I want to input phone number form login with data
            | phoneNumber |
            | 348811003   |
        When I want to tap forgot password
        And I want to get message forgot password
        Then I should get the response message matches with language
            | response                                                        |
            | {"en":"Are you sure you want us to SMS you your new password?"} |

    Scenario: 06. Check case login driver app when input verifi code invalidate
        Given I want to reset data login driver with data
            | platform | number    | country | fleetCode |
            | android  | 348811002 | VN      | autophone |
        And I want to clear data phonenumber in login form

        And I want to input phone number form login with data
            | phoneNumber | password |
            | 348811002   | password |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        When I want to tap button Yes form login
        And I should open form verify code and send data
            | verifyCode |
            | 1111       |
        And I want to get message error
        Then I should get the response message matches with language
            | response                         |
            | {"en":"Invalid validation code"} |

    Scenario: 7. Check case login driver app successfull
        Given I want to reset data login driver with data
            | platform | number    | country | fleetCode |
            | android  | 348811002 | VN      | autophone |

        And I want to input phone number form login with data
            | phoneNumber | password |
            | 348811002   | password |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        When I want to tap button Yes form login
        And I should open form verify code and send data
            | verifyCode |
            | 3210       |
        Then I should open Home form

    Scenario: 08. Check view form edit avatar with setting turn off
        Given Waiting open driver app succesfull
        And I want to open More screen
        And I want to open Profile screen
        When I want to touch Avatar icon on Profile screen
        And I want to get info form update image
        Then I should get the object response message matches with
            | response                                                 |
            | {"TakePhoto": true, "ChoosePhoto": true, "Cancel": true} |
