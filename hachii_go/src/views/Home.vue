<template>
  <div class="home">
    <SumCalorie v-if="this.status === 'calories'"  @close_calories="closeCalories"/>
    <div class="con" v-if="this.status === 'default'">
       <vue-flux
   :options="vfOptions"
   :images="vfImages"
   :transitions="vfTransitions"
   ref="slider">

   <template v-slot:preloader>
      <flux-preloader />
   </template>

   <template v-slot:caption>
      <flux-caption />
   </template>

   <template v-slot:controls>
      <flux-controls /><b-button class="btn" style="background-color: #F87030; border-color: #F87030; width:250px ;" v-on:click="show_sum_calorires">คำนวณแคลอรี</b-button>
   </template>

   <template v-slot:pagination>
      <flux-pagination />
   </template>

   <template v-slot:index>
      <flux-index />
   </template>
</vue-flux>   
      
    </div>
    <div class="div_calories" v-if="this.status === 'default'">
      <h1 v-if="!this.nameLine">แคลอรี</h1>
      <Icon v-if="!this.nameLine" />
    </div>
    <b-button v-on:click="up">click</b-button>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import SumCalorie from '@/components/Sum_Calorie.vue'
import Icon from '../components/icon'
import liff from '@line/liff';
import json from '../hachiigodb.json'
//initial line LIFF
var database = firebase.database();
import {
   VueFlux,
   FluxCaption,
   FluxControls,
   FluxIndex,
   FluxPagination,
   FluxPreloader,
} from 'vue-flux';
export default {
  name: 'Home',
  components: {
    SumCalorie,
    Icon,
     VueFlux,
      FluxCaption,
      FluxControls,
      FluxIndex,
      FluxPagination,
      FluxPreloader,
  },beforeCreate(){
  liff
      .init({ liffId: "1654665014-qlP8X7Wd" })
      .then(function(){
          //window.alert('this on OS:' + liff.getOS);
      })
      .catch(function(error) {
            //window.alert('Error init msg: ' + error);
            //Swal.fire('กรุณารอสักครู่...');
            //window.alert('กรุณารอสักครู่...');
            console.log(error);
        });
  },
  data() {
    return {
      status: 'default',
      vfOptions: {
         autoplay: true
      },
      vfImages: [ 'https://firebasestorage.googleapis.com/v0/b/hachiigodb.appspot.com/o/bg1.jpg?alt=media&token=e51d7c4d-8ee5-40a1-95c0-04dc2415ca1c', 
      'https://firebasestorage.googleapis.com/v0/b/hachiigodb.appspot.com/o/bg3.png?alt=media&token=b65f0a43-b7a4-4a06-b785-4fb5f1d2969c' ],
      vfTransitions: [ 'slide' ],
      nameLine:'',
    }
  },
  created() {
    setInterval(function(){ 
      this.currentNumber += 1
    
    }, 3000);
    console.log(this.currentNumber);
    //const profile_line = liff.getProfile();
      if (!liff.isInClient()) {
        /*liff.sendMessages([{
            'type': 'text',
            'text': "heelo" 
        }])*/
    } else {
        
        liff.getProfile()
          .then(profile=>{
            const name =profile.displayName
            //const line_email = liff.getDecodedIDToken().email
            //const line_Uid = profile.userId
            //const line_PUrl = profile.pictureUrl
            // merge profile line to database
            this.nameLine = name

          })
        /*liff.sendMessages([{
            'type': 'text',
            'text': 'hello ' + profile_line.
        }]).then(function() {
            window.alert('Message sent');
        }).catch(function(error) {
            window.alert('Error sending msg: ' + error);
        });*/
    }
  },
  methods:{
    show_sum_calorires(){
      this.status = 'calories';
    },
    closeCalories(e){
      this.status = e
    },
    
    up(){
      console.log(json.FoodData);
      var dataRef = database.ref("/FoodData/Drink");
      var d = json.FoodData["เนื้อสัตว์ "]
      for(var i = 0; i< d.length; i++){
      dataRef.push({
        Calories: d[i].Calories,
        Food: d[i].Food,
        Unit: d[i].Unit
      })
      console.log(i, "com");
    }
      console.log(dataRef);
    }
  }
}
</script>
<style>
.div_calories{
  padding: 100px 16px 16px 16px;
  color:#2F255A;
  text-align: center;
}
.con {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding-left: 5%;
  padding-right: 5%;
}

.con img {
  width: 100%;
  height: auto;
}

.con .btn {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #555;
  color: white;
  font-size: 16px;
  padding: 12px 0px;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  text-align: center;
  box-shadow: 3px 5px 5px #8888887c;
}

.con .btn:hover {
  background-color: rgb(255, 255, 255);
}
</style>