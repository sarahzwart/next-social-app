import User from '../models/user.model';

import { connect } from '../mongodb/mongoose';

type email_addresses = {
    email_address: string;
    id: string;
    linked_to: [];
    object: string;
    verification: {
        status: string;
        strategy: string;
    }
};
  
export const createOrUpdateUser = async (
  id:string,
  first_name:string,
  last_name:string,
  image_url:string,
  email_addresses:email_addresses[],
  username:string
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email: email_addresses[0].email_address,
          username,
        },
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.log('Error creating or updating user:', error);
  }
};

export const deleteUser = async (id:string) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log('Error deleting user:', error);
  }
};