<template>
  <div class="hello">
    <h3>คํานวณแคลอรี</h3>
    <hr />
    <div class="row" id="sum">
      <div class="col">
        <div class="form-group">
          <h5 for="exampleInputEmail1" style="text-align: left;">เพศ:</h5>
          <b-form-group style="text-align: left; padding-left:16px;">
            <b-form-radio-group v-model="sex" :options="op_sex" :key="sex.paId"></b-form-radio-group>
          </b-form-group>
        </div>
        <h5 for="exampleInputEmail1" style="text-align: left;">ข้อมูลส่วนตัว:</h5>
        <div class="row" style="text-align: left;">
          <div class="col">
            <label for="exampleInputEmail1">น้ำหนัก</label>
            <input type="number" class="form-control" v-model="weight" placeholder="กิโลกรัม" />
          </div>
          <div class="col" style="margin-top:20px;">
            <b-button
              id="saveWeight"
              class="previous round"
              v-on:click="sendWeight"
            >บันทึกน้ำหนักในแต่ละวัน</b-button>
          </div>
        </div>
        <div class="row" style="text-align: left;">
          <div class="col">
            <label for="exampleInputEmail1">ส่วนสูง</label>
            <input type="number" class="form-control" v-model="height" placeholder="เซนติเมตร" />
          </div>
          <div class="col">
            <label for="exampleInputEmail1">อายุ</label>
            <input type="number" class="form-control" v-model="age" placeholder="ปี" />
          </div>
        </div>
        <br />
        <b-form-group label="การออกกำลังกาย" style="text-align: left;">
          <b-form-radio-group
            v-model="exercise"
            :options="op_exercise"
            :key="exercise.paId"
            stacked
          ></b-form-radio-group>
        </b-form-group>
        <b-button style="background-color: #F87030; border-color: #F87030;" v-on:click="sum">คำนวณ</b-button>
      </div>
      <div class="col" id="show">
        <div class="div_dit" style="padding-top:16px;">
          <h1>TDEE</h1>
        </div>
        <div class="tdee">
          <h1 style="font-size: 64px;">{{this.tdee}}</h1>
        </div>
        <div class="div_dit">
          <p style="padding-top: 100px;">พลังงานสูงสุดที่ร่างกายต้องการ</p>
        </div>

        <hr />
        <b-button
          v-if="this.nameDB !== ''"
          style="background-color: #ffffff; border-color: #ffffff; color:#F87030; margin:10px;"
          v-on:click="save"
        >บันทึก</b-button>
      </div>
    </div>
    <b-button
      style="background-color: #F87030; border-color: #F87030; color:#ffffff; margin:10px;"
      class="previous round"
      v-on:click="back"
    >&#8249; กลับ</b-button>
  </div>
</template>

