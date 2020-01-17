Feature: Dispatch NOW to driver pegasus
    As an driver,
    I want to receive booking driver pegasus app.

    Background:
        Given an api token after logined command center

    Scenario: 01. Check case dispatch to driver with status available
        Given I want to logout driver app
        And I want to change server test in driver app with data
            | fleetCode |
            | auto      |
        And I want to input phone number form login with data
            | phoneNumber |
            | 348811502   |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        And I want to tap button Yes form login
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        When Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType |
            | Da Nang, Vietnam           | Da Nang, Vietnam    |
        Then I want to receive booking screen

    Scenario: 02. Check case dispatch to driver with status not available
        And Waiting open driver app succesfull
        And I want to swith status available
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        When Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType |
            | Da Nang, Vietnam           | Da Nang, Vietnam    |
        Then I want to receive not booking screen

    Scenario: 03. Check case dispatch to driver with status available but screen is lock
        Given Waiting open driver app succesfull
        And I want to swith status available
        And I want to lock srceen device
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        When Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType |
            | Da Nang, Vietnam           | Da Nang, Vietnam    |
        Then I want to receive booking screen

    Scenario: 04. Check case dispatch to driver with status available but driver app is background on driver
        Given Waiting open driver app succesfull
        And I want to background driver app on device
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        When Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType |
            | Da Nang, Vietnam           | Da Nang, Vietnam    |
        Then I want to receive booking screen

    Scenario: 05. Check case verify service hourly of booking
        And Waiting open driver app succesfull
        Given I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.packageRateId    | request.packageRateName | request.typeRate | request.type | hourly |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | 5da5928688570519672f38b1 | 2 hour package          | 1                | 3            | 2      |
        When I want to get servic "hourly-rate" in form confirm
        Then I should get the response message matches with language
            | response                |
            | {"en":"2 hour package"} |

    Scenario: 06. Check case verify service round trip of booking
        And Waiting open driver app succesfull
        Given I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.destination                             | request.typeRate | request.type | hourly |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.23659449206548,16.066651717302502]} | 2                | 4            | 0      |
        When I want to get servic "round-trip" in form confirm
        Then I should get the response message matches with language
            | response            |
            | {"en":"Round Trip"} |

    Scenario: 07. Check case verify service To airport of booking
        And Waiting open driver app succesfull
        Given I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.typeRate | request.type |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | 0                | 2            |
        When I want to get servic "to-airport" in form confirm
        Then I should get the response message matches with language
            | response            |
            | {"en":"To airport"} |

    Scenario: 08. Check case verify service From airport of booking
        And Waiting open driver app succesfull
        Given I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.destination                                                                                                     | request.typeRate | request.type |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | 0                | 1            |
        When I want to get servic "from-aiport" in form confirm
        Then I should get the response message matches with language
            | response              |
            | {"en":"From airport"} |

    Scenario: 09. Check case dispatch booking reservation to driver when driver status not available
        And Waiting open driver app succesfull
        And I want to swith status available
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        When Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        Then I want to receive booking screen

    Scenario: 10. Check case open screen On the way when accepted booking
        And Waiting open driver app succesfull
        And I want to swith status available
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        When I want to Accepted booking
        Then I would open screen On The Way

    Scenario: 11. Check case message cancel booking from Command Center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to cancel booking by CC
        When I want to get message cancel booking form driver app
        Then I should get the response message matches with language
            | response                                     |
            | {"en":"has been canceled by Command Center"} |

    Scenario: 12. Check case message cancel booking from Passenger
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to cancel booking by Passenger
        When I want to get message cancel booking form driver app
        Then I should get the response message matches with language
            | response                               |
            | {"en":"has been canceled by customer"} |

    Scenario: 13. Check case message cancel booking from mDispatcher
        And Waiting open driver app succesfull
        And I want to register other account from mdispatcher app
            | platform | number       | country | appType     | verifyCode | ime             | password |
            | android  | 205-555-5555 | US      | mDispatcher | 1211       | 354741079903994 | password |
        And Passenger create booking NOW with data
            | dispatchType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 0            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to cancel booking by mDispatcher
        When I want to get message cancel booking form driver app
        Then I should get the response message matches with language
            | response                              |
            | {"en":"has been canceled by partner"} |

    Scenario: 14. Check case no show booking
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to open form confirm no show booking
        When I want to click "Yes" button to do no show booking
        Then I should open Home form

    Scenario: 15. Check case driver cancel booking when no driver's accepeted booking
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to view more booking info
        And I want to open form confirm cancel booking by driver
        When I want to click "Yes" button to do no cancel booking
        And I want to get massenge confirm pop cancel booking
        Then I should get the response message matches with language
            | response                                                                                                                  |
            | {"en":"you canceled has not been accepted by any driver. Would you like to call the Command Center or continue the ride"} |

    Scenario: 16. Check case completed booking to Command Center with cash
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        When I want to Completed booking by CC
            | geo                                 | paymentType | total | fare  | subTotal | tax   |
            | ["108.20152830000006","16.0688582"] | 1           | 26.13 | 19.75 | 23.75    | 2.375 |
        Then I want to open form Completed booking with "Cash"
        When I want to get message completed booking
        Then I should get the response message matches with language
            | response                                                       |
            | {"en":"The transaction has been completed by Command Center."} |

    Scenario: 17. Check case completed booking to Command Center with credit card
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 2                   | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        When I want to Completed booking by CC
            | geo                                 | paymentType | total | fare  | subTotal | tax   |
            | ["108.20152830000006","16.0688582"] | 1           | 26.13 | 19.75 | 23.75    | 2.375 |
        Then I want to open form Completed booking with "Credit"
        When I want to get message completed booking
        Then I should get the response message matches with language
            | response                                                       |
            | {"en":"The transaction has been completed by Command Center."} |

    Scenario: 18. Check case completed booking to Command Center with apply prmotion
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 2                   | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        When I want to Completed booking by CC
            | geo                                 | paymentType | total | fare  | subTotal | tax   | promoAmount | promoCode |
            | ["108.20152830000006","16.0688582"] | 1           | 26.13 | 19.75 | 23.75    | 2.375 | 5           | AUTO1     |
        Then I want to open form Completed booking with "Promotion"
        When I want to get message completed booking
        Then I should get the response message matches with language
            | response                                                       |
            | {"en":"The transaction has been completed by Command Center."} |

    Scenario: 19. Check case accepeted booking from airport and setting meet and greet rate
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                                   |
            | 2                   | 1            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170", "type":0}} |
        And I want to Accepted booking
        And I want to view more booking info
        When I want to get info airport booking
        Then I should get the object response message matches with
            | response                                                    |
            | {"typeRate":"From airport","flightInfo":"On curb - HVN170"} |

    Scenario: 20. Check case accepeted booking from airport and setting meet & greet rate
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                                   |
            | 2                   | 1            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170", "type":1}} |
        And I want to Accepted booking
        And I want to view more booking info
        When I want to get info airport booking
        Then I should get the object response message matches with
            | response                                                         |
            | {"typeRate":"From airport","flightInfo":"Meet & Greet - HVN170"} |

    Scenario: 21. Check case accepeted booking to airport
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to view more booking info
        When I want to get info airport booking
        Then I should get the object response message matches with
            | response                                        |
            | {"typeRate":"To airport","flightInfo":"HVN170"} |

    Scenario: 22. Check case create booking car-hailing
        And Waiting open driver app succesfull
        And I want to start booking car-hailing
        And I want to view more booking info
        When I want to get info customer in booking
        Then I should get the object response message matches with
            | response              |
            | {"namePsg":"No name"} |
        And I want to incident booking by CC