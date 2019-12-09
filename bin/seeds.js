require('../config/db.config')

const User = require('../models/user.model')
const Depart = require('../models/depart.model')
const Category = require('../models/category.model')
const Docu = require('../models/document.model')

User.deleteMany({})
        .then(() => Depart.deleteMany({}))
        .then(() => Category.deleteMany()
        .then(() => Docu.deleteMany()
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
                    depart: Depart3._id,
                    admin: false,
                    validated: false
                }) 
                u2.save();

                const u3 = new User({
                    fullname: "Julio",
                    email: "julio@gmail.com",
                    password: "juliog", 
                    avatar: "",
                    depart: Depart3._id,
                    admin: false,
                    validated: false
                }) 
                u3.save();

                const cat1 = new Category({
                    name: "categoryTest",
                    depart: Depart3._id
                })
                cat1.save()
                .then( () => {
                    const docu1 = new Docu({
                        title: 'Document1',
                        content: '',
                        files: '',
                        author: u3._id,
                        category: cat1._id
                    })
                    docu1.save()
                });
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
                    depart: Depart4._id,
                    admin: true,
                    validated: true
                }) 
                u1.save();
            });
            
            
        })))
        .catch(err => console.log('Error =>' + err))

