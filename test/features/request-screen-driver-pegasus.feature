Feature: Request trip screen driver pegasus
    As an driver,
    I want to check info booking request trip screen driver pegasus app.

    Background:
        Given an api token after logined command center

    Scenario: 01. Check case verify info booking regular with payment type cash
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 2304       | 354741079903994 |
        When Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                             | request.destination                                                                                       |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.22290550000002, 16.0747104], "address":"Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.20999430000006, 16.0681669],"address": "Hoang Hoa Tham, Hai Chau District, Da Nang, Vietnam"} |
        And I want to receive booking screen
        When I want to get info booking in form confirm
        Then I should get the object response message matches with
            | response                                                                                                                                                                                                                                              |
            | {"pickup": "Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam", "destination": "Hoang Hoa Tham, Hai Chau District, Da Nang, Vietnam", "pickupTime": "Now", "vehicelType": "Da Nang, Vietnam", "fare": "$51.23", "payment": "Cash"} |

    Scenario: 02. Check case verify info booking hourly and avatar passenger
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550002 | US      | passenger | 2304       | 354741079903994 |
        When Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.packageRateId    | request.packageRateName | request.typeRate | request.type | hourly | request.pickup                                                                                                             | request.destination                                                                                       |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | 5da5928688570519672f38b1 | 2 hour package          | 1                | 3            | 2      | {"geo":[108.22290550000002, 16.0747104], "address":"Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.20999430000006, 16.0681669],"address": "Hoang Hoa Tham, Hai Chau District, Da Nang, Vietnam"} |

        And I want to receive booking screen
        When I want to get info booking in form confirm
        Then I should get the object response message matches with
            | response                                                                                                                                                                                                                                              |
            | {"pickup": "Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam", "destination": "Hoang Hoa Tham, Hai Chau District, Da Nang, Vietnam", "pickupTime": "Now", "vehicelType": "Da Nang, Vietnam", "fare": "$14.30", "payment": "Cash"} |

    Scenario: 03. Check case verify info booking hourly with car type hide fare before POB
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550002 | US      | passenger | 2304       | 354741079903994 |
        When Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.packageRateId    | request.packageRateName | request.typeRate | request.type | hourly | request.pickup                                                                                                             | request.destination                                                                                       |
            | SUV                        | SUV                 | 5da5928688570519672f38b1 | 2 hour package          | 1                | 3            | 2      | {"geo":[108.22290550000002, 16.0747104], "address":"Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.20999430000006, 16.0681669],"address": "Hoang Hoa Tham, Hai Chau District, Da Nang, Vietnam"} |

        And I want to receive booking screen
        When I want to get info booking in form confirm
        Then I should get the object response message matches with
            | response                                                                                                                                                                        |
            | {"pickup": "Duy Tan University, Quang Trung, Hai Chau District, Da Nang, Vietnam", "destination": "", "pickupTime": "Now", "vehicelType": "SUV", "fare": "", "payment": "Cash"} |

    Scenario: 04. Check case verify more info booking detail
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | note             | request.services                                                                                              | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | Automation notes | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to receive booking screen
        When I want to get more info booking in form confirm
        Then I should get the object response message matches with
            | response                                                                                     |
            | {"notes": "Automation Test Driver App", "flight": "HVN170", "additional": "Cafe-automation"} |

    Scenario: 05. Check case swipe down fomr booking detail
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | note             | request.services                                                                                              | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | Automation notes | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to receive booking screen
        When I want to swipe down form more info

    Scenario: 05. Check case view notification with booking cancel by passenger
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | note             | request.services                                                                                              | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | Automation notes | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to receive booking screen
        And I want to cancel booking by Passenger
        When I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                        |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by customer."} |

    Scenario: 06. Check case force open driver app when start in application 3rd
        Given Waiting open driver app succesfull
        And Open other open with data
            | appPackage       | appActivity              |
            | com.lexa.fakegps | com.lexa.fakegps.ui.Main |
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        When Passenger create booking NOW with data
            | note             | request.services                                                                                              | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | Automation notes | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to receive booking screen

    Scenario: 07. Check case force open driver app when start in application 3rd and booking cancel
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        When Passenger create booking NOW with data
            | note             | request.services                                                                                              | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | Automation notes | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to receive booking screen
        And I want to Accepted booking
        And Open other open with data
            | appPackage       | appActivity              |
            | com.lexa.fakegps | com.lexa.fakegps.ui.Main |
        When I want to cancel booking by Passenger
        And I want to get message cancel booking form driver app
        Then I should get the response message matches with language
            | response                               |
            | {"en":"has been canceled by customer"} |

    Scenario: 08. Check case view notification with booking cancel by cc
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | note             | request.services                                                                                              | request.paymentType | request.type | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.moreInfo                         |
            | Automation notes | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | 2                   | 2            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"flightInfo":{"flightNumber":"HVN170"}} |
        And I want to receive booking screen
        When I want to cancel booking by CC
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                              |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by Command Center."} |

    Scenario: 09. Check case view notification with booking cancel by mdispatcher
        Given Waiting open driver app succesfull
        And I want to register other account from mdispatcher app
            | platform | number       | country | appType     | verifyCode | ime             | password |
            | android  | 205-555-5555 | US      | mDispatcher | 1211       | 354741079903994 | password |
        And Passenger create booking NOW with data
            | dispatchType | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | 0            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to receive booking screen
        When I want to cancel booking by mDispatcher
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                       |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by partner."} |

    Scenario: 10. Check case view notification with booking cancel by web booking
        Given Waiting open driver app succesfull
        And I want to login webbooking with data
            | number     | country | password     |
            | 2055550003 | US      | passwordQup1 |
        And Create booking NOW from Webbooking with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} |
        And I want to receive booking screen
        When I want to cancel booking by Web booking
        And I want to open form notification driver app
        And I want to get a content notification cancel booking to driver app
        Then I should get the response message matches with language
            | response                                                                                                           |
            | {"en":"at [Da Nang International Airport, Hai Chau District, Da Nang, Vietnam] has been canceled by web booking."} |
