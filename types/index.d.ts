// user params
declare type CreateUserParams = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  userName: string;
  photo: string;
};
