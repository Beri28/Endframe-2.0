import mongoose, {Document, ObjectId} from "mongoose"

type meidaLink={
    platform:string
    profileLink:string
}
type spotify={
    id:string
    followers:number
    monthlyListeners:number
    topCities:[object]
    topTracks:[object]
}
type audiomack={
    id:string
    bio:string
    url_slug:string
    followers:number
    stats:[object]
    upload_count:[object]
}
export interface Artist extends Document {
    userId:ObjectId|null;
    firstName: string;
    lastName: string;
    artistName:string
    email: string;
    telephone: string;
    country?: string;
    profilePicture: string;
    photos:string[];
    socialMedia:meidaLink[];
    dob?:Date;
    rawData:{
        spotifyData?:spotify;
        audiomackData?:audiomack
    }
}
export type EmptyArtist={
    userId:null,
    firstName: '',
    lastName: '',
    artistName:'',
    email: '',
    telephone:'',
    country?: '',
    profilePicture: '',
    photos:[];
    socialMedia:[];
    dob:Date;
    rawData:{
        
    }
}


const artistSchema=new mongoose.Schema<Artist>({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    firstName:{type:String,required:[true,'First name field cannot be empty']},
    lastName:{type:String,required:[true,'Last name field cannot be empty']},
    artistName:{type:String,required:[true,'Artist name field cannot be empty']},
    email:{type:String,required:[true,'Email field cannot be empty'],unique:true},
    telephone:{type:String,required:[true,'Telephone field cannot be empty'],unique:true},
    country:{type:String,default:'Cameroon'},
    profilePicture:{type:String,required:[true,'Profile picture must be chosen']},
    photos:{type:[String]},
    socialMedia:{type:[
        {
            platform:String,
            profileLink:String,
        }
    ]},
    rawData:{type:{
        spotifyData:Object,
        audiomackData:Object,
    }},
    dob:{type:Date}
},{
    timestamps:true
})

const artist=mongoose.model<Artist>("artist", artistSchema)
export default artist;