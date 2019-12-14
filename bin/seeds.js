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
                    name: "Accounts and Finances",
                    flag: "AAFF"
                })
                Depart1.save();

                const catIns = new Category({
                    name: "Insurances",
                    depart: Depart1._id,
                    flag: "Insurances"
                })
                catIns.save()
                const catBudget = new Category({
                    name: "Budgets",
                    depart: Depart1._id,
                    flag: "Budgets"
                })
                catBudget.save()

                const Depart2 = new Depart({
                    name: "Human Resources",
                    flag: "HHRR"
                })
                Depart2.save();
                const catHol = new Category({
                    name: "Holidays",
                    depart: Depart2._id,
                    flag: "Holidays"
                })
                catHol.save()
                const catCV = new Category({
                    name: "CVs",
                    depart: Depart2._id,
                    flag: "CVs"
                })
                catCV.save()

                const Depart3 = new Depart({
                    name: "Research and development",
                    flag: "RD"
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

                        const catSoft = new Category({
                            name: "Software",
                            depart: Depart3._id,
                            flag: "Software"
                        })
                        catSoft.save()
                        const catBugs = new Category({
                            name: "Bugs Fix",
                            depart: Depart3._id,
                            flag: "BugsFix"
                        })
                        catBugs.save()
                        const catDB = new Category({
                            name: "Database",
                            depart: Depart3._id,
                            flag: "Database"
                        })
                        catDB.save()
                            .then(() => {
                                const docu1 = new Docu({
                                    title: 'Document1',
                                    content: '',
                                    files: '',
                                    author: u3._id,
                                    category: catDB._id
                                })
                                docu1.save()
                            });
                    });

                const Depart4 = new Depart({
                    name: "IT services",
                    flag: "ITSS"
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
                        const catProbl = new Category({
                            name: "Problems",
                            depart: Depart4._id,
                            flag: "Problems"
                        })
                        catProbl.save()
                        const catDeploy = new Category({
                            name: "Deployments",
                            depart: Depart4._id,
                            flag: "Deployments"
                        })
                        catDeploy.save()
                        const catEnv = new Category({
                            name: "Enviroments",
                            depart: Depart4._id,
                            flag: "Enviroments"
                        })
                        catEnv.save()
                    });
                
                console.log("Seeds are loaded in DB")

            })))
    .catch(err => console.log('Error =>' + err))

