# ZUJ-Backend Coding Assignment

## Setup

1. Import database schema from `core/dbmodel/zuj-bca.mwb`
2. Import `Fixtures` table data from `core/dbmodel/fixtures-data.json`
3. Execute `yarn` to install modules defined in package.json

## Run Server

- Execute `yarn start` to start the backend server

## Endpoints

1. Fixtures Listing

   - Objective: To retrieve all fixtures, with option of backend pagination
   - Endpoint: `http://localhost:8181/api/fixtures/list`
   - Query Parameters\ -
     - `offset`: to offset the list of fixtures
     - `limit`: to limit the number of fixtures in response

      *The addition of query parameters is to allow the option of viewing of more fixtures if pagination is done on the backend instead of frontend

2. Fixtures Calendar
   - Objective: To retrieve dates when matches are played for frontend team to be able to only allow these dates to be clickable
   - Endpoint: `http://localhost:8181/api/fixtures/dates`
   - Body Parameters -
     - `month`: month of match dates to retrieve
     - `year`: year of match dates to retrieve
