// Usa (crea) la base de datos lagunpay
const db = db.getSiblingDB(process.env.MONGO_DATABASE);

console.log(process.env);

db.createUser({
    user: process.env.MONGO_ROOT_USERNAME,
    pwd: process.env.MONGO_ROOT_PASSWORD,
    roles: [
        {
            role: 'readWrite',
            db: process.env.MONGO_DATABASE
        }
    ]
});

db.createCollection('users', { capped: false });
db.createCollection('test', { capped: false });

db.test.insert([
  { "item": 1 },
  { "item": 2 },
  { "item": 3 },
  { "item": 4 },
  { "item": 5 }
]);

db.users.insertMany([
    {
        "username": "admin",
        "email": "admin@lagunpay.eus",
        "mobile": "666666666",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "admin",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "Alex Basurto",
        "email": "alex@lagunpay.eus",
        "mobile": "666666661",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "user",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "Jon Irueta",
        "email": "jon@lagunpay.eus",
        "mobile": "666666662",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "user",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "Mikel Urrestarazu",
        "email": "mikel@lagunpay.eus",
        "mobile": "666666663",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "user",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "Víctor Campos",
        "email": "victor@lagunpay.eus",
        "mobile": "666666664",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "user",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "David Ramos",
        "email": "david@lagunpay.eus",
        "mobile": "666666665",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "user",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "Ander Aramendi",
        "email": "ander@lagunpay.eus",
        "mobile": "666666667",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "user",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "Esther Carmona",
        "email": "ester@lagunpay.eus",
        "mobile": "666666668",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "user",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "Danel Lafuente",
        "email": "danel@lagunpay.eus",
        "mobile": "666666669",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "user",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "username": "Jesús Cabado",
        "email": "jesus@lagunpay.eus",
        "mobile": "666666660",
        "password": '$2b$10$dlVvqHBLDub/713Fjjdwp.ELesJjjOfaT7RHcvYazn7uF8M77iGTC',
        "role": "admin",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
]);