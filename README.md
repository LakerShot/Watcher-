# Watcher

It's a mini customer relationship management sistem for small businesses.
# How to use it ?
 - Create a file `.env` at the root of the project
 - Go to [MongoDB](https://www.mongodb.com/) -> Сreate MongoDB Cluster -> Connect your application -> Copy connection string
 - Add your connection string into your `.env` file
 - Come up a secret key for JWT and past it down below

 ```
.env file

MONGO_DB_URL=COPIED_CONNECTION_STRING
JWT=YOUR_SECRET_KEY

```
 - Create a `uploads` folder at the root of the project (in order to upload images and give them to the client)
- In order to run this project open terminal and run command ```npm run dev```

---
### That's all :D



