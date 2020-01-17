Feature: Confirmed reservation screen
    As an driver,
    I want to check info booking reservation screen driver pegasus app.

    Background:
        Given an api token after logined command center

    Scenario: 01. Check case verify info booking top srceen booking
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to open booking detail to My trips
        When I want to get info book top screen
        Then I should get the object response message matches with
            | response                                                                                                                                                                                           |
            | {"pickUp": "Da Nang International Airport, Hai Chau District, Da Nang, Vietnam", "destination": "Duy Tan University, Da Nang, Vietnam","iconNavigation": true,"fare": true, "paymentType": "Cash"} |

    Scenario: 02. Check case verify info booking footer srceen booking
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.services                                                                                              | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to open booking detail to My trips
        When I want to get info book footer screen
        Then I should get the object response message matches with
            | response                                                                                               |
            | {"Addititional": "Cafe-automation", "Note": "Automation Test Driver App","buttonOnMyWay": "On my way"} |

    Scenario: 03. Check case verify info booking details
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.services                                                                                              | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to open booking detail to My trips
        And I want to swipe up action open booking detail
        When I want to get info booking details
            | screenshoot |
            | true        |
        Then I should get the object response message matches with
            | response                                                                                                                                                      |
            | {"PsgName": "Automation Customer 01", "VehicelType": "Da Nang, Vietnam", "CallOperator": "Call", "Cancel": "Cancel booking", "FlightInfo": "", "Service": ""} |

    Scenario: 04. Check case verify call operator
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.services                                                                                              | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to open booking detail to My trips
        And I want to swipe up action open booking detail
        When I want to touch acctions Call from booking details
        Then I should get the response message matches with language
            | response              |
            | {"en":"+12055550001"} |

    Scenario: 05. Check case verify flight info with booking from airport - On curb
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                                   |
            | 2                   | 1            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170", "type":0}} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to open booking detail to My trips
        And I want to swipe up action open booking detail
        When I want to get info booking details
            | screenshoot |
            | true        |
        Then I should get the object response message matches with
            | response                                                                                                                                                                                  |
            | {"PsgName": "Automation Customer 01", "VehicelType": "Da Nang, Vietnam", "CallOperator": "Call", "Cancel": "Cancel booking", "FlightInfo": "On curb - HVN170", "Service": "From airport"} |

    Scenario: 06. Check case verify flight info with booking from airport - Meet & Greet
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                                   |
            | 2                   | 1            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170", "type":1}} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to open booking detail to My trips
        And I want to swipe up action open booking detail
        When I want to get info booking details
            | screenshoot |
            | true        |
        Then I should get the object response message matches with
            | response                                                                                                                                                                                       |
            | {"PsgName": "Automation Customer 01", "VehicelType": "Da Nang, Vietnam", "CallOperator": "Call", "Cancel": "Cancel booking", "FlightInfo": "Meet & Greet - HVN170", "Service": "From airport"} |

    Scenario: 07. Check case verify flight info with booking to airport
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.destination                                                                                                     | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to open booking detail to My trips
        And I want to swipe up action open booking detail
        When I want to get info booking details
            | screenshoot |
            | true        |
        Then I should get the object response message matches with
            | response                                                                                                                                                                      |
            | {"PsgName": "Automation Customer 01", "VehicelType": "Da Nang, Vietnam", "CallOperator": "Call", "Cancel": "Cancel booking", "FlightInfo": "HVN170", "Service": "To airport"} |

    Scenario: 08. Check case msg update info booking by command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to update booking by CC
            | UpdateAndDispatch |
            | false             |
        When I want to open form notification driver app
        And I want to get a content notification update booking to driver app
        Then I should get the response message matches with language
            | response                                     |
            | {"en":"has been updated by Command Center."} |

    Scenario: 09. Check case msg update and dispatch booking by command center
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to update booking by CC
            | UpdateAndDispatch |
            | true              |
        When I want to open form notification driver app
        And I want to get a content notification update booking to driver app
        Then I should get the response message matches with language
            | response                                     |
            | {"en":"has been updated by Command Center."} |

    Scenario: 10. Check case msg notification cancel booking by CC
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        When I want to cancel booking by CC
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                              |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by Command Center."} |

    Scenario: 11. Check case CC cancel force app when device opening 3rd party app
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And Open other open with data
            | appPackage       | appActivity              |
            | com.lexa.fakegps | com.lexa.fakegps.ui.Main |
        When I want to cancel booking by CC
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                              |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by Command Center."} |

    Scenario: 12. Check case msg notification update destination by passenger
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        When I want to update booking by Passenger with data
            | address                                                              | geo                              |
            | Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam | [108.22290550000002, 16.0747104] |
        And I want to open form notification driver app
        And I want to get a content notification update destination booking to driver app
        Then I should get the response message matches with language
            | response                                               |
            | {"en":"The destination has been changed by customer."} |

    Scenario: 13. Check case msg notification cancel by passenger
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to cancel booking by Passenger
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                        |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by customer."} |

    Scenario: 14. Check case msg notification update destination by mdispatcher
        Given Waiting open driver app succesfull
        And I want to register other account from mdispatcher app
            | platform | number       | country | appType     | verifyCode | ime             | password |
            | android  | 205-555-5555 | US      | mDispatcher | 1211       | 354741079903994 | password |
        And Passenger create booking RESERVATION with data
            | dispatchType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 0            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to update booking by mDispatcher with data
            | address                                                              | geo                              |
            | Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam | [108.22290550000002, 16.0747104] |
        And I want to open form notification driver app
        And I want to get a content notification update destination booking to driver app
        Then I should get the response message matches with language
            | response                                              |
            | {"en":"The destination has been changed by partner."} |

    Scenario: 15. Check case msg notification cancel destination by mdispatcher
        Given Waiting open driver app succesfull
        And I want to register other account from mdispatcher app
            | platform | number       | country | appType     | verifyCode | ime             | password |
            | android  | 205-555-5555 | US      | mDispatcher | 1211       | 354741079903994 | password |
        And Passenger create booking RESERVATION with data
            | dispatchType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 0            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        And I want to cancel booking by mDispatcher
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                       |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by partner."} |

    Scenario: 16. Check case view notification with booking cancel by web booking
        Given Waiting open driver app succesfull
        And I want to login webbooking with data
            | number     | country | password     |
            | 2055550003 | US      | passwordQup1 |
        And Create booking RESERVATION from Webbooking with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        When I want to cancel booking by Web booking
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                           |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by web booking."} |
