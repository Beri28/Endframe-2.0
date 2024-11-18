import artist, { Artist,EmptyArtist } from "../model/artist";
import {Request,Response} from 'express'
import bcrypt from 'bcryptjs'
import user from "../model/user";
import jwt from 'jsonwebtoken'

const maxAge=3600*24
const createToken=(id:string)=>{
    return jwt.sign({id},`${process.env.SECRET}`,{expiresIn:maxAge})
}
export const getSingleArtist=async (req:Request,res:Response)=>{
    const {name}=req.params
    try {
        const artistFound=await artist.findOne<Artist>({_id:'67332a3435a97b1775d879a6'})
        res.json(artistFound)
    } catch (error:any) {
        console.log(error.message)
        res.send(error.message)
    }
}
export const getAllArtist=async (req:Request,res:Response)=>{
    // const {name}=req.params
    try {
        const artistFound=await artist.find<Artist[]>({})
        res.json(artistFound)
    } catch (error:any) {
        console.log(error.message)
        res.send(error.message)
    }
}
export const addArtist=async (req:Request,res:Response)=>{
    console.log(req.body)
    try {
       const createdArtist =await artist.create(req.body)
       if(createdArtist){
            res.json({
                message:"Creation of artist was successs"
           })
       }else{
        res.json({
            message:"Couldn't create artist profile"
           })
       }
       
    } catch (error:any) {
        console.log(error.message)
        res.send(error.message)
    }
}

