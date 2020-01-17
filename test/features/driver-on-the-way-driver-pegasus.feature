Feature: Driver on the way screen
    As an driver,
    I want to check info booking driver on the way screen driver pegasus app.

    Background:
        Given an api token after logined command center

    # "fare": true driver show fare
    # "fare": false driver don't show fare
    Scenario: 01. Check case verify info booking top srceen booking with setting show fare
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.promo | request.promoValue | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | AUTO1         | 5                  | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking
        When I want to get info top screen of booking status on the way
        Then I should get the object response message matches with
            | response                                                                                                                                                                                           |
            | {"pickUp": "Da Nang International Airport, Hai Chau District, Da Nang, Vietnam", "destination": "Duy Tan University, Da Nang, Vietnam","iconNavigation": true,"fare": true, "paymentType": "Cash"} |

    # Scenario: 02. Check case verify info booking top srceen booking with setting hide fare
    #     Given Waiting open driver app succesfull
    #     And I want to register other account from app
    #         | platform | number     | country | appType   | verifyCode | ime             |
    #         | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
    #     And Passenger create booking NOW with data
    #         | request.vehicleTypeRequest | request.promo | request.promoValue | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
    #         | SUV                        | AUTO1         | 5                  | SUV                 | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
    #     And I want to Accepted booking
    #     When I want to get info top screen of booking status on the way
    #     Then I should get the object response message matches with
    #         | response                                                                                                                                                                                            |
    #         | {"pickUp": "Da Nang International Airport, Hai Chau District, Da Nang, Vietnam", "destination": "Duy Tan University, Da Nang, Vietnam","iconNavigation": true,"fare": false, "paymentType": "Cash"} |

    Scenario: 03. Check case verify info when touch navagation icon
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.promo | request.promoValue | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | SUV                        | AUTO1         | 5                  | SUV                 | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking
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
        When I want to get info footer screen of booking status on the way
        Then I should get the object response message matches with
            | response                                                                                                                    |
            | {"Addititional": "Cafe-automation", "Note":"Automation Test Driver App" , "buttonCall": "Call", "buttonOnMyWay": "Arrived"} |

    Scenario: 05. Check case verify phone number passenger when touch button Call
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.services                                                                                              | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking
        When I want to touch button Call
        Then I should get the response message matches with language
            | response              |
            | {"en":"+12055550001"} |

    Scenario: 06. Check case verify info booking detail when swipe up
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                                   |
            | 2                   | 1            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170", "type":1}} |
        And I want to Accepted booking
        And I want to swipe up action open booking detail
        When I want to get info booking status Driver on the way
            | screenshoot |
            | true        |
        Then I should get the object response message matches with
            | response                                                                                                                                                      |
            | {"PsgName":"Automation Customer 01","VehicelType":"Da Nang, Vietnam","Cancel":"Cancel booking","FlightInfo":"Meet & Greet - HVN170","Service":"From airport"} |

    Scenario: 07. Check case verify info flight info with booking from airport - on curb
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                                   |
            | 2                   | 1            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170", "type":0}} |
        And I want to Accepted booking
        And I want to swipe up action open booking detail
        When I want to get info booking status Driver on the way
            | screenshoot |
            | true        |
        Then I should get the object response message matches with
            | response                                                                                                                                                 |
            | {"PsgName":"Automation Customer 01","VehicelType":"Da Nang, Vietnam","Cancel":"Cancel booking","FlightInfo":"On curb - HVN170","Service":"From airport"} |

    Scenario: 08. Check case verify info flight info with booking to airport
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.destination                                                                                                     | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to swipe up action open booking detail
        When I want to get info booking status Driver on the way
            | screenshoot |
            | true        |
        Then I should get the object response message matches with
            | response                                                                                                                                     |
            | {"PsgName":"Automation Customer 01","VehicelType":"Da Nang, Vietnam","Cancel":"Cancel booking","FlightInfo":"HVN170","Service":"To airport"} |

    Scenario: 09. Check case verify status driver when touch button Arrived
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.destination                                                                                                     | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        When I want to open form Arrived and Waiting
        And I want to get info button Arrived
        Then I should get the response message matches with language
            | response         |
            | {"en":"Pick up"} |

    Scenario: 10. Check case msg update info booking by command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to update booking by CC
            | UpdateAndDispatch |
            | false             |
        When I want to open form notification driver app
        And I want to get a content notification update booking to driver app
        Then I should get the response message matches with language
            | response                                     |
            | {"en":"has been updated by Command Center."} |

    Scenario: 11. Check case msg update and dispatch booking by command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to update booking by CC
            | UpdateAndDispatch |
            | true              |
        When I want to open form notification driver app
        And I want to get a content notification update booking to driver app
        Then I should get the response message matches with language
            | response                                     |
            | {"en":"has been updated by Command Center."} |

    Scenario: 12. Check case msg notification cancel booking by CC
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        When I want to cancel booking by CC
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                              |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by Command Center."} |

    Scenario: 13. Check case CC cancel force app when device opening 3rd party app
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And Open other open with data
            | appPackage       | appActivity              |
            | com.lexa.fakegps | com.lexa.fakegps.ui.Main |
        When I want to cancel booking by CC
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                              |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by Command Center."} |

    Scenario: 14. Check case msg notification update destination by passenger
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        When I want to update booking by Passenger with data
            | address                                                              | geo                              |
            | Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam | [108.22290550000002, 16.0747104] |
        And I want to open form notification driver app
        And I want to get a content notification update destination booking to driver app
        Then I should get the response message matches with language
            | response                                               |
            | {"en":"The destination has been changed by customer."} |

    Scenario: 15. Check case msg notification cancel by passenger
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking
        And I want to cancel booking by Passenger
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                        |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by customer."} |

    Scenario: 16. Check case msg notification update destination by mdispatcher
        Given Waiting open driver app succesfull
        And I want to register other account from mdispatcher app
            | platform | number       | country | appType     | verifyCode | ime             | password |
            | android  | 205-555-5555 | US      | mDispatcher | 1211       | 354741079903994 | password |
        And Passenger create booking NOW with data
            | dispatchType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 0            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to update booking by mDispatcher with data
            | address                                                              | geo                              |
            | Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam | [108.22290550000002, 16.0747104] |
        And I want to open form notification driver app
        And I want to get a content notification update destination booking to driver app
        Then I should get the response message matches with language
            | response                                              |
            | {"en":"The destination has been changed by partner."} |

    Scenario: 17. Check case msg notification cancel destination by mdispatcher
        Given Waiting open driver app succesfull
        And I want to register other account from mdispatcher app
            | platform | number       | country | appType     | verifyCode | ime             | password |
            | android  | 205-555-5555 | US      | mDispatcher | 1211       | 354741079903994 | password |
        And Passenger create booking NOW with data
            | dispatchType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 0            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to cancel booking by mDispatcher
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                       |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by partner."} |

    Scenario: 18. Check case view notification with booking cancel by web booking
        Given Waiting open driver app succesfull
        And I want to login webbooking with data
            | number     | country | password     |
            | 2055550003 | US      | passwordQup1 |
        And Create booking NOW from Webbooking with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking
        When I want to cancel booking by Web booking
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                           |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by web booking."} |
