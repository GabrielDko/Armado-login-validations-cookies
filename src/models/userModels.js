const {getJson,setJson} = require('../utility/jsonMethod');


const users = {
    getData: function(){
        return getJson('usersDataBase')
    },
    findAll: function(){
        return this.getData();
    },
    findByPk: function(id){
        let users = this.findAll();
        let user = users.find(user => user.id === id)
        return user
    },
    findByField: function(field,text){
        let users = this.findAll();
        let user = users.find(user => user[field] === text)
        return user
    },
    create: function(userData){
        let users = this.findAll();
        let newUser = {
            id: Date.now() + '',
            ...userData
        }
        users.push(newUser)
        setJson(users, 'usersDataBase')
    },
    delete: function(id){
        let users = this.findAll();
        let finalUsers = users.filter(user => user.id !== id)
        setJson(finalUsers, 'usersDataBase')
    }
}


module.exports = users;