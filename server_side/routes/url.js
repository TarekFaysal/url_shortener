//generate short url

const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

//@route    POST /api/url/shorten
//@desc     Create short URL
router.post('/shorten', async (req,res)=>{
    const { longUrl } = req.body;
    const baseUrl = config.get('baseurl');

    //check base url
    if(!validUrl.isUri(baseUrl)){
        return res.status(400).json('Invalid base Url');
    }

    //create shortUrl code
    const shortUrlCode = shortid.generate();


    //check long url
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({longUrl});

            if(url){
                res.json(url);
            }else{
                url = new Url({
                    longUrl,
                    shortUrlCode,
                    visited: 0
                });

                await url.save();

                res.json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json("Server error");
        }
    } else{
        res.status(400).json('Invalid long url');
    }
});

module.exports = router;