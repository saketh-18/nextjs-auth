export const signUpFormControls = [
    {
        name : "name" ,
        placeholder : "enter the name of the user",
        label : "name" ,
        componentType : "Input" ,
        type : "text"
    } ,
    {
        name : "email" ,
        placeholder :"enter email of the user" ,
        label  :"email" ,
        type : 'email' 
    } ,
    {
        name : "password" ,
        placeholder :"enter password of the user" ,
        label  :"password" ,
        type : 'password'
    }
]

export const signInFormControls = [
    {
        name :"email" ,
        placeholder :"enter email of the user" ,
        label : "email" ,
        type :" email"
    } ,
    {
        name : "password" , 
        placeholder :"enter password of the user" ,
        label : "password" ,
        type:"password"
    }
]

export const initialSignInFormData = {
    email  : "" ,
    password : ""
}

export const initialSignUpFormData = {
    name : "" ,
    email :"" ,
    password : "",
}