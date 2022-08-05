After cloning the repo or deleting the database, follow these steps to get the database into working order
steps with a ( >>> ) indicate to use a terminal or CLI to input the command

1. Delete old version of database (if it exists) and create a new one (run commands from anywhere in your system)
   i) any directory >>> docker volume remove postgres-data
   ii) any directory >>> docker volume create postgres-data

2. Build and run the project with Docker (run commands from inside top level directory of project: 'packed')
   i) from packed directory >>> docker-compose build (for M1 Macs: DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build )
   ii) from packed directory >>> docker-compose up

3. Migrate and create superuser for 'packing-lists' project. (run commands from the 'packed-packing-lists' container in Docker Desktop)
   i) from 'packing-lists' container CLI >>> python manage.py makemigrations
   ii) from 'packing-lists' container CLI >>> python manage.py migrate
   iii) from 'packing-lists' container CLI >>> python manage.py createsuperuser
   iv) create a superuser for yourself to access the admin page (NOTE: an email (fake or real) is now required)

4. Populate 'packing-lists' database with essential values (these steps must be done on the browser at localhost:8005/admin)
   i) log in with your credentials
   ii) create 5 conditions named as follows: 'hot', 'moderate', 'cold', 'any', 'user'
   iii) create 4 categories named as follows: 'clothing', 'electronics', 'essentials', 'misc', 'user'
   iv) create 2 items with the following properties: 1) name: 'passport', condition: 'any', suggested: True, category: 'essentials' 2) name: 'coat', condition: 'cold', suggested: True, category: 'clothing'

LAST STEP, don't worry. 5) Populate 'locations' database (these steps must be done from the 'postgres' container in Docker Desktop)
i) refer to [countries.txt](api/locations/countries.txt) to complete this step. Start at 'REPOPULATING THE DATABASE'

At this point, you can use the website at localhost:3000. Fill out the form you are greeted with and create a packing list.
When you submit the packing list, check the console to see the data that was created in the database. You can also see it at localhost:8005/admin
