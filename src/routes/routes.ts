import express from 'express'
import { addArtist, artistData, editArtist, getSingleArtist,getAllArtist, login, register,search } from '../controllers/controller'
const router=express.Router()


// api routes
router.route('/artist')
.get(getSingleArtist)
.patch(editArtist)
.post(addArtist)
router.route('/artists')
.get(getAllArtist)
router.get('/search',search)
router.route('/artist/data').get(artistData)
router.route('/register').post(register)
router.route('/login').post(login)

export default router