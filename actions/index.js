"use server";

import connectToDb from "@/database";
import authUser from "@/models/authUser";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function SignUpUser(user){
    await connectToDb();
    try{
        if(user && user.name && user.email && user.password){
            console.log(user)
            const {name , email , password} =  user;
            const userExist = await authUser.findOne({email});
            console.log(userExist)
            if(userExist){
                return ({
                    success: false ,
                    message : "user already exist try loggin in"
                })
            }
            else {
                console.log(user);
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password , salt);

                const newUser = new authUser({
                    name ,
                    email ,
                    password : hashedPassword
                })
                const savedUser = await newUser.save();
                
                if(savedUser){
                    console.log(newUser);
                    return ({
                        success : true ,
                        message : "succesfully created new user"
                    })
                }
                else {
                    return ({
                        success: false ,
                        message : "something went wrong please try again"
                    })
                }
            }
        } else {
            return ({
                success: false ,
                message : "something went wrong please try again"
            })
        }
    }catch(e){
        return ({
            success : false ,
            message : "something went wrong please try again"
        })
    }
}

export async function signInUser(user){
    await connectToDb();

    try {
        const {email , password} = user;

        const checkUser = await authUser.findOne({email});
        if(checkUser){
            const checkPassword = bcrypt.compare(password , checkUser.password )
            if(checkPassword){
                
                const createToken = {
                    id : checkUser._id ,
                    email ,
                }
                
                const token = jwt.sign(createToken , "DEFAULT_KEY" , {expiresIn: '1d'})
                const getCookies = cookies();
                getCookies.set("token" , token);

                

                return {
                    success : true ,
                    message : 'succesfully logged in'
                }
            }
            else {
                return  {
                    success : false ,
                    message : "wrong password..!"
                }
            }
        }
        
        return {
            success : false ,
            message : "user does'nt exist please signUp"
        }
    }catch(e){
        return {
            success : false ,
            message : 'something went wrong , please try again later'
        }
    }
}

export async function fetchUser(){
    await connectToDb();
    try {
        const getCookies = cookies();
        const token = getCookies.get("token")?.value || "";

        if(token === ""){
            return {
                success :false, 
                message : "something went wrong please try again"
            }
        }

        const decodedToken = jwt.verify(token , "DEFAULT_KEY" );
        const user = await authUser.findOne({_id : decodedToken.id});
        if(user){
            console.log(user)
            return {
                success : true ,
                data : JSON.parse(JSON.stringify(user))    
            } 
        }
        else {
            return {
                success : false ,
                message : 'something went wrong , please try again'
            }
        }
    }catch(e){
        return {
            success :false ,
            message :"something went wrong"
        }
    }
}

export async function logoutAction(){
    const getCookies = cookies();
    getCookies.set("token" , "");
    console.log("succesfully logged out")
    return {
        success : true ,
        message : 'succesfully logged out'
    }
}