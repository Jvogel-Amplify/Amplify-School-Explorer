# READ ME

## Run Instructions
- `npm install` to populate node_modules folder
- `npm run build` to start webpack and create a bundle for the front end, (served and watched from `frontend/dist`)
- In a new terminal tab run `npm run start` to start the express server, (which also serves the front end from)

- Open a browser and navigate to http://localhost:9000/

## TODOs
- Extract data from NYC Department of Education
    - Impact performance


DoE Data sources:
    - Impact performance
        - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/impact_performance.php
        - Type: POST
        - Params: 
            - report_year: string
    - Enrolment data
        - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/enrollment.php
        - params:
            - dbn: string
            - report_type: string (ex: EMS)
            - report_year: string (ex: 2018)
    - Student Population
        - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/student_pop.php
        - Type: POST
        - Params:
            - dbn: string
            - report_type: string (ex: EMS)
            - report_year: string (ex: 2018)
    - Framework Scores
        - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/framework_scores.php
        - Type: POST
        - params:
            - dbn: string
            - report_type: string (ex: EMS)
            - report_year: string (ex: 2018)
    - Percentile Rank
        - URL: https://tools.nycenet.edu/dashboard/api/data/dashboard/percentile_rank.php
        - POST
        - Params:
            - dbn: string
            - report_type: string (ex: EMS)
            - report_year: string (ex: 2018)
    - Student Achievement
        - Skipping for now...
    
    
     