<script>
import firebase from "firebase";
import Swal from "sweetalert2";
var database = firebase.database();
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      sex: "",
      age: "",
      height: "",
      weight: "",
      show_age: "",
      show_height: "",
      show_weight: "",
      exercise: "",
      bmi: 0,
      bmr: null,
      tdee: null,
      op_sex: [
        { value: "ชาย", text: "ชาย" },
        { value: "หญิง", text: "หญิง" },
      ],
      op_exercise: [
        { value: 1.2, text: "ไม่ออกกำลังกายหรือทำงานนั่งโต๊ะ" },
        { value: 1.375, text: "ออกกำลังกายเบาๆ (1-2 ครั้งต่อสัปดาห์)" },
        { value: 1.55, text: "ออกกำลังกายปานกลาง (3-5 ครั้งต่อสัปดาห์)" },
        { value: 1.725, text: "ออกกำลังกายหนัก (6-7 ครั้งต่อสัปดาห์)" },
        { value: 1.9, text: "ออกกำลังกายหนักมาก (ทุกวัน วันละ 2 เวลา)" },
      ],
      nameDB: "",
      statusWeight:""
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.nameDB = firebaseUser.uid;
      //console.log("firebaseUser", this.nameDB);
    });
    
  },
  methods: {
    sum() {
      if (!this.sex) {
        alert("กรุณาเลือกข้อมูลเพศ");
      } else if (!this.weight) {
        alert("กรุณากรอกข้อมูลน้ำหนัก");
      } else if (!this.height) {
        alert("กรุณากรอกข้อมูลความสูง");
      } else if (!this.age) {
        alert("กรุณากรอกข้อมูลอายุ");
      } else if (!this.exercise) {
        alert("กรุณาเลือกข้อมูลการออกกำลังการ");
      } else {
        var weight = parseInt(this.weight);
        var height = parseInt(this.height);
        var age = parseInt(this.age);
        this.bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
        //console.log(this.bmi);
        if (this.sex === "ชาย") {
          this.bmr = (66 + 13.7 * weight + 5 * height - 6.8 * age).toFixed(2);
          this.tdee = (this.bmr * this.exercise).toFixed(2);
        }
        if (this.sex === "หญิง") {
          this.bmr = (665 + 9.6 * weight + 1.8 * height - 4.7 * age).toFixed(2);
          this.tdee = (this.bmr * this.exercise).toFixed(2);
        }
        this.show_age = age;
        this.show_height = height;
        this.show_weight = weight;
        //console.log("BMR: ", this.bmr);
        //console.log("TDEE: ", this.tdee);
      }
    },
    back() {
      this.clear();
      this.$emit("close_calories", "default");
    },
    async save() {
      if (this.tdee) {
        const today = new Date();
        const date =
          today.getMonth() +
          1 +
          "/" +
          today.getDate() +
          "/" +
          today.getFullYear();
        var dataCheck = database.ref("/AuthenAcount/" + this.nameDB + "/Data/");

        var checkTime = "true";
        await dataCheck.on("child_added", (snapshot) => {
          if (snapshot.val().date === date) {
            checkTime = "false";
          }
        });
        if (checkTime === "true") {
          Swal.fire({
            title: "คุณแน่ใจที่จะบันทึก?",
            text: "คุณแน่ใจที่จะบันทึกข้อมูลแคลอรี่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f87030",
            cancelButtonColor: "#444444",
            confirmButtonText: "บันทึก",
            cancelButtonText: "ยกเลิก",
          }).then((result) => {
            if (result.value) {
              var dataRef = database.ref(
                "/AuthenAcount/" + this.nameDB + "/Data/"
              );
              dataRef.push({
                tdee: this.tdee,
                date:
                  today.getMonth() +
                  1 +
                  "/" +
                  today.getDate() +
                  "/" +
                  today.getFullYear(),
                bmr: this.bmr,
                bmi: this.bmi,
              });
              Swal.fire({
                title: "สำเร็จ!",
                text: "คุณได้ทำการเก็บข้อมูลน้ำหนักเรียบร้อยแล้ว.",
                icon: "success",
              }).then((result) => {
                if (result.value) {
                  this.clear();
                }
                else{
                  setTimeout(() => this.clear(), 1000);
                }
              });
            }
          });
        } else {
          alert("คุณได้บันทึกข้อมูลพลังงานสูงสุดที่ร่างกายต้องของวันที่แล้ว!");
        }
      } else {
        alert("กรุณากรอกข้อมูลก่อนบันทึก");
      }
    },
    clear() {
      this.sex = "";
      this.age = "";
      this.height = "";
      this.weight = "";
      this.show_age = "";
      this.show_height = "";
      this.show_weight = "";
      this.exercise = "";
      this.bmr = null;
      this.tdee = null;
    },
    async sendWeight() {
      var weight = parseFloat(this.weight);
      var dataRef = database.ref("/AuthenAcount/" + this.nameDB + "/Weight/");
      const today = new Date();
      var date =
        today.getMonth() +
        1 +
        "/" +
        today.getDate() +
        "/" +
        today.getFullYear();
        dataRef.on("child_added", (snap) => {
        if (snap.val().date === date) {
          this.statusWeight = "true";
        } else {
          this.statusWeight = "false";
        }
        });
      if (await this.statusWeight === "true") {
        alert("คุณได้ทำการบันทึกน้ำหนักในแต่ละวันของวันนี้แล้ว");
      } else {
        Swal.fire({
          title: "คุณแน่ใจหรือไม่ในการบันทึก?",
          text: "คุณแน่ใจในการเก็บข้อมูลน้ำหนักแต่ละวัน ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f87030",
          cancelButtonColor: "#444444",
          confirmButtonText: "บันทึก",
          cancelButtonText: "ยกเลิก",
        }).then((result) => {
          if (result.value) {
            dataRef.push({
              weight: weight,
              date: date,
            });
            Swal.fire(
              "สำเร็จ!",
              "คุณได้ทำการเก็บข้อมูลน้ำหนักเรียบร้อยแล้ว.",
              "success"
            );
          }
        });
      }
    },
  },
};
</script>
<style>
#saveWeight {
  background-color: #f87030;
  border-color: #f87030;
  color: #ffffff;
  margin: 10px;
}
.hello {
  margin: 10px 50px 50px 50px;
  background-color: #ffffff;
  text-align: center;
  padding: 16px;
}
.tdee {
  text-align: center;
  padding-top: 100px;
  height: 150px;
}
#show {
  background-color: #f87030;
  border-radius: 10px;
  margin: 16px;
  color: #ffffff;
}
#sum {
  padding-top: 16px;
  padding-left: 16px;
  background-color: #fbfbfb;
}
@media only screen and (max-width: 1024px) {
  #saveWeight {
    background-color: #f87030;
    border-color: #f87030;
    color: #ffffff;
    margin: 10px;
    font-size: 12px;
  }
  .col {
    max-width: 100%;
  }
  .hello {
    margin: 10px 16px 50px 16px;
    background-color: #ffffff;
    text-align: center;
    padding: 16px;
  }
  .div_dit {
    text-align: center;
    width: 250px;
    margin: 0;
  }
}
</style>
