Feature: More screen
    As an driver,
    I want to check info More screen driver pegasus app.

    Background:
        Given an api token after logined command center

    # Scenario: 01. Check hide menu Refarral on More srceen
    #     Given Turn "off" setting referral in command center
    #     And Waiting open driver app succesfull
    #     And I want to open More screen
    #     When I want to get info menu on More screen
    #     Then I should get the object response message matches with
    #         | response                                                                                               |
    #         | {"Notification": true, "Wallet":true, "Referral":false, "Emergency":true,"Settings":true,"About":true} |

    # Scenario: 02. Check info view More screen
    #     Given Turn "on" setting referral in command center
    #     And Waiting open driver app succesfull
    #     And I want to open More screen
    #     When I want to get info menu on More screen
    #     Then I should get the object response message matches with
    #         | response                                                                                              |
    #         | {"Notification": true, "Wallet":true, "Referral":true, "Emergency":true,"Settings":true,"About":true} |

    # Scenario: 03. Check info view profile screen
    #     Given Waiting open driver app succesfull
    #     And I want to open More screen
    #     And I want to open Profile screen
    #     When I want to get info Profile driver
    #     Then I should get the object response message matches with
    #         | response                                                                                                                                                        |
    #         | {"DriverName": "Driver Autimation 02", "Rating":"5.0", "Phone":"+84348811502", "Email":"qa.qupworld@gmail.com","NationalIC":"123456789","Address":"hoang dieu"} |

    # Scenario: 04. Check view form edit avatar with setting turn on
    #     Given Waiting open driver app succesfull
    #     And I want to open More screen
    #     And I want to open Profile screen
    #     When I want to touch Avatar icon on Profile screen
    #     And I want to get info form update image
    #     Then I should get the object response message matches with
    #         | response                                                 |
    #         | {"TakePhoto": true, "ChoosePhoto": true, "Cancel": true} |

    # Scenario: 05. Check case open referral menu
    #     Given Waiting open driver app succesfull
    #     And I want to open More screen
    #     And I want to open Referral screen
    #     And I want to get info Title screen
    #         | response                  |
    #         | {"textTitle": "Referral"} |

    Scenario: 06. Check case view confirmation form share referral
        Given Waiting open driver app succesfull
        And I want to logout driver app
        And I want to input phone number form login with data
            | phoneNumber |
            | 348811501   |
        And I want to open More screen
        And I want to open Referral screen
        Then I should get the response message matches with language
            | response                                                                                                                    |
            | {"en":"Are you sure you want to send FVCUXJPT code to your friends? After sending, you are not allowed to edit this code."} |
