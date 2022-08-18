# Data models
All schema for the PostgreSQL databases can be referenced here.

## Packing List Microservice (Django)

### PackingList

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | serial | yes | no |
| title | string | no | no |
| owner | ForeignKey to User | no | no |
| created | date | no | no |
| departure_date | date | no | no |
| return_date | date | no | no |
| completed | boolean | no | no |
| destination_country | string | no | no |
| destination_city | string | no | no |
| origin_country | string | no | no |


### Category

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | serial | yes | no |
| name | string | yes | no |


### Condition

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | serial | yes | no |
| name | string | yes | no |


### Item

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | serial | yes | no |
| name | string | yes | no |
| category | ForeignKey to Category | no | yes |
| condition | ForeignKey to Condition | no | yes |
| suggested | boolean | no | no |


### PackingListItem

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | serial | yes | no |
| item_name | ForeignKey to Item | no | no |
| packing_list | ForeignKey to PackingList | no | no |
| owner | ForeignKey to User | no | no |
| quantity | positive integer | no | no |
| packed | boolean | no | no |


### User

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | serial | yes | no |
| username | string | yes | no |
| email | email field | yes | no |
| password | string | no | no |


## Locations Microservice (FastAPI)

### location

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | serial | yes | no |
| country | email field | yes | no |
| currency_code | string | no | no |
