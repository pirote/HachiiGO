<template>
  <div class="hello">
    <h3>คํานวณแคลอรี่</h3>
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
        <div class="tdee">
          <h1 style="font-size: 64px;">{{this.tdee}}</h1>
        </div>
        <div class="div_dit">
          <p style="padding-top: 100px;">แคลอรี่ที่ร่างกายต้องการต่อวัน</p>
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
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.nameDB = firebaseUser.displayName + "(" + firebaseUser.uid + ")";
      console.log("firebaseUser", this.nameDB);
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
        console.log(this.bmi);
        if (this.sex === "ชาย") {
          this.bmr = (66 + 13.7 * weight + 5 * height - 6.8 * age).toFixed(2);
          this.tdee = (this.bmr * this.exercise).toFixed(2);
        }
        if (this.sex === "หญิง") {
          this.bmr = (66.5 + 9.6 * weight + 1.8 * height - 4.7 * age).toFixed(
            2
          );
          this.tdee = (this.bmr * this.exercise).toFixed(2);
        }
        this.show_age = age;
        this.show_height = height;
        this.show_weight = weight;
        console.log("BMR: ", this.bmr);
        console.log("TDEE: ", this.tdee);
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
        (today.getMonth() + 1) +
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
          var dataRef = database.ref("/AuthenAcount/" + this.nameDB + "/Data/");
          await dataRef.push({
            tdee: this.tdee,
            date: date,
            bmr: this.bmr,
            bmi: this.bmi,
          });
        } else {
          alert("คุณได้บันทึกข้อมูลแคลอรี่ของวันนี้แล้ว!!!");
        }

        this.clear();
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
  },
};
</script>
<style>
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