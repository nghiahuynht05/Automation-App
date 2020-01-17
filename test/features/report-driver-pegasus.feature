Feature: Report screen
    As an driver,
    I want to check info Report screen driver pegasus app.

    Background:

    Scenario: 01. Check case view datepicker by this weekly
        Given Waiting open driver app succesfull
        And I want to open Report screen
        And I want to open Calendar form
        When I want to select "Weekly" range
        Then I want to show report by this weekly

    Scenario: 02. Check case view earning area form
        Given Waiting open driver app succesfull
        And I want to open Report screen
        Then I want to open Earning form
        And I want to get info in Earning form
        Then I should get the object response message matches with
            | response                                                                                                                                                                                                                                                                                                                                                           |
            | {"TotalRide": "Total rides", "TotalRidePayment": "Total ride payments", "TipsOnBoard": "Tips on board", "CashReceived": "Cash received", "DriverDeductions": "Driver deductions", "NetEarnings": "Net earnings", "GrossEarnings": "Gross earnings", "ReferralEarning": "Referral earnings", "TipsAfterRide": "Tips after ride", "TotalEarning": "Total earnings" } |

    Scenario: 03. Check case view tootip earning area form
        Given Waiting open driver app succesfull
        And I want to open Report screen
        And I want to open Earning form
        Then I want to open form tooltip info Earning form
        And I want to get info in tooltip Earning form
        Then I should get the object response message matches with
            | response                                                                                                                                                                                                                                                    |
            | {"NetEarnings": "Net earnings: Money you earned after returning all fees to fleet.", "GrossEarnings": "Gross earnings: Money you earned from booking fare & tips.", "ReferralEarning": "Referral earnings: Money you earned via driver incentive program."} |

    Scenario: 03. Check case view datepicker by this monthly
        Given Waiting open driver app succesfull
        And I want to open Report screen
        And I want to open Calendar form
        When I want to select "Monthly" range
        Then I want to show report by this month
