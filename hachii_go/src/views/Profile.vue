<template>
  <div>
    <div class="row" style="padding: 50px 50px 25px 50px;">
      <div class="col" id="div_img">
        <img :src="img" style="width: 120px;  height: 120px; border: 4px solid #f87030; border-radius: 100%;" alt />
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
          
        
      </div>
    </div>
    <div class="div_table">
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
              <th>ค่าแคลอรี่</th>
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
      // all_date: [],
    };
  },
  async created() {
    await firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.nameDB = firebaseUser.uid;
      this.name = firebaseUser.displayName;
      this.email = firebaseUser.email;
      this.img = firebaseUser.photoURL;
    });
    var dataRef = database.ref("/AuthenAcount/" + this.nameDB + "/Data/");

    await dataRef.on("child_added", (snapshot) => {
      this.dateData = snapshot.val().date;
      this.tdee = snapshot.val().tdee;
      this.bmr = snapshot.val().bmr;
      this.bmi = snapshot.val().bmi;
      // this.all_date.push(snapshot.val());
    });
    //await this.gatSevDay();

    const today = new Date();
    var onedate =
      (today.getMonth() + 1) + ":" + today.getDate() + ":" + today.getFullYear();
    var dataCalUserOne = database.ref(
      "/AuthenAcount/" + this.nameDB + "/Calories/" + onedate + "/"
    );
    dataCalUserOne.on("child_added", (snap1) => {
      this.data = snap1.val();
      this.dateCal = snap1.val()[0].date;
    });
    //console.log(this.data);
    

    //await this.click();
  },
  async updated() {
     if(await this.dateData){
       this.gatSevDay()
       setTimeout(() => this.gatSevDay(), 2000);
     }
    //await setTimeout(() => this.click(), 3000);
    this.sum_cal[0] = parseFloat(this.tdee);
    this.sum_date[0] = this.dateCal;
    for (var i = 0; i < this.data.length; i++) {
      this.sum_cal[i + 1] = (
        this.sum_cal[i] - parseFloat(this.data[i].Calories)
      ).toFixed(2);
      this.sum_date[i + 1] = this.dateCal;
    }
    this.Remaining_calories = this.sum_cal[this.sum_cal.length - 1];
  },
  methods: {
    click() {
      var ctx = document.getElementById("my-chart");
      Chart.defaults.line.spanGaps = true;

      var myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.AllDate,
          datasets: [
            {
              label: "แคลอรี่",
              data: this.AllCal,
              backgroundColor: ["rgba(255, 159, 64, 0.2)"],
              borderColor: ["rgba(255, 159, 64, 1)"],
            },
          ],
        },
        options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
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
          nextDay.getMonth() +
          1 +
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
        //console.log("collectionin", collection);
        });
        //await console.log("collection", collection);
        this.AllCal[count] = parseFloat(this.tdee);
        for (var k = 0; k < await collection.length; k++) {
          count += 1;

          this.AllDate[countDate] = collection[j].date;
          
          if (k == collection.length - 1) {
            this.AllDate[countDate] = collection[j].date;
            countDate += 1;
            this.AllDate[countDate] = collection[j].date;
          }
          this.AllCal[count] =
            parseFloat(this.AllCal[count - 1]) -
            parseFloat(collection[k].Calories);
          countDate += 1;
        }
        count += 1;
      }
      this.click() 
      
    },
    // get_all_cal() {
    //   // get date
    //   var date_all = [];
    //   for (var k = 0; k < this.all_date.length; k++) {
    //     date_all[k] = this.all_date[k].date;
    //   }
    //   this.all_date = date_all;
    //   console.log("all_date", this.all_date);
    //   for (var i = 0; i < this.all_date.length; i++) {
    //     var str_date = this.all_date[i];
    //     str_date = str_date.replace("/", ":");
    //     str_date = str_date.replace("/", ":");
    //     var dataCalUser = database.ref(
    //       "/AuthenAcount/" + this.nameDB + "/Calories/" + str_date + "/"
    //     );

    //     dataCalUser.on("child_added", (snapshot2) => {
    //       this.data = snapshot2.val();
    //     });
    //   }
    // },
  },
};
</script>

<style>
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
.div_table {
  padding: 50px;
}
#div_det {
    max-width: 50%;
    width: 200px;
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
  h1 {
    font-size: 25px;
  }
  .div_table {
    padding: 50px;
  }
}
</style>