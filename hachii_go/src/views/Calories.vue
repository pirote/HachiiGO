<template>
  <div class="about">
    <div class="search-wrapper panel-heading col-sm-12" style="padding:0px 35px 25px 35px;">
      <h3>ค้นหา</h3>
      <input
        class="form-control"
        type="text"
        v-model="searchQuery"
        placeholder="ชื่ออาหาร/ปริมาณ/แคลอรี่"
        style="
            box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada; 
            border-radius: 50px;
            background-color: #F9F9F9;
            "
      />
    </div>
    <div class="div_table">
      <div class="menu_bar">
        <!--button v-no:click="all">ทั้งหมด</button-->
        <b-form-group style="text-align: left; padding-left:16px;">
          <b-form-radio-group v-model="collection" :options="op_collection" :key="collection.paId"></b-form-radio-group>
        </b-form-group>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ชื่ออาหาร</th>
            <th>ปริมาณ</th>
            <th>ค่าแคลอรี่</th>
            <th>เพิ่ม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in resultQuery" :key="item.id">
            <td>
              <a target="_blank">{{ item.Food }}</a>
            </td>
            <td>
              <a target="_blank">{{ item.Unit }}</a>
            </td>
            <td>
              <a target="_blank">{{ item.Calories }}</a>
            </td>
            <td>
              <a class="btn_add" target="_blank" v-on:click="addCalory(item)">กด</a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        v-if="this.dataAll"
        :totalRecords="this.dataAll.length"
        :perPageOptions="perPageOptions"
        v-model="pagination"
      />
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";
var database = firebase.database();
const perPageOptions = [20, 50, 100];
export default {
  data() {
    return {
      nameDB: "",
      searchQuery: null,
      perPageOptions,
      pagination: { page: 1, perPage: perPageOptions[1] },
      dataAll: [],
      sumdata: [],
      dataEggs: [],
      dataFish: [],
      dataFruits: [],
      dataMeat: [],
      dataMilk: [],
      dataNoodle: [],
      dataNuts: [],
      dataRice: [],
      dataRiceN: [],
      dataVegetables: [],
      collection: "",
      checkTime: "",
      sumtdee: "",
      op_collection: [
        { value: "ไข่", text: "ไข่" },
        { value: "ปลา", text: "ปลา" },
        { value: "ผลไม้", text: "ผลไม้" },
        { value: "เนื้อ", text: "เนื้อ" },
        { value: "นม", text: "นม" },
        { value: "ก๋วยเตี๋ยว", text: "ก๋วยเตี๋ยว" },
        { value: "ถั่ว", text: "ถั่ว" },
        { value: "ข้าวแกง", text: "ข้าวแกง" },
        { value: "ข้าว", text: "ข้าว" },
        { value: "ผัก", text: "ผัก" },
      ],
    };
  },
  components: {
    Pagination,
  },
  async created() {
    await firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.nameDB = firebaseUser.displayName + "(" + firebaseUser.uid + ")";
    });
    var dataTime = database.ref("/AuthenAcount/" + this.nameDB + "/Data/");
    await dataTime.on("child_added", (snapshot) => {
      this.checkTime = snapshot.val().date;
      this.sumtdee = snapshot.val().tdee;
    });
    this.gatEggs();
    this.gatFish();
    this.gatFruits();
    this.gatMeat();
    this.gatMilk();
    this.gatNoodle();
    this.gatNuts();
    this.gatRiceD();
    this.gatRiceN();
    this.Vegetables();
    this.collection = "ไข่";
    this.dataAll = this.dataEggs;
    // ทั้งหมด
    // await this.sumdata.push(this.dataEggs)
    // await this.sumdata.push(this.dataFish)
    //await this.sumdata.push(this.dataFruits)
    //await this.sumdata.push(this.dataMeat)
    //await this.sumdata.push(this.dataMilk)
    //await this.sumdata.push(this.dataNoodle)
    //await this.sumdata.push(this.dataNuts)
    //await this.sumdata.push(this.dataRice)
    //await this.sumdata.push(this.dataRiceN)
    //await this.sumdata.push(this.dataVegetables)
  },
  updated() {
    //  ทั้งหมด
    // if(this.collection === "ทั้งหมด"){
    //   this.dataAll = this.sumdata
    // }
    if (this.collection === "ไข่") {
      this.dataAll = this.dataEggs;
    }
    if (this.collection === "ปลา") {
      this.dataAll = this.dataFish;
    }
    if (this.collection === "ผลไม้") {
      this.dataAll = this.dataFruits;
    }
    if (this.collection === "เนื้อ") {
      this.dataAll = this.dataMeat;
    }
    if (this.collection === "นม") {
      this.dataAll = this.dataMilk;
    }
    if (this.collection === "ก๋วยเตี๋ยว") {
      this.dataAll = this.dataNoodle;
    }
    if (this.collection === "ถั่ว") {
      this.dataAll = this.dataNuts;
    }
    if (this.collection === "ข้าวแกง") {
      this.dataAll = this.dataRice;
    }
    if (this.collection === "ข้าว") {
      this.dataAll = this.dataRiceN;
    }
    if (this.collection === "ผัก") {
      this.dataAll = this.dataVegetables;
    }
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.dataAll.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.Food.toLowerCase().includes(v) ||
                item.Unit.toLowerCase().includes(v) ||
                item.Calories.toString().toLowerCase().includes(v)
            );
        });
      }
      if (this.dataAll) {
        const firstIndex = (this.pagination.page - 1) * this.pagination.perPage;
        const lastIndex = this.pagination.page * this.pagination.perPage;
        return this.dataAll.slice(firstIndex, lastIndex);
      } else {
        return this.dataAll;
      }
    },
  },
  methods: {
    // ทั้งหมด
    // all(){

    //   var mergedArrNormalWay = [];

    //   this.sumdata.forEach(o => {
    //   o.forEach(so => mergedArrNormalWay.push(so))
    //   })

    //   var merged = [].concat.apply([], this.sumdata);
    //   this.dataAll = merged
    // },
    async gatEggs() {
      var dataRef = database.ref("/FoodData/Eggs");
      await dataRef.on("child_added", (snapshot) => {
        this.dataEggs.push(snapshot.val());
      });
    },
    async gatFish() {
      var dataRef = database.ref("/FoodData/Fish");
      await dataRef.on("child_added", (snapshot) => {
        this.dataFish.push(snapshot.val());
      });
    },
    async gatFruits() {
      var dataRef = database.ref("/FoodData/Fruits");
      await dataRef.on("child_added", (snapshot) => {
        this.dataFruits.push(snapshot.val());
      });
    },
    async gatMeat() {
      var dataRef = database.ref("/FoodData/Meat");
      await dataRef.on("child_added", (snapshot) => {
        this.dataMeat.push(snapshot.val());
      });
    },
    async gatMilk() {
      var dataRef = database.ref("/FoodData/Milk");
      await dataRef.on("child_added", (snapshot) => {
        this.dataMilk.push(snapshot.val());
      });
    },
    async gatNoodle() {
      var dataRef = database.ref("/FoodData/NoodleDishes");
      await dataRef.on("child_added", (snapshot) => {
        this.dataNoodle.push(snapshot.val());
      });
    },
    async gatNuts() {
      var dataRef = database.ref("/FoodData/Nuts");
      await dataRef.on("child_added", (snapshot) => {
        this.dataNuts.push(snapshot.val());
      });
    },
    async gatRiceD() {
      var dataRef = database.ref("/FoodData/RiceDishes");
      await dataRef.on("child_added", (snapshot) => {
        this.dataRice.push(snapshot.val());
      });
    },
    async gatRiceN() {
      var dataRef = database.ref("/FoodData/RiceNoodles");
      await dataRef.on("child_added", (snapshot) => {
        this.dataRiceN.push(snapshot.val());
      });
    },
    async Vegetables() {
      var dataRef = database.ref("/FoodData/Vegetables");
      await dataRef.on("child_added", (snapshot) => {
        this.dataVegetables.push(snapshot.val());
      });
    },
    async addCalory(value) {
      const today = new Date();
      var date =  today.getDate() + ":" + (today.getMonth() + 1) + ":" + today.getFullYear();
      var dateT =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

      //console.log("getdbin:", this.checkTime);
      //console.log("getdb:", this.checkTime, "dateT:", dateT);
      if (await this.checkTime === dateT) {
      await this.sendData(value, dateT, date);
      } else {
        alert("ยังไม่มีการบันทึกข้อมูลแคลอรี่ต่อวัน");
      }
    },
    async sendData(value, dateT, date) {
      
        var dataRef = database.ref(
          "/AuthenAcount/" + this.nameDB + "/Calories/" + date + "/"
        );
        let data = [];
        let key = "";
        dataRef.on("child_added", (snapshot) => {
          data = snapshot.val();
          key = snapshot.key;
        });
        data.push({
          Calories: value.Calories,
          Food: value.Food,
          Unit: value.Unit
          })
        Swal.fire({
          title: "คุณแน่ใจหรือไม่ในการเพิ่ม?",
          text: "คุณแน่ใจในการเพิ่ม " + value.Food + " ค่าแคลอรี่ " + value.Calories + '\nเพิ่มแล้วไม่สามารถลบได้',
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f87030",
          cancelButtonColor: "#444444",
          confirmButtonText: "เพิ่ม",
          cancelButtonText: "ยกเลิก",
        }).then((result) => {
          if (result.value) {
            if (key) {
                dataRef.child(key).update({...data});
              
            } else {
              dataRef.push({...data});
            }
            Swal.fire("สำเร็จ!", "คุณได้ทำการเพิ่มแคลอรี่ต่อวันเรียบร้อย.", "success");
          }
        });

        //dataRef.push({ Calories: value.Calories , Food: value.Food, Unit: value.Unit});
        //console.log({ Calories: value.Calories , Food: value.Food, Unit: value.Unit});
      
    },
  },
};
</script>
<style>
.div_table {
  padding: 0px 32px 32px 32px;
  width: 100%;
}
.menu_bar {
  width: 69%;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
  border-radius: 50px;
  background-color: #f9f9f9;
}
.btn_menu {
  background-color: #ffffff00;
  border: 0;
  color: #636363;
  border-radius: 50px;
}
.btn_menu:hover,
.btn_menu:focus,
.btn_menu:active {
  background-color: #f87030;
  border: 0;
  color: #ffffff;
  border-radius: 50px;
}
.btn_add{
  background-color: #f87030;
  padding: 5px 16px 5px 16px;
  border-radius: 5px;
  color: #ffffff;
}
.btn_add:hover{
  background-color: #444444;
  padding: 5px 16px 5px 16px;
  border-radius: 5px;
  color: #ffffff;
}
@media only screen and (max-width: 1024px) {
  .menu_bar {
    width: 100%;
  }
}
</style>
