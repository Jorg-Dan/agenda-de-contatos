import type { User, UserRepository } from "../interfaces/user.interface.ts";

class UserRepositoryPrisma implements UserRepository{
    async create(data: UserCreate): Promise<User> {
        
    }

}