"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// create user
export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

// get user
export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findById({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

// update user
export const updateUser = async (userId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId: userId }, user, {
      new: true,
    });

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

// delete user
export const deleteUser = async (userId: string) => {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId: userId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
};

// use credits
export const updateCredits = async (userId: string, credits: number) => {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { clerkId: userId },
      { $inc: { creditBalance: credits } },
      { new: true }
    );

    if (!updatedUserCredits) {
      throw new Error("User credits update failed!");
    }

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
};
