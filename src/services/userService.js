import { MongoUserManager } from "../dao/mongo/MongoUserManager.js";
import { UserDTO } from "../DTO/userDTO.js";

const userDTO = new UserDTO
const mongoUserManager = new MongoUserManager

class UserService {
    async addUser(user){
        try {
            let usuario = await userDTO.user(user)
            return await mongoUserManager.addUser(usuario)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(){
        try {
            let users = await mongoUserManager.getUsers()
            return users
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(email){
        try {
            let userEmail = await userDTO.userByEmail(email)
            let user = await mongoUserManager.getUser(userEmail)
            return user
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserService