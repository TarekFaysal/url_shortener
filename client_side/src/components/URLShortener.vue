<template>
  <div class="container">
    <h1>URL Shortener</h1>
    <div class="formInput"></div>
   
    <input type="text" id="formInput" v-model="longUrl" placeholder="Paste Your URL Here">
    <button v-on:click="createUrl">Shorten</button>
    <div class="shortUrl-container">
     <p class="text">{{shortUrl}}</p>
    </div>
  </div>
  
</template>

<script>
import URLShortenerService from '../URLShortenerService';
export default {
  name: 'URLShortener',
  data(){
    return {
      shortUrl: URLShortenerService.shortUrl,
      error: '',
      longUrl: ''
    }
  },
  async created(){
    try{
      console.log("hello");
    }catch(error){

      this.error = error.message;
    }

  },

  methods: {
    async createUrl(){
      await URLShortenerService.createUrl(this.longUrl);
    },
    async redirectUrl(){
      await URLShortenerService.redirectUrl(this.longUrl);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
