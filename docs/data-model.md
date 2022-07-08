# Data models

## Packing List Microservice

## PackingList

| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | no | no |
| owner | ForeignKey to User | no | no |
| created_date | date | no | no |
| travel_date | date | no | yes |
| completed | boolean | no | no |


## Category

| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | yes | no |


## Item

| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | yes | no |
| category | ForeignKey to Category | no | no |


## PackingListItem

| Name | Type | Unique | Optional |
|-|-|-|-|
| item | ForeignKey to Item | no | no |
| packing_list | ForeignKey to PackingList | no | no |
| quantity | positive integer | no | no |
| packed | boolean | no | no |



## User Microservice

## User

| Name | Type | Unique | Optional |
|-|-|-|-|
| username | string | yes | no |
| email | email field | yes | no |
| password | string | no | no |
