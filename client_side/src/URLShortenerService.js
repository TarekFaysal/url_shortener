import axios from 'axios';

const url = 'http://localhost:5000/';

class URLShortenerService{
    static  shortUrl= '';

    static  createUrl(longUrl) {
         axios.post(`${url}api/url/shorten`, {
                longUrl
        }).then(response => {
            this.shortUrl = response.data['shortUrlCode'];
            console.log(this.shortUrl);
        });
    
    }

    static redirectUrl(urlCode){
         axios.get(`${url}${urlCode}`);
    }

}

export default URLShortenerService;