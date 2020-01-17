Feature: Arrived and waiting screen
    As an driver,
    I want to check info booking driver arrived and waiting screen driver pegasus app.

    Background:
        Given an api token after logined command center

    Scenario: 01. Check case verify bookId and payment method
        # isBook if == true, bookId request match booking completed
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        When I want to get info booking and payment status DropOff
        Then I should get the object response message matches with
            | response                                  |
            | {"isBook": true, "Paymenmethod": "Cash" } |

    Scenario: 02. Check case show icon sub total
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        When I want to check show icon sub total
        Then I should get the object response message matches with
            | response               |
            | {"iconSubtotal": true} |

    Scenario: 03. Check case verify show info fare when turn on setting
        Given Setting show hide fee in subtotal on the driver app
            | airportTo | airportFrom | tollFeeActive | taxActive | tipActive |
            | true      | true        | true          | true      | true      |
        And Waiting open driver app succesfull
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        When I want to get info fare in dropoff booking
        Then I should get the object response message matches with
            | response                                                                                                                                        |
            | {"textAirportFee": true, "textTollFee": true, "textTechFee": true, "textTax": true, "textTip": true, "textPromo": true, "textmeetdriver": true} |

    Scenario: 04. Check case verify hide info fare when turn off setting
        Given Setting show hide fee in subtotal on the driver app
            | airportTo | airportFrom | tollFeeActive | taxActive | tipActive |
            | false     | false       | false         | false     | false     |
        And Waiting open driver app succesfull
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        When I want to get info fare in dropoff booking
        Then I should get the object response message matches with
            | response                                                                                                                                            |
            | {"textAirportFee": false, "textTollFee": false, "textTechFee": true, "textTax": false, "textTip": false, "textPromo": true, "textmeetdriver": true} |

    Scenario: 05. Check case verify message confirmation when touch completed booking button
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        And I want to touch button Completed booking
        When I want to get message confirmation status Completed booking
        Then I should get the response message matches with language
            | response                                                |
            | {"en":"Are you sure you want to complete the booking?"} |

    Scenario: 06. Check case verify status driver when touch button Completed booking
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        And I want to touch button Completed booking
        And I want to touch button "YES"
        And I want to get message completed booking
        Then I should get the response message matches with language
            | response                                     |
            | {"en":"The transaction has been completed."} |

    Scenario: 07. Check case verify notification update info booking by command center
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        And I want to update booking DropOff by CC
            | paymentType |
            | 2           |
        When I want to open form notification driver app
        And I want to get a content notification update booking to driver app
        Then I should get the response message matches with language
            | response                                     |
            | {"en":"has been updated by Command Center."} |

    Scenario: 08. Check case verify notification incident booking by command center
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        And I want to incident booking by CC
        When I want to open form notification driver app
        And I want to get a content notification update booking to driver app
        Then I should get the response message matches with language
            | response                                                       |
            | {"en":"has been completed without payment by Command Center."} |

    Scenario: 09. Check case verify msg incident booking by command center
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        And I want to incident booking by CC
        When I want to get message incident booking by CC
        Then I should get the response message matches with language
            | response                                                                                                |
            | {"en":"For some unexpected reasons, the booking has been completed without payment by Command Center."} |

    Scenario: 10. Check case verify show info fare when turn on setting
        Given Setting show hide fee in subtotal on the driver app
            | additionalServicesActive | rushHourActive | otherFeeActive | heavyTrafficActive |
            | true                     | true           | true           | true               |
        And Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking NOW with data
            | request.vehicleTypeRequest | request.vehicleType | request.services                                                                                              | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | [{"active":true,"fee":5,"name":"Cafe-automation","serviceId":"5db9501188570519672f40dc","type":"Compulsory"}] | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        And I want to Accepted booking
        And I want to open form Arrived and Waiting
        And I want to touch button pick-up
        And I want to touch button "YES"
        And I want to touch button Drop-off
        And I want to touch button "YES"
        And I want to touch icon subtotal
        When I want to get info fee in subtotal dropoff booking
        Then I should get the object response message matches with
            | response                                                                        |
            | {"textSurcharge": true, "textHeavy": true, "textAddl": true, "textOther": true} |

    Scenario: 11. Check case verify show info fare when turn on setting
        Given Setting show hide fee in subtotal on the driver app
            | additionalServicesActive | rushHourActive | otherFeeActive | heavyTrafficActive |
            | false                    | false          | false          | false              |
        And Waiting open driver app succesfull
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        And I want to touch icon subtotal
        When I want to get info fee in subtotal dropoff booking
        Then I should get the object response message matches with
            | response                                                                            |
            | {"textSurcharge": false, "textHeavy": false, "textAddl": false, "textOther": false} |

    Scenario: 10. Check case verify show info fare when turn off setting
        # isBook if == true, bookId request match booking completed
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        And I want to touch button Completed booking
        And I want to touch button "YES"
        When I want to get info completed booking when hide fare
        Then I should get the object response message matches with
            | response                                                                          |
            | {"isBook": true, "Paymenmethod": "", "PickUp": "textPU", "Destination": "textPO"} |

    Scenario: 13. Check case verify function SOS
        And Waiting open driver app succesfull
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
        And I want to touch button Drop-off
        And I want to touch button "YES"
        When I want to open form SOS in screen DropOff
        And I want to get info in form SOS
        Then I should get the object response message matches with
            | response                                                         |
            | {"buttonNotify":"Notify Command Center","buttonCancel":"Cancel"} |
