'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { parseStringify } from "../utils"
import { cookies } from "next/headers"

export const signIn= async ({email,password}:signInProps)=>{
    try {
      const { account } = await createAdminClient();
      const respone = await account.createEmailPasswordSession(email,password)
      return parseStringify(respone)
    } catch (error) {
        console.error('Error',error)
    }
}
export const signUp = async ({ password, ...userData }: SignUpParams) => {
    const { email, firstName, lastName } = userData;
    
    let newUserAccount;
  
    try {
      const { account, database } = await createAdminClient();
  
      newUserAccount = await account.create(
        ID.unique(), 
        email, 
        password, 
        `${firstName} ${lastName}`
      );
  
      if(!newUserAccount) throw new Error('Error creating user')
  
    //   const dwollaCustomerUrl = await createDwollaCustomer({
    //     ...userData,
    //     type: 'personal'
    //   })
  
    //   if(!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer')
  
    //   const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
  
    //   const newUser = await database.createDocument(
    //     DATABASE_ID!,
    //     USER_COLLECTION_ID!,
    //     ID.unique(),
    //     {
    //       ...userData,
    //       userId: newUserAccount.$id,
    //       dwollaCustomerId,
    //       dwollaCustomerUrl
    //     }
    //   )
  
      const session = await account.createEmailPasswordSession(email, password);
  
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
  
      return parseStringify(newUserAccount);
    } catch (error) {
      console.error('Error', error);
    }
  }
  
export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      // const result = await account.get();
  
       const user = await account.get();
  
       return parseStringify(user);
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  export const logoutAccount= async()=>{
    try {
      const {account}= await createSessionClient();
      cookies().delete('appwrite-session')
      await account.deleteSession('current')
    } catch (error) {
      return null;
    }
  }