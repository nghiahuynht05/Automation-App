Feature: My Trips screen
    As an driver,
    I want to check info My Trips screen driver pegasus app.

    Background:
        Given an api token after logined command center

    Scenario: 01. Check case show icon vip
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550001 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        When I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        Then I should open Home form
        And I would to open My Trips form
        When I want to get icon Vip My Trips
        Then I should get the object response message matches with
            | response          |
            | {"iconVip": true} |

    Scenario: 02. Check case hide icon vip
        Given Waiting open driver app succesfull
        And I want to register other account from app
            | platform | number     | country | appType   | verifyCode | ime             |
            | android  | 2055550002 | US      | passenger | 1211       | 354741079903994 |
        And Passenger create booking RESERVATION with data
            | request.vehicleTypeRequest | request.vehicleType | request.pickup                                                                                                          | request.destination                                                                       |
            | Da Nang, Vietnam           | Da Nang, Vietnam    | {"geo":[108.20083380000005, 16.0563276],"address":"Da Nang International Airport, Hai Chau District, Da Nang, Vietnam"} | {"geo":[108.22290550000002, 16.0747104],"address":"Duy Tan University, Da Nang, Vietnam"} |
        When I want to Accepted booking RESERVATION
            | screenshoot |
            | false       |
        Then I should open Home form
        And I would to open My Trips form
        When I want to get icon Vip My Trips
        Then I should get the object response message matches with
            | response           |
            | {"iconVip": false} |
