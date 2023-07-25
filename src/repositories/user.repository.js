import Persistance from "../dao/factory.js";

export default class UserRepository {
    constructor() {
        this.userDao;
        this.init();
    }

    init = async () => {
        this.userDao = await Persistance.getUserPers();
    };

    loginUser = async (user) => {
        return await this.userDao.loginUser(user);
    };

    newUser = async (user) => {
        return await this.userDao.newUser(user);
    };
}
