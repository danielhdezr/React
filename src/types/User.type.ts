export type UserResponse = {
    users: User[];
}

export type CreateUserPayload = {
    user: User;
}

export type UpdateUserPayload = {
    user: Partial<User> & { id: number };
}

export type CreateUserResponse = {
    user: User;
}

export type UpdateUserResponse = {
    user: User;
}

export type User = {
    id: number;
    name: string;
    email: string;
    created: string | Date;
};