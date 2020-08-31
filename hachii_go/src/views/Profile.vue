<template>
  <div class="profile">
    <div>
    <div
      class="row"
      style="padding: 50px 50px 25px 50px; background-color: #ffffff; margin: 0px 0px 25px 0px;  border-radius: 0px 0px 10px 10px;"
    >
      <div class="col" id="div_img">
        <img
          :src="img"
          style="width: 120px;  height: 120px; border: 4px solid #f87030; border-radius: 100%;"
          alt
        />
      </div>
      <div class="col" id="div_det">
        <h1>{{name}}</h1>
      </div>
      <div class="col">
        <div class="row" id="showBBT">
          <div class="col">
            <h1>{{bmi}}</h1>
            <p>BMI</p>
          </div>
          <div class="col">
            <h1>{{bmr}}</h1>
            <p>BMR</p>
          </div>
        </div>
        <div class="row" id="showBBT">
          <div class="col" style="max-width: 100%;">
            <h1>
              <span style="color:#F87030;">{{Remaining_calories}}</span>/
              <span>{{tdee}}</span>
            </h1>
            <p>TDEE</p>
          </div>
        </div>
        <div id="reTDEE">
          <p>สามารถทานได้อีก <b>{{remainingTDEE}}</b> Cal.</p>
        </div>
        
      </div>
    </div>
    <div
      class="div_table"
      style="padding: 50px 50px 25px 50px; background-color: #ffffff; margin: 0px 0px 25px 0px;  border-radius: 10px 10px 10px 10px;"
    >
      <h4>รายการสิ่งที่ทานในวันนี้</h4>
      <div v-if="!this.data" style="text-align: center; padding:5%;">
        <p>ยังไม่มีการเลือกสิ่งที่ทานของวันนี้</p>
      </div>
      <div v-else>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ชื่ออาหาร</th>
              <th>ปริมาณ</th>
              <th>ค่าแคลอรี</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td>
                <a target="_blank">{{ item.Food }}</a>
              </td>
              <td>
                <a target="_blank">{{ item.Unit }}</a>
              </td>
              <td>
                <a target="_blank">{{ item.Calories }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="row"
      id="div_chart"
      style="padding: 50px 10px 25px 10px; background-color: #ffffff; margin: 0px 0px 25px 0px;  border-radius: 10px 10px 0px 0px;"
    >
      <div class="col" style="test-align:left;">
        <b>กราฟ น้ำหนัก</b>
        <p>เริ่มวันที่ {{startDay}}</p>
      </div>
      <div class="col" style="test-align:right;">
        <b-button class="previous round" id="saveWeight" v-on:click="start21DayChallenge">เริ่ม 21 Day Challenge</b-button>
      </div>
    
      <canvas class="chart" id="my-chart-Weight" v-if="this.startDay.length > 0"></canvas>
    </div>
    <div
      class="row"
      id="div_chart"
      style="padding: 50px 10px 25px 10px; background-color: #ffffff; margin: 0px 0px 25px 0px;  border-radius: 10px 10px 0px 0px;"
    >
    <b>กราฟ Calrories</b>
      <canvas class="chart" id="my-chart"></canvas>
    </div>

    <div v-if="this.dataWait > 0" class="row"
      id="div_chart"
      style="padding: 50px 10px 25px 10px; background-color: #ffffff; margin: 0px 0px 25px 0px;  border-radius: 10px 10px 0px 0px;"
    >
      <DataWaitCon/>
    </div>
    </div>
  </div>
</template>

<script scope="this api replaced by slot-scope in 2.5.0+">
import firebase from "firebase";
import Swal from "sweetalert2";
import Chart from "chart.js";
import DataWaitCon from "../components/DataWaitCon"
var database = firebase.database();
export default {
  data() {
    return {
      nameDB: "",
      dateCal: "",
      dateData: "",
      tdee: "",
      bmi: "",
      bmr: "",
      name: "",
      email: "",
      img: "",
      Remaining_calories: "",
      sum_cal: [],
      sum_date: [],
      data: [],
      AllDate: [],
      AllCal: [],
      chartTdee: [],
      chartBmr: [],
      dataWait:0,
      remainingTDEE:0,
      dateChallenge:[],
      keyCha:"",
      dayCha:[],
      weightCha:[],
      startDay:""
    };
  },
  components:{
    DataWaitCon
  },
  async created() {
    await firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.nameDB = firebaseUser.uid;
      this.name = firebaseUser.displayName;
      this.email = firebaseUser.email;
      this.img = firebaseUser.photoURL;
    });
    var dataRef = database.ref("/AuthenAcount/" + this.nameDB + "/Data/");

    var dataWait = database.ref("/FoodData/DataWaitConfirm/");
    await dataWait.on("child_added", (snapshot) => {
      if(this.email === "hachiigo@admin.com"){
        this.dataWait = 1;
      }
      else if(this.email !== "hachiigo@admin.com" && snapshot.val().credit === this.email){
        this.dataWait =  1;
      }
    });
    await dataRef.on("child_added", (snapshot) => {
      this.dateData = snapshot.val().date;
      this.tdee = snapshot.val().tdee;
      this.bmr = snapshot.val().bmr;
      this.bmi = snapshot.val().bmi;
    });
    var dataDate= database.ref("/AuthenAcount/" + this.nameDB + "/Weight/");
      dataDate.on("child_added", (snap) => {
        if(snap.val().status === "start"){
          this.startDay=snap.val().date
        }
        this.dateChallenge = snap.val()
        this.keyCha = snap.key
      })

    const today = new Date();
    var onedate =
      today.getMonth() + 1 + ":" + today.getDate() + ":" + today.getFullYear();
    var dataCalUserOne = database.ref(
      "/AuthenAcount/" + this.nameDB + "/Calories/" + onedate + "/"
    );
    dataCalUserOne.on("child_added", (snap1) => {
      this.data = snap1.val();
      this.dateCal = snap1.val()[0].date;
    })
  },
  updated() {
      //this.gatSevDay();
      setTimeout(() => this.gatSevDay(), 2000);
      this.gat21Day()
      setTimeout(() => this.gat21Day(), 2000);
    this.sum_cal[0] = parseFloat(0);
    this.sum_date[0] = this.dateCal;
    var reTDEE = [];
    reTDEE[0] = parseFloat(this.tdee);
    for (var i = 0; i < this.data.length; i++) {
      this.sum_cal[i + 1] = this.sum_cal[i] + parseFloat(this.data[i].Calories);
      reTDEE[i + 1] = reTDEE[i] - parseFloat(this.data[i].Calories);
      this.sum_date[i + 1] = this.dateCal;
    }
    this.Remaining_calories = this.sum_cal[this.sum_cal.length - 1];
    this.remainingTDEE = reTDEE[reTDEE.length - 1].toFixed(2);
  },
  methods: {
    graphCal() {
      var ctx = document.getElementById("my-chart");
      Chart.defaults.line.spanGaps = true;

      var myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.AllDate,
          datasets: [
            {
              label: "แคลอรี",
              data: this.AllCal,
              backgroundColor: ["rgba(255, 159, 64, 0.2)"],
              borderColor: ["rgba(255, 159, 64, 1)"],
            },
            {
              label: "BMR",
              data: this.chartBmr,
              fill: false,
              borderColor: ["#e9c46a"],
            },
            {
              label: "TDEE",
              data: this.chartTdee,
              fill: false,
              borderColor: ["#e76f51"],
            },
          ],
        },
        options: {
          elements: {
            line: {
              tension: 0, // disables bezier curves
            },
          },
        },
      });
      // this.get_all_cal();
      console.log(myLineChart);
    },
    graphWeight() {
      var ctx = document.getElementById("my-chart-Weight");
      Chart.defaults.line.spanGaps = true;

      var myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.dayCha,
          datasets: [
            {
              label: "น้ำหนัก",
              data: this.weightCha,
              backgroundColor: ["rgba(255, 159, 64, 0.2)"],
              borderColor: ["rgba(255, 159, 64, 1)"],
            },
          ],
        },
        options: {
          elements: {
            line: {
              tension: 0, // disables bezier curves
            },
          },
        },
      });
      // this.get_all_cal();
      console.log(myLineChart);
    },
    async gatSevDay() {
      var count = 0;
      var countDate = 0;
      
      for (var j = 0; j < 7; j++) {
        var day = new Date(this.dateData);
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + j);
        var getdata =
          (nextDay.getMonth() +1) +
          ":" +
          nextDay.getDate() +
          ":" +
          nextDay.getFullYear();
        //console.log(getdata);
        var dataCalUser = database.ref(
          "/AuthenAcount/" + this.nameDB + "/Calories/" + getdata + "/"
        );
        var collection = [];
        dataCalUser.on("child_added", (snap) => {
          collection = snap.val();
          // console.log("collectionin", collection);
        });
        
        this.AllCal[count] = parseFloat(0);
        //  console.log(collection.length);
        for (var k = 0; k < (await collection.length); k++) {
          count += 1;

          this.AllDate[countDate] = collection[k].date;
          this.chartTdee[countDate] = this.tdee;
          this.chartBmr[countDate] = this.bmr;
          if (k == collection.length - 1) {
            this.AllDate[countDate] = collection[k].date;
            this.chartTdee[countDate] = this.tdee;
            this.chartBmr[countDate] = this.bmr;
            countDate += 1;
            this.AllDate[countDate] = collection[k].date;
            this.chartTdee[countDate] = this.tdee;
            this.chartBmr[countDate] = this.bmr;
          }
          this.AllCal[count] =
            parseFloat(this.AllCal[count - 1]) +
            parseFloat(collection[k].Calories);
          countDate += 1;
       
        }
         if(collection.length !== 0){
          count += 1;
        }
        
      }
      await this.graphCal();
    },
    async start21DayChallenge(){
      var nextDay = new Date();
      var dataDate= database.ref("/AuthenAcount/" + this.nameDB + "/Weight/");
      if(await this.dateChallenge.date === (nextDay.getMonth() +1) + "/" + nextDay.getDate() + "/" + nextDay.getFullYear())
      {
        Swal.fire({
        title: "คุณแน่ใจที่จะเริ่ม 21 Day Challenge?",
        text:
          "คุณแน่ใจที่จะเริ่ม 21 Day Challenge ซึ่งวันเริ่มต้นคือ " + this.dateChallenge.date+
          ' นับไปอีก 21 วัน',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f87030",
        cancelButtonColor: "#444444",
        confirmButtonText: "บันทึก",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.value) {
          dataDate.child(this.keyCha).update({ 
          date:this.dateChallenge.date ,
          weight: this.dateChallenge.weight,
          status: "start"
          });
          Swal.fire({
            title:"สำเร็จ!",
            text:"คุณได้ทำการเก็บข้อมูลน้ำหนักเรียบร้อยแล้ว.",
            icon:"success"
            }).then((result) =>{
              if (result.value) {
                window.location.reload();
              }
              else{
                setTimeout(() => window.location.reload(), 1000);
              }
            }
            );
           
        }
      });
      }
      else{
        alert("คุณยังไม่ทำการบันทึกน้ำหนักของคุณในวันนี้")
      }
    },
    async gat21Day() {
      this.dayCha = []
      this.weightCha = []
      var data21Day = database.ref("/AuthenAcount/" + this.nameDB + "/Weight/");
      var date1 = new Date(this.startDay);
      data21Day.on("child_added", (snap) => {
        var date2 = new Date(snap.val().date);
        
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        
        if(Difference_In_Days >= 0 && Difference_In_Days < 21){
          this.dayCha.push(snap.val().date)
          this.weightCha.push(snap.val().weight)
        }
      })
      await this.graphWeight();
    },
  },
};
</script>

