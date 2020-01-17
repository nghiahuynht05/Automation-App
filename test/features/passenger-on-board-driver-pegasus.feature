Feature: Passenger on board screen
    As an driver,
    I want to check info booking driver passenger on board screen driver pegasus app.

    Background:
        Given an api token after logined command center

    Scenario: 01. Check case verify info booking top srceen booking with setting show fare and edit destination
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        When I want to get info top screen of booking status POB
        Then I should get the object response message matches with
            | response                                                                                                                              |
            | {"destination": "Duy Tan University, Da Nang, Vietnam", "iconEdit":true, "iconNavigation": true, "fare": true, "paymentType": "Cash"} |

    # Scenario: 02. Check case verify info booking top srceen booking with setting hide fare and not edit destination
    #     Given Waiting open driver app succesfull
    #     And I want to register other account from app
    #         | platform | number     | country | appType   | verifyCode | ime             |
    #         | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
    #     And Passenger create booking NOW with data
    #         | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
    #         | SUV                        | SUV                 | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
    #     And I want to Accepted booking
    #     And I want to open form Arrived and Waiting
    #     And I want to touch button pick-up
    #     And I want to touch button "YES"
    #     When I want to get info top screen of booking status POB
    #     Then I should get the object response message matches with
    #         | response                                                                                                                                |
    #         | {"destination": "Duy Tan University, Da Nang, Vietnam", "iconEdit":false, "iconNavigation": true, "fare": false, "paymentType": "Cash"} |

    Scenario: 03. Check case verify info when touch navagation icon
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | SUV                        | SUV                 | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        When I want to open form navigation map
        And I want to get info form navigation map
        Then I should get the object response message matches with
            | response                                              |
            | {"buttonMap": "Google Map", "buttonCancel": "Cancel"} |

    Scenario: 04. Check case verify info booking footer srceen booking
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.services                                                                                              | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        When I want to get info footer screen of booking status POB
        Then I should get the object response message matches with
            | response                                                                                               |
            | {"Addititional": "Cafe-automation", "Note":"Automation Test Driver App" , "buttonOnMyWay": "Drop off"} |

    Scenario: 05. Check case verify info booking detail when swipe up
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                                   |
            | 2                   | 1            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170", "type":1}} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        And I want to swipe up action open booking detail
        When I want to get info booking status POB
            | screenshoot |
            | true        |
        Then I should get the object response message matches with
            | response                                                                                                                            |
            | {"PsgName":"Automation Customer 01","VehicelType":"Da Nang, Vietnam","FlightInfo":"Meet & Greet - HVN170","Service":"From airport"} |

    Scenario: 06. Check case verify info flight info with booking from airport - on curb
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                                   |
            | 2                   | 1            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170", "type":0}} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        And I want to swipe up action open booking detail
        When I want to get info booking status POB
            | screenshoot |
            | true        |
        Then I should get the object response message matches with
            | response                                                                                                                       |
            | {"PsgName":"Automation Customer 01","VehicelType":"Da Nang, Vietnam","FlightInfo":"On curb - HVN170","Service":"From airport"} |

    Scenario: 07. Check case verify content popup confirmation when touch button PickUp
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.destination                                                                                                     | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        And I want to touch button Drop-off
        And I want to get message confirmation status Drop-off
        Then I should get the response message matches with language
            | response                                          |
            | {"en":"Confirm drop-off Automation Customer 01?"} |

    Scenario: 08. Check case verify status drver when touch button PickUp
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.destination                                                                                                     | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        And I want to touch button Drop-off
        And I want to touch button "YES"
        And I want to get info button Drop-off
        Then I should get the response message matches with language
            | response                       |
            | {"en":"Complete with payment"} |

    Scenario: 09. Check case verify notification update info booking by command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        And I want to update booking POB by CC
            | paymentType |
            | 2           |
        When I want to open form notification driver app
        And I want to get a content notification update booking to driver app
        Then I should get the response message matches with language
            | response                                     |
            | {"en":"has been updated by Command Center."} |

    Scenario: 10. Check case verify notification incident booking by command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        And I want to incident booking by CC
        When I want to open form notification driver app
        And I want to get a content notification update booking to driver app
        Then I should get the response message matches with language
            | response                                                       |
            | {"en":"has been completed without payment by Command Center."} |

    Scenario: 11. Check case verify msg incident booking by command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        And I want to incident booking by CC
        When I want to get message incident booking by CC
        Then I should get the response message matches with language
            | response                                                                                                |
            | {"en":"For some unexpected reasons, the booking has been completed without payment by Command Center."} |

    Scenario: 12. Check case verify msg comleted booking by command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        When I want to Completed booking by CC
            | geo                                 | paymentType | total | fare  | subTotal | tax   |
            | ["108.20152830000006","16.0688582"] | 1           | 26.13 | 19.75 | 23.75    | 2.375 |
        And I want to get message completed booking
        Then I should get the response message matches with language
            | response                                                       |
            | {"en":"The transaction has been completed by Command Center."} |

    Scenario: 13. Check case verify screen driver when completed booking by CC
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        When I want to Completed booking by CC
            | geo                                 | paymentType | total | fare  | subTotal | tax   |
            | ["108.20152830000006","16.0688582"] | 1           | 26.13 | 19.75 | 23.75    | 2.375 |
        Then I want to open form Completed booking with "Cash"

    Scenario: 14. Check case verify SOS
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        When I want to open form SOS in screen POB
        And I want to get info in form SOS
        Then I should get the object response message matches with
            | response                                                         |
            | {"buttonNotify":"Notify Command Center","buttonCancel":"Cancel"} |
