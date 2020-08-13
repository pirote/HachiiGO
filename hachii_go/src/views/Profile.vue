<template>
  <div>
    <div class="row" style="padding: 50px;">
      <div class="col"  id="div_img" >
        <img :src="img" style="width: 100%;  height: 100%;" alt="">
      </div>
      <div class="col" id="div_det">
        <h1>{{name}}</h1>
        <p>{{email}}</p>
        <button type="button" class="btn btn-default" style="background-color: #dddddd;" v-on:click="click">รีเฟรชกราฟ</button>
      </div>
    </div>
      <div class="row" id="div_chart">
          <canvas class="chart" id="my-chart"></canvas>
      </div>

  </div>
</template>

<script>
import firebase from "firebase";
import Chart from "chart.js";
var database = firebase.database();
export default {
    data() {
        return {
            nameDB:'',
            date: [],
            data:[],
            tdee:[],
            name:'',
            email:'',
            img:''
        }
    },
    async created() {
        await firebase.auth().onAuthStateChanged((firebaseUser) => {
            this.nameDB = firebaseUser.displayName +"(" + firebaseUser.uid +")"
            this.name = firebaseUser.displayName
            this.email = firebaseUser.email
            this.img = firebaseUser.photoURL
        });
        var dataRef = database.ref("/" + this.nameDB);
        
        await dataRef.on("child_added", (snapshot) => {
        this.data.push(snapshot.val());
        this.date.push(snapshot.val().date);
        this.tdee.push(snapshot.val().tdee);
        });
        await this.click();
    },
  methods: {
    click(){
      var ctx = document.getElementById("my-chart");
    Chart.defaults.line.spanGaps = true;
    var myLineChart = new Chart(ctx, {
    type: 'line',
      data: {
        labels:this.date,
        datasets: [{
            label: 'Scatter Dataset',
            data: this.tdee,
            backgroundColor: ["rgba(255, 159, 64, 0.2)"],
            borderColor: ["rgba(255, 159, 64, 1)",]
        }]
    },options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
    });
    console.log(myLineChart);
    }
  },
}
</script>

<style>
#div_img{
  max-width:15%; 
  border: 2px solid #F87030; 
  width: 50px;  
  height: 150px;
}
.chart{
  height: 100px;
}
#div_chart{
  margin:25px;
}
@media only screen and (max-width: 1024px) {
  #div_img{
  max-width:50%; 
  border: 2px solid #F87030; 
  width: 200px;  
  height: 100px;
}
#div_det{
  max-width:100%;
}
.chart{
  height: 1500px;
}
#div_chart{
  margin:10px;
}
}
</style>