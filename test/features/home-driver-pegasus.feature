Feature: Home driver pegasus
    As an driver,
    I want to Home driver pegasus app.

    Background:
        Given an api token after logined command center

    Scenario: 01. Check Verify msg warning top-up balance with new driver
        Given I want to reset data login driver with data
            | platform | number    | country | fleetCode |
            | android  | 348811501 | VN      | auto      |

        And I want to logout driver app
        And I want to change server test in driver app with data
            | fleetCode |
            | auto      |
        And I want to input phone number form login with data
            | phoneNumber |
            | 348811501   |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        And I want to tap button Yes form login
        And I should open form verify code and send data
            | verifyCode |
            | 3210       |
        When I want to get message warning topup balance
        Then I should get the response message matches with language
            | response                                                                                                                                                       |
            | {"en":"You are not able to receive jobs since your balance is less than required amount: $5.00. Please top-up credit to continue receiving cash-payment jobs"} |

    Scenario: 02. Check swith status driver when don't setting license plate
        Given I want to reset data login driver with data
            | platform | number    | country | fleetCode |
            | android  | 348811503 | VN      | auto      |

        And I want to close form warning balance
        And I want to logout driver app
        And I want to input phone number form login with data
            | phoneNumber |
            | 348811503   |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        And I want to tap button Yes form login
        And I should open form verify code and send data
            | verifyCode |
            | 3210       |
        And Waiting open driver app succesfull
        When I want to swith status available driver not setup license plate
        Then I should get the response message matches with language
            | response                                                      |
            | {"en":"License plate is required before starting your work."} |

    Scenario: 03. Check turn off status driver avalidable
        Given I want to logout driver app
        And I want to input phone number form login with data
            | phoneNumber |
            | 348811502   |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        And I want to tap button Yes form login
        When I want to swith status available
        Then I should get the response message matches with language
            | response                        |
            | {"en":"Not available for jobs"} |

    Scenario: 04. Check turn on status driver avalidable
        When I want to swith status available
        Then I should get the response message matches with language
            | response                    |
            | {"en":"Accepting for jobs"} |

    Scenario: 05. Check case show banner app in driver app
        When Turn "on" setting banner pegaus in command center
        Then I want to show banner in driver

    Scenario: 06. Check case hide banner app in driver app
        When Turn "off" setting banner pegaus in command center
        Then I want to hide banner in driver

    Scenario: 07: Check case verify data gross earnings today of new driver
        When I want to get info earnings todays of driver
        Then I should get the object response message matches with
            | response                                        |
            | {"value":"$0.00","name":"Total earnings today"} |

    Scenario: 08: Check verify data gross earnings today of driver completed on booking personal card
        Given Waiting open driver app succesfull
        Given I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.type | request.vehicleTypeRequest | request.vehicleType |
            | 0            | Da Nang, Vietnam           | Da Nang, Vietnam    |

        And I want to Accepted booking
        And I want to Completed booking by CC
            | geo                                 | paymentType | total | fare  | subTotal | tax   |
            | ["108.20152830000006","16.0688582"] | 1           | 26.13 | 19.75 | 23.75    | 2.375 |

        And I want to done form completed payment
        When I want to get info earnings todays of driver
        Then I should get the object response message matches with
            | response                                         |
            | {"value":"$20.19","name":"Total earnings today"} |
        Then I should get the response message matches with language
            | response                      |
            | {"en":"Total earnings today"} |

    Scenario: 09. Check case show drive's cartype & plate number
        Given I want to reset license plate driver with data
            | platform | number    | country | fleetCode |
            | android  | 348811502 | VN      | auto      |
        When I want to get info driver's cartype and license number
        Then I should get the object response message matches with
            | response                                                      |
            | {"vehicleType":"Da Nang, Vietnam","licenseNumber":"AUTO1234"} |

    Scenario: 10. I want to open rating form
        Given Waiting open driver app succesfull
        And I want to open rating form
        When I want to get info acceptance ratings and cancellation form rating
        Then I should get the object response message matches with
            | response                                                    |
            | {"accepetance":"100%","ratings":"5.0", "cancellation":"0%"} |

    Scenario: 11. I want to change license plate driver
        Given I want to reset license plate driver with data
            | platform | number    | country | fleetCode |
            | android  | 348811502 | VN      | auto      |
        And I want to touch button OK logout app
        And I want to input phone number form login with data
            | phoneNumber |
            | 348811502   |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        And I want to tap button Yes form login
        And I should open form verify code and send data
            | verifyCode |
            | 3210       |

        Given Waiting open driver app succesfull
        And I want to open form license plate
        When I want to select the license plate "2" in list
        And I want to save setting license plate
        And I want to get info driver's cartype and license number
        Then I should get the object response message matches with
            | response                                                     |
            | {"vehicleType":"Da Nang, Vietnam","licenseNumber":"AUTO456"} |

    Scenario: 12. I want to search license plate with data response not found
        Given Waiting open driver app succesfull
        And I want to open form license plate
        When I want to search license plate with data
            | search |
            | test   |
        Then No license plate not found

    Scenario: 13. I want to search license plate with data response not found
        Given Waiting open driver app succesfull
        And I want to open form license plate
        When I want to search license plate with data
            | search |
            | 123    |
        And I want to data list license plate
        Then I should get the response message matches with language
            | response          |
            | {"en":"AUTO1234"} |
