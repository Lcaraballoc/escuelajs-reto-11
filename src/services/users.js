// DEBUG=app:* node src/utils/scripts/seedUsers.js

const MongoConnect = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoConnect();
    }

    async getUser({ email }) {
        const [user] = await this.mongoDB.getAll(this.collection, { email });
        return user;
    }

    async createUser({ user }) {
        const { name, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUserId = await this.mongoDB.create(this.collection, {
            name,
            email,
            password: hashedPassword
        });

        return createUserId
    }
}

module.exports = UserService;