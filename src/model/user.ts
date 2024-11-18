import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcryptjs'

export interface User{
    username:string
    email:string
    password:string
    filledData:boolean
}

const userSchema=new Schema<User>({
    username:{type:String,required:[true,'Username field cannot be empty']},
    email:{type:String,required:[true,'Email field cannot be empty'],unique:true},
    password:{type:String,required:[true,'Password field cannot be empty']},
    filledData:{type:Boolean,default:false}
},{timestamps:true})

// userSchema.pre('save',async function (next){
//     const salt=bcrypt.genSaltSync(10)
//     const newPassword=bcrypt.hashSync(this.password,salt)
//     this.password=newPassword
//     next()
// })
// userSchema.statics.login=async function (email,password){
//     let oldUser=await this.findOne({email})
//     if(!oldUser){
//         return null
//         //throw Error("No such user. Create account")
//     }
//     if(bcrypt.compareSync(password,oldUser.password)){
//         return oldUser
//     }else{
//         throw Error("Wrong Password")
//     }
// }

const user=mongoose.model<User>('users',userSchema)
export default user



