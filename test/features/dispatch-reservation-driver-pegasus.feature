Feature: Dispatch RESERVATION to driver pegasus
    As an driver,
    I want to receive booking reservation driver pegasus app.

    Background:
        Given an api token after logined command center

    Scenario: 01. Check case driver accepetd booking mode Manual
        Given Turn on mode "Manual" dispacth setting dispacth in Command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        When I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        Then I should open Home form
        And I would to open My Trips form
        And I want to get status booking form my trips
        Then I should get the response message matches with language
            | response                       |
            | {"en":"Confirmed reservation"} |

    Scenario: 02. Check case driver accepetd booking mode Delayed auto-dispatch
        Given Turn on mode "Delay" dispacth setting dispacth in Command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        When I want to Accepted booking
        Then I would open screen On The Way

    Scenario: 03. Check case driver accepetd booking mode immediate auto-dispatch
        Given Turn on mode "Immediate" dispacth setting dispacth in Command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        When I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        Then I should open Home form
        And I would to open My Trips form
        And I want to get status booking form my trips
        Then I should get the response message matches with language
            | response                       |
            | {"en":"Confirmed reservation"} |

    Scenario: 04. Check case dispatch booking request passenger to driver
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        And I would to open My Trips form
        And I want to get status booking form my trips
        Then I should get the response message matches with language
            | response                       |
            | {"en":"Confirmed reservation"} |

    Scenario: 05. Check case dispatch booking request mDispatch to driver
        Given Waiting open driver app succesfull
        And I want to register other account from mdispatcher app
            | platform | number       | country | appType     | verifyCode | ime             | password |
            | android  | 205-555-5555 | US      | mDispatcher | 1211       | 354741079903994 | password |
        And Passenger create booking RESERVATION with data
            | dispatchType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 0            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        And I would to open My Trips form
        And I want to get status booking form my trips
        Then I should get the response message matches with language
            | response                       |
            | {"en":"Confirmed reservation"} |

    Scenario: 06. Check case message cancel booking reservation from Command Center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        And I want to cancel booking by CC
        When I want to get message cancel booking form driver app
        Then I should get the response message matches with language
            | response                                     |
            | {"en":"has been canceled by Command Center"} |

    Scenario: 07. Check case message cancel booking reservation from Passenger
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        And I want to cancel booking by Passenger
        When I want to get message cancel booking form driver app
        Then I should get the response message matches with language
            | response                               |
            | {"en":"has been canceled by customer"} |

    Scenario: 08. Check case message cancel booking reservation from mDispatcher
        Given Waiting open driver app succesfull
        And I want to register other account from mdispatcher app
            | platform | number       | country | appType     | verifyCode | ime             | password |
            | android  | 205-555-5555 | US      | mDispatcher | 1211       | 354741079903994 | password |
        And Passenger create booking RESERVATION with data
            | dispatchType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 0            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        And I want to cancel booking by mDispatcher
        When I want to get message cancel booking form driver app
        Then I should get the response message matches with language
            | response                              |
            | {"en":"has been canceled by partner"} |

    Scenario: 09. Check case completed booking reservation to Command Center with cash
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        And I want to change status booking reservation On the way
        When I want to Completed booking by CC
            | geo                                 | paymentType | total | fare  | subTotal | tax   |
            | ["108.20152830000006","16.0688582"] | 1           | 26.13 | 19.75 | 23.75    | 2.375 |
        Then I want to open form Completed booking with "Cash"
        When I want to get message completed booking
        Then I should get the response message matches with language
            | response                                                       |
            | {"en":"The transaction has been completed by Command Center."} |

    Scenario: 10. Check case completed booking reservation to Command Center with credit card
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 2                   | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        And I want to change status booking reservation On the way
        When I want to Completed booking by CC
            | geo                                 | paymentType | total | fare  | subTotal | tax   |
            | ["108.20152830000006","16.0688582"] | 1           | 26.13 | 19.75 | 23.75    | 2.375 |
        Then I want to open form Completed booking with "Credit"
        When I want to get message completed booking
        Then I should get the response message matches with language
            | response                                                       |
            | {"en":"The transaction has been completed by Command Center."} |

    Scenario: 11. Check case completed booking reservation to Command Center with apply prmotion
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 2                   | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | true        |
        And I want to change status booking reservation On the way
        When I want to Completed booking by CC
            | geo                                 | paymentType | total | fare  | subTotal | tax   | promoAmount | promoCode |
            | ["108.20152830000006","16.0688582"] | 1           | 26.13 | 19.75 | 23.75    | 2.375 | 5           | AUTO1     |
        Then I want to open form Completed booking with "Promotion"
        When I want to get message completed booking
        Then I should get the response message matches with language
            | response                                                       |
            | {"en":"The transaction has been completed by Command Center."} |
