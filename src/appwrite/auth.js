import { Client,Account,ID } from "appwrite";
import config from "../config/config";
export class AuthService{
      client=new Client();
      account;
      constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.account = new Account(this.client);
      }
      async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create( ID.unique(), email, password, name)
            if (userAccount) 
            {
                this.login({email,password});
            }else{
                return userAccount;
            }
        } catch (error) {
            throw new Error("Authentication failed: " + error)
        }
      }
      async login({email, password}){
          try {
           return await this.account.createEmailSession(email, password);
          } catch (error) {
            throw new Error("Something went wrong. Please try again");
          }
      }
      async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            throw new Error("Something went wrong. Please try again")
        }
        return null
      }
      async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
      }
}
const authService=new AuthService();
export default authService;