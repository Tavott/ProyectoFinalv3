import UserModel from './models/user.js'

export class MongoUserManager{
    async addUser(user){
        try {
            await UserModel.create(user)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(){
        try {
            let users = await UserModel.find()
            return users
        } catch (error) {
            console.log(error)
        }
    }
    async getUser(email){
        try {
            let user = await UserModel.findOne({email: email})
            return user
        } catch (error) {
            console.log(error)
        }
    }
}