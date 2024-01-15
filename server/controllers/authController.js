const twoFactorAuthData = require("../models/twofactorAuth")
const uuid = require('uuid')
const speakeasy = require('speakeasy');
const twoFAData = require("../models/twofactorAuth")
const mongoose = require("mongoose");

const twoFactorAuth =async (req,res)=>{
    try {
        const id = uuid.v4()
        const temp_secret = speakeasy.generateSecret()
        const twoFAData = await twoFactorAuthData.create({
            id:id,
            secret:temp_secret.base32
        })
        console.log(twoFAData);
        res.json({id,secret:temp_secret.base32})
    } catch (error) {
        console.log(error);
    }
}

const verifySecret =async(req,res)=>{
    try {
        const {id,token}= req.body
        if(!id || !token){
            return res.status(400).json({ error: 'id or token is required' });
        }
        const findData = await twoFAData.findOne({ id })
        const user = findData._doc
        mongoose.connection.close();
        const {base32:secret} = user
        const verified = speakeasy.totp.verify({secret, encoding:'base32',token})
        if(verified){
            db.push(path,{id:id,secret:user.temp_secret})
            res.json({verified:true})
        } 
        else{
            res.json({verified:false})
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    twoFactorAuth,
    verifySecret
}