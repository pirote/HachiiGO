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
var database = firebase.database();
const perPageOptions = [20, 50, 100];
export default {
  data() {
    return {
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
  created() {
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
                item.itemID.toLowerCase().includes(v) ||
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
      var dataRef = database.ref("/Eggs");
      await dataRef.on("child_added", (snapshot) => {
        this.dataEggs.push(snapshot.val());
      });
    },
    async gatFish() {
      var dataRef = database.ref("/Fish");
      await dataRef.on("child_added", (snapshot) => {
        this.dataFish.push(snapshot.val());
      });
    },
    async gatFruits() {
      var dataRef = database.ref("/Fruits");
      await dataRef.on("child_added", (snapshot) => {
        this.dataFruits.push(snapshot.val());
      });
    },
    async gatMeat() {
      var dataRef = database.ref("/Meat");
      await dataRef.on("child_added", (snapshot) => {
        this.dataMeat.push(snapshot.val());
      });
    },
    async gatMilk() {
      var dataRef = database.ref("/Milk");
      await dataRef.on("child_added", (snapshot) => {
        this.dataMilk.push(snapshot.val());
      });
    },
    async gatNoodle() {
      var dataRef = database.ref("/NoodleDishes");
      await dataRef.on("child_added", (snapshot) => {
        this.dataNoodle.push(snapshot.val());
      });
    },
    async gatNuts() {
      var dataRef = database.ref("/Nuts");
      await dataRef.on("child_added", (snapshot) => {
        this.dataNuts.push(snapshot.val());
      });
    },
    async gatRiceD() {
      var dataRef = database.ref("/RiceDishes");
      await dataRef.on("child_added", (snapshot) => {
        this.dataRice.push(snapshot.val());
      });
    },
    async gatRiceN() {
      var dataRef = database.ref("/RiceNoodles");
      await dataRef.on("child_added", (snapshot) => {
        this.dataRiceN.push(snapshot.val());
      });
    },
    async Vegetables() {
      var dataRef = database.ref("/Vegetables");
      await dataRef.on("child_added", (snapshot) => {
        this.dataVegetables.push(snapshot.val());
      });
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
@media only screen and (max-width: 1024px) {
  .menu_bar {
    width: 100%;
  }
}
</style>