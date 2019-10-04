# Amp-Explore
**Exploratory data analysis tool for the schools of New York City**

Navigate the landscape of the NYC education system and explore the nuanced ecosystem in which our curriculum and products strive to make an impact.

## Context
This project was created during the 2019 Amplify Hackathon. 

Project Team Members:
- Yuriy Vaskevich
- Jesse Vogel

## Run Instructions
- `npm install` to populate node_modules folder
- `npm run build` to start webpack up and create a bundle for the front end, (served and watched from `frontend/dist`)
- In a new terminal tab, run `npm run serve` to start the express server, (which includes serving the front end as a static bundle from `frontend/dist`)
- Open a browser and navigate to http://localhost:9000/

## To Scrape Data
- Have the backend server running in a separate terminal tab
- In a new tab, `npm run pull`

## DoE Endpoint Documentation:
- Impact performance
    - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/impact_performance.php
    - Type: POST
    - Form data: 
        - report_year: string (only seems to work for 2018)
- Enrolment data
    - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/enrollment.php
    - Form data:
        - dbn: string
        - report_type: string (ex: EMS)
        - report_year: string (ex: 2018)
- Student Population
    - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/student_pop.php
    - Type: POST
    - Form data:
        - dbn: string
        - report_type: string (ex: EMS)
        - report_year: string (ex: 2018)
- Framework Scores
    - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/framework_scores.php
    - Type: POST
    - Form data:
        - dbn: string
        - report_type: string (ex: EMS)
        - report_year: string (ex: 2018)
- Percentile Rank
    - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/percentile_rank.php
    - POST
    - Form data:
        - dbn: string
        - report_type: string (ex: EMS)
        - report_year: string (ex: 2018)
- Student Achievement
    - TBD
    
    
     