require('../config/db.config')

const User = require('../models/user.model')
const Depart = require('../models/depart.model')
const Category = require('../models/category.model')

User.deleteMany({})
        .then(() => Depart.deleteMany({}))
        .then(() => {
            const Depart1 = new Depart({
                name: "Accounts and Finance"
            })
            Depart1.save();

            const Depart2 = new Depart({
                name: "HR"
            })
            Depart2.save();

            const Depart3 = new Depart({
                name: "Research and development"
            })
            Depart3.save()
            .then(() => {
                const u2 = new User({
                    fullname: "Francisco",
                    email: "francisco@gmail.com",
                    password: "francisco", 
                    avatar: "",
                    departamento: Depart3._id,
                    admin: false,
                    validated: false
                }) 
                u2.save();

                const u3 = new User({
                    fullname: "Julio",
                    email: "julio@gmail.com",
                    password: "juliog", 
                    avatar: "",
                    departamento: Depart3._id,
                    admin: false,
                    validated: false
                }) 
                u3.save();
            });

            const Depart4 = new Depart({
                name: "IT services"
            })
            Depart4.save()
            .then(() => {
                const u1 = new User({
                    fullname: "admin",
                    email: "irondocus@gmail.com",
                    password: "adminadmin", 
                    avatar: "",
                    departamento: Depart4._id,
                    admin: true,
                    validated: true
                }) 
                u1.save();
            });
            
        })
        .catch(err => console.log('Error =>' + err))