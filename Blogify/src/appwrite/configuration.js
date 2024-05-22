import config from "../config/config";
import { Client,ID, Databases,Storage, Query } from "appwrite";

export class Services{
    client = new Client();
    databases;
    bucket; //storage

    constructor(){
        this.client
        .setEndpoint(config.appWriteUrl) //  API Endpoint
        .setProject(config.appWriteProjectId); //project ID
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
           try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,config.appWriteCollectionId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
           } catch (error) {
            console.log("appwrite services :: createPost :: Error",error);
           }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,config.appWriteCollectionId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite services :: updatePost :: Error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,config.appWriteCollectionId,slug
            )
            return true
        } catch (error) {
            console.log("appwrite services :: deletePost :: Error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,config.appWriteCollectionId,slug
            )
        } catch (error) {
            console.log("appwrite services :: getPost :: Error",error);
            return false
        }
    }

    async getPosts(queries=[Query.equal="status","active"]){
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,config.appWriteCollectionId,queries
            )
        } catch (error) {
            console.log("appwrite services :: getPosts :: Error",error);
        }
    }

    //file upload service
    
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,ID.unique(),file
            )
        } catch (error) {
            console.log("appwrite services :: uploadfile :: Error",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite services :: deletefile :: Error",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appWriteBucketId,fileId
        )
    }
}

const services = new Services();

export default services;