<style scoped>
#div_img {
  max-width: 15%;
  width: 50px;
  height: 150px;
}
.chart {
  height: 100px;
}
#div_chart {
  margin: 25px;
}
#showBBT {
  text-align: center;
  border-left: 2px solid #444444;
}
#reTDEE {
  text-align: center;
}
.div_table {
  padding: 50px;
}
#div_det {
  max-width: 50%;
  width: 200px;
}
.row {
  margin-right: 0px;
}
.profile {
  background-color: #efefef;
}
.btn_cal {
  width: 50%;
  padding: 10px;
  border-radius: 25px;
  background-color: #f87030;
  border: 0;
  color: #ffffff;
  margin: 25px auto 25px auto;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
#saveWeight{
  background-color: #F87030; 
  border-color: #F87030; 
  color:#ffffff; 
}
@media only screen and (max-width: 1024px) {
  #div_img {
    max-width: 50%;
    width: 200px;
    height: 100px;
  }
  #div_det {
    max-width: 50%;
    width: 200px;
  }
  .chart {
    height: 1500px;
  }
  #div_chart {
    margin: 10px;
  }
  .div_table {
    padding: 100px;
  }
  #showBBT {
    padding-top: 50px;
    text-align: left;
    border-left: 0px;
  }
  #reTDEE {
    text-align: left;
    border-left: 0px;
}
  h1 {
    font-size: 25px;
  }
  .div_table {
    padding: 50px;
  }
   .btn_cal {
    width: 100%;
    padding: 5px;
    border-radius: 25px;
    background-color: #f87030;
    border: 0;
    font-size: 12px;
    color: #ffffff;
    margin-bottom: 16px;
    box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
  }
  #saveWeight{
  background-color: #F87030; 
  border-color: #F87030; 
  color:#ffffff; 
  font-size: 14px;
}
}
</style>