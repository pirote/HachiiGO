<template>
  <div class="home">
    <SumCalorie v-if="this.status === 'calories'"  @close_calories="closeCalories"/>
    <div class="con" v-if="this.status === 'default'">
      <img src="../assets/bg1.jpg" width="100%" alt="">
      <b-button class="btn" style="background-color: #F87030; border-color: #F87030; width:250px ;" v-on:click="show_sum_calorires">คำนวณแคลอรี่</b-button>
      
    </div>
    <div class="div_calories" v-if="this.status === 'default'">
      <h1>Calories</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SumCalorie from '@/components/Sum_Calorie.vue'

export default {
  name: 'Home',
  components: {
    SumCalorie
  },
  data() {
    return {
      status: 'default'
    }
  },
  methods:{
    show_sum_calorires(){
      this.status = 'calories';
    },
    closeCalories(e){
      this.status = e
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
  top: 85%;
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