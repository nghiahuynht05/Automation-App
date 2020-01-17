Feature: Get info service booking
    As an agent,
    I want to get info service booking.

    Background:
    # Given I want to login system by username and password

    # type=0: one way, type=1: form airport, type=2: to airport, type=3:hourly, type=4: roundTrip

    # Scenario: 01. Check case get info service with booking P2P
    #     Then I want to change server test in driver app with data
    #         | fleetCode |
    #         | auto      |


    Scenario: 01. Check login driver app with phonenumber is no format phone number

    
        Given I want to input phone number form login with data
            | phoneNumber |
            | 204555000   |
        And I want to tap checkbox term of use
        And I want to tap button Accept form login
        When I want to tap button Yes form login
        And I want to get message error
        Then I should get the response message matches with language
            | response                                                                                |
            | {"en":"The number you entered doesn't appear to be valid. Please check and try again."} |