export const editArtist=async (req:Request,res:Response)=>{
    console.log(req.body)
    const {id,...restOfBody}=req.body
    try {
       const editedArtist =await artist.findByIdAndUpdate({_id:id},{...restOfBody})
       if(editedArtist){
            res.json({
                message:"Editing artist info was a successs"
           })
       }else{
        res.json({
            message:"Couldn't edit artist info"
           })
       }
       
    } catch (error:any) {
        console.log(error.message)
        res.send(error.message)
    }
}
export const artistData=async (req:Request,res:Response)=>{
    try {
        // const response = await fetch('https://api.spotify.com/v1/search?q=jovi&type=artist&market=CM', {
        // const response = await fetch('https://api.spotify.com/v1/artists/6LCXa6wE8e5ctZs1Prvuv5', {
        // JOVI spotify ID="6LCXa6wE8e5ctZs1Prvuv5"
        // Kocee spotify ID="2kzxvChUUVpkgySPhCcUT6"
        // Locko spotify ID="7cUFvbLZrLySXBoxk39kCZ"
        // Mr_Leo spotify ID="0sfURdhcmXyrcFEWaJ2IJI"
        // Mic monsta spotify ID="4ZBZ77Fqct8CDmacebhY7A"
        // Kocee audiomack_username="kocee-12"
        // Locko audiomack_username="lockofficial"
        // Mr Leo audiomack_username="mr-leo"
        // Mic monsta audiomack_username="mic-monsta"
        let audiomackData:any
        let spotifyData:any
        const {id,spotifyId,audiomackUsername}=req.query
        console.log(req.query)
        await fetch(`https://spotify-statistics-and-stream-count.p.rapidapi.com/artist/${spotifyId}`, {
            // headers: {
            //   Authorization: 'Bearer ' + process.env.ACCESS_TOKEN
            // }
            headers: {
                'x-rapidapi-key': '03b91cd54fmsh0f2ca77a62bb2a8p108273jsn510f4b0072c8',
                'x-rapidapi-host': 'spotify-statistics-and-stream-count.p.rapidapi.com'
            }
        }).then((res)=>res.json()).then((data)=>{
            // console.log(data)
            spotifyData=data
        }).catch((error)=>{
            throw Error(error)
        }) 
        await fetch('https://audiomack-scraper.p.rapidapi.com/audiomack/artist/'+audiomackUsername, {
            // headers: {
            //   Authorization: 'Bearer ' + process.env.ACCESS_TOKEN
            // }
            headers: {
                'x-rapidapi-key': '03b91cd54fmsh0f2ca77a62bb2a8p108273jsn510f4b0072c8',
                'x-rapidapi-host': 'audiomack-scraper.p.rapidapi.com'
            }
        }).then((res)=>res.json()).then((data)=>{
            // console.log(data)
            audiomackData=data
        }).catch((error)=>{
            throw Error(error)
        })
        let artistTemp=await artist.findOneAndUpdate({userId:id},{
            rawData:{
                spotifyData:{
                    followers:spotifyData.followers,
                    monthlyListeners:spotifyData.monthlyListeners,
                    topCities:spotifyData.topCities,
                    topTracks:spotifyData.topTracks
                },
                audiomackData:{
                    bio:audiomackData.bio,
                    url_slug:audiomackData.url_slug,
                    followers_count:audiomackData.followers_count,
                    stats:audiomackData.stats,
                    upload_count:audiomackData.upload_count
                }
            }
        })
        // if(!artistTemp){
        //     artistTemp=await artist.create({
        //         userId:id,
        //         firstName: 'strin',
        //         lastName: '',
        //         artistName:'',
        //         email: '',
        //         telephone:'',
        //         country: '',
        //         profilePicture: '',
        //         photos:[audiomackData.images.original.filename],
        //         socialMedia:[],
        //         rawData:{
        //             spotifyData:{
        //                 followers:spotifyData.followers,
        //                 monthlyListeners:spotifyData.monthlyListeners,
        //                 topCities:spotifyData.topCities,
        //                 topTracks:spotifyData.topTracks
        //             },
        //             audiomackData:{
        //                 url_slug:audiomackData.url_slug,
        //                 followers_count:audiomackData.followers_count,
        //                 stats:audiomackData.stats,
        //                 upload_count:audiomackData.upload_count
        //             }
        //         }
        //     })
        // }
        res.json({artist:artistTemp})
        // res.json({
        //     spotifyData:{
        //         followers:spotifyData.followers,
        //         monthlyListeners:spotifyData.monthlyListeners,
        //         topCities:spotifyData.topCities,
        //         topTracks:spotifyData.topTracks
        //     },
        //     'space':'//////////',
        //     audiomackData:{
        //         url_slug:audiomackData.url_slug,
        //         followers_count:audiomackData.followers_count,
        //         stats:audiomackData.stats,
        //         upload_count:audiomackData.upload_count
        //     }
        // })
    } catch (error:any) {
        console.log(error.message)
        res.send(error.message)
    }
}
export const register=async (req:Request,res:Response)=>{
    try {
        const { username,email, password } = req.body;
        console.log(req.body)
        const foundUser=await user.findOne({email})
        if(foundUser){
            res.json({ message: 'User with that email already exist' });
        }else{
            const hashedPassword =await bcrypt.hash(password, 10);
            const createdUser = new user({ username,email, password: hashedPassword });
            await createdUser.save().then(()=>{
                let token=createToken(createdUser._id.toString())
                res.cookie("endframe-2.0",token,{maxAge:1000*maxAge})
                res.json({username:createdUser.username,id:createdUser._id,token:token})
            return
            });
        }
        // res.status(201).json({ message: 'User registered successfully' });
    } catch (error:any) {
        console.log(error.message)
        res.send(error.message)
    }
}
export const login=async (req:Request,res:Response)=>{
    try {
        let {email,password}=req.body
        console.log(req.body)
        let oldUser=await user.findOne({email})
        if(oldUser){
            if(bcrypt.compareSync(password,oldUser.password)){
                let token=createToken(oldUser._id.toString())
                res.cookie("endframe-2.0",token,{maxAge:1000*maxAge})
                res.json({id:oldUser._id,username:oldUser.username,token:token})
                return
            }else{
                throw Error("Wrong Password")
            }
        }
        res.json(null)
        
    } catch (error:any) {
        console.log(error.message)
        res.send(error.message)
    }
}
export const search=async (req:Request,res:Response)=>{
    try {
        const {artistName}=req.query
        console.log(req.query)
        const results=await artist.find({artistName:{ $regex: artistName, $options: "i"}})
        console.log(results)
        res.json({results})
    } catch (error:any) {
        console.log(error.message)
        res.send(error)
    }
}
// 6731fc4a193222c8d512ea0e

