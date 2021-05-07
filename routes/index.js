//redirect to long url
const express = require('express');
const router = express.Router();
const config = require('config');

const Url = require('../models/Url');

//@route        GET /:CODE
//@desc         Redirect to long/original URL
router.get('/:code', async(req,res)=>{
    try {
        const url = await Url.findOne({shortUrlCode: req.params.code});
        
        if(url){
            url.visited++;
            await url.save();
            return res.redirect(url.longUrl);
        }else{
            return res.status(404).json('No url found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});


//@route        GET /:CODE/stats
//@desc         Show stats of the Url
router.get('/:code/stats', async(req,res)=>{
    try {
        const url = await Url.findOne({shortUrlCode: req.params.code});
        if(url){ 
            const baseUrl = config.get('baseurl');
            return res.send({
                "longUrl": url.longUrl,
                "shortUrl": baseUrl+"/"+url.shortUrlCode,
                "visited": url.visited
            });
        }else{
            return res.status(404).json('No url found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});

module.exports = router;
