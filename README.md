# bookstore

This API is designed to provide functionalities for an online book store.

swagger documentation is in the /api route.

Every other api end points is found in /api/v1/{controller}/{endpoint}

Technologies
1. Node.js
2. Nest.js
3. Postgres database
4. RabbitMQ

End points
1. User Endpoints
  a. Crate
  b. get single user
  c. update user
  d. get all user
  e. delete user

2. Book end points
  similar with user

3. Order end point 
  similar with user but has no update end point and delete end point

RabbitMQ is used to implement order queuing in the system.