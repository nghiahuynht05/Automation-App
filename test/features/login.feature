Feature: Login customer with phone number
    As an customer,
    I want to login in passenger app.

    Background:

    Scenario: 01. I want to search a country form login with data
        Given I want to search a country form login with data
            | countryName |
            | Togo        |

    Scenario: 02. Chech case change country phone number
        Given I want to input phonenumber with data
            | resourceId    | phoneNumber |
            | :id/editPhone | 348877457   |
