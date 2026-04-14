export interface User{
    id: string,
    email: string,
    name: string
}

interface UserCreate {
    email: string,
    name: string,
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
}