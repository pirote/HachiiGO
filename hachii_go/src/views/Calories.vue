<template>
  <div class="about">
    <div class="search-wrapper panel-heading col-sm-12" style="padding:0px 35px 25px 35px;">
      <h3>ค้นหา</h3>
      <input
        class="form-control"
        type="text"
        v-model="searchQuery"
        placeholder="ชื่ออาหาร/ปริมาณ/แคลอรี"
        style="
            box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada; 
            border-radius: 50px;
            background-color: #F9F9F9;
            "
      />
    </div>
    <div class="div_table">
      <div class="div_hachii">
        <hr />
        <div class="row">
          <div class="col">Hachii meal bar</div>
          <div class="col">1 แท่น</div>
          <div class="col">170 cal</div>
          <div class="col">
            <a class="btn_add" target="_blank" v-on:click="addCalory(hachii)">กด</a>
          </div>
        </div>
        <hr />
      </div>
      <div v-if="this.dataFavorite.length !== 0 ">
        <h6>รายการโปรด</h6>
        <table class="table borderless" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataFavorite" :key="item.id">
              <td>
                <a target="_blank">{{ item.Food }}</a>
              </td>
              <td>
                <a target="_blank">{{ item.Unit }}</a>
              </td>
              <td>
                <a target="_blank">{{ item.Calories }}</a>
              </td>
              <td style="padding: 0.75rem 0px 0.75rem 0px; text-align: right;">
                <a class="btn_add" target="_blank" v-on:click="addCalory(item)">กด</a>
              </td>
              <td style="text-align: right;">
                <a
                  target="_blank"
                  class="card-link"
                  style="color: #ff4a4a;"
                  v-on:click="delfavorite(item.key)"
                >
                  <svg
                    id="Layer_1"
                    enable-background="new 0 0 512 512"
                    height="18"
                    viewBox="0 0 512 512"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"
                      />
                      <path
                        d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
                      />
                      <path
                        d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
                      />
                      <path
                        d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
                      />
                    </g>
                  </svg>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="menu_bar">
        <b-form-group style="text-align: left; padding-left:16px;">
          <b-form-radio-group
            style="padding:5px; "
            v-model="collection"
            :options="op_collection"
            :key="collection.paId"
          ></b-form-radio-group>
        </b-form-group>
      </div>

      <div style="text-align: center;">
        <button class="btn_add_cal" v-on:click="addNewCal()">+ เพิ่มข้อมูลอาหาร</button>
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th>ชื่ออาหาร</th>
            <th>ปริมาณ</th>
            <th>ค่าแคลอรี</th>
            <th style="padding: 0.75rem 0px 0.75rem 0px; text-align: right;">เพิ่ม</th>
            <th style="padding: 0.75rem 0.85rem 0.75rem 0px; text-align: right;">รายการโปรด</th>
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
            <td style="padding: 0.75rem 0px 0.75rem 0px; text-align: right;">
              <a class="btn_add" target="_blank" v-on:click="addCalory(item)">กด</a>
            </td>
            <td style="text-align: right;">
              <a target="_blank" style="color: #008cff;" v-on:click="addfavorite(item)">
                <svg
                  id="Capa_1"
                  enable-background="new 0 0 512 512"
                  height="18"
                  viewBox="0 0 512 512"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <g>
                      <path
                        d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
                          c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
                          S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
                          c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
                            c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
                            c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
                            l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202
                            L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955
                            C443.754,73.631,440.467,81.575,434.603,87.419z"
                      />
                    </g>
                  </g>
                </svg>
              </a>
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
      dataOther: [],
      collection: "",
      checkTime: "",
      sumtdee: "",
      hachii: {
        Calories: 170,
        Food: "Hachii meal bar",
        Unit: "1 แท่น",
      },
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
        { value: "อื่นๆ", text: "อื่นๆ" },
      ],
      dataFavorite: [],
      email:""
    };
  },
  components: {
    Pagination,
  },
  async created() {
    await firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.nameDB = firebaseUser.uid;
      this.email = firebaseUser.email;
    });
    var dataTime = database.ref("/AuthenAcount/" + this.nameDB + "/Data/");
    await dataTime.on("child_added", (snapshot) => {
      this.checkTime = snapshot.val().date;
      this.sumtdee = snapshot.val().tdee;
    });
    var datafavorite = database.ref(
      "/AuthenAcount/" + this.nameDB + "/Favorite/"
    );
    await datafavorite.on("child_added", (snapshot) => {
      this.dataFavorite.push({ ...snapshot.val(), key: snapshot.key });
    });

    await datafavorite.on("child_removed", (snapshot) => {
      const del = this.dataFavorite.find((mgs) => mgs.key == snapshot.key);
      const index = this.dataFavorite.indexOf(del);
      this.dataFavorite.splice(index, 1);
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
    this.Other();
    this.collection = "ไข่";
    this.dataAll = this.dataEggs;
  },
  updated() {
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
    if (this.collection === "อื่นๆ") {
      this.dataAll = this.dataOther;
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
    async Other() {
      var dataRef = database.ref("/FoodData/Other");
      await dataRef.on("child_added", (snapshot) => {
        this.dataOther.push(snapshot.val());
      });
    },
    async addCalory(value) {
      console.log(value);
      const today = new Date();
      var date =
        today.getMonth() +
        1 +
        ":" +
        today.getDate() +
        ":" +
        today.getFullYear();
      var dateT =
        today.getMonth() +
        1 +
        "/" +
        today.getDate() +
        "/" +
        today.getFullYear();
      var date1 = new Date(this.checkTime);
      var date2 = new Date(dateT);

      // To calculate the time difference of two dates
      var Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if ((await Difference_In_Days) < 7) {
        await this.sendData(value, dateT, date);
      } else {
        alert("สัปดาห์นี้ยังไม่มีการบันทึกข้อมูลแคลอรีต่อวัน");
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
        Unit: value.Unit,
        date: dateT,
      });
      Swal.fire({
        title: "คุณแน่ใจหรือไม่ในการเพิ่ม?",
        text:
          "คุณแน่ใจในการเพิ่ม " +
          value.Food +
          " ค่าแคลอรี " +
          value.Calories +
          "\nเพิ่มแล้วไม่สามารถลบได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f87030",
        cancelButtonColor: "#444444",
        confirmButtonText: "เพิ่ม",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.value) {
          if (key) {
            dataRef.child(key).update({ ...data });
          } else {
            dataRef.push({ ...data });
          }
          Swal.fire(
            "สำเร็จ!",
            "คุณได้ทำการเพิ่มแคลอรีต่อวันเรียบร้อย.",
            "success"
          );
        }
      });
    },
    addfavorite(value) {
      Swal.fire("เพิ่มรายการโปรด", "เพิ่มรายการอาหารโปรดเรียบร้อย", "success");
      var dataRef = database.ref("/AuthenAcount/" + this.nameDB + "/Favorite/");
      dataRef.push({ ...value });
    },
    delfavorite(value) {
      var dataRef = database.ref("/AuthenAcount/" + this.nameDB + "/Favorite/");
      Swal.fire({
        title: "ลบข้อมูล?",
        text: "คุณแน่ใจที่จะลบข้อมูลออกจากรายการโปรด",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f87030",
        cancelButtonColor: "#313131",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: "ลบเสร็จสิ้น!",
            text: "คุณได้ลบข้อมูลสำเร็จเรียบร้อยแล้ว.",
            icon: "success",
            confirmButtonColor: "#f87030",
          });
          dataRef.child(value).remove();
        }
      });
    },
    addNewCal() {
      console.log("Add New Cal");
      Swal.fire({
        title: "<h3>เพิ่มรายการอาหาร</h3>",
        html:
          `<p>เพิ่มรายการอาหารและค่าแคลอรี ทั้งนี้รายการที่คุณเพิ่มจะยังไม่เข้าสู่ฐานข้อมูลรายการอาหารต้องรอการยืนยันจากทางแพทย์ของทางเราก่อน</p>` +
          `<div class="form-row"><div style="text-align: left; padding:5px;"><label for="validationCustom01">ชื่ออาหาร:</label><input type="text" class="form-control" id="addFood" placeholder="ชื่ออาหาร" >` +
          `<div class="form-row"><div  style="text-align: left; padding:5px;"><label for="validationCustom01">ปริมาณ:</label><input type="text" class="form-control" id="addUnit" placeholder="123 g" > ` +
          `<div class="form-row"><div style="text-align: left; padding:5px;"><label for="validationCustom01">ค่าแคลอรี:</label><input type="text" class="form-control" id="addCal" placeholder="123" >`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "ตกลง",
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: "ยกเลิก",
        cancelButtonAriaLabel: "Thumbs down",
        confirmButtonColor: "#f87030",
        cancelButtonColor: "#313131",
        preConfirm: () => [
          document.getElementById("addCal").value,
          document.getElementById("addFood").value,
          document.getElementById("addUnit").value
        ]
      }).then((result) => {
        if (result.value) {
          var dataRef = database.ref("/DataWaitConfirm/");
          dataRef.push({
            Calories: result.value[0],
            Food: result.value[1],
            Unit: result.value[2],
            credit: this.email 
          });
        }
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
  width: 50%;
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
.btn_add {
  background-color: #f87030;
  padding: 5px 16px 5px 16px;
  border-radius: 5px;
  color: #ffffff;
}
.btn_add:hover {
  background-color: #444444;
  padding: 5px 16px 5px 16px;
  border-radius: 5px;
  color: #ffffff;
}
.div_hachii {
  padding: 0px 100px 0px 100px;
  text-align: center;
}
.borderless td,
.borderless th {
  border: none;
}
.btn_add_cal {
  width: 50%;
  padding: 16px;
  border-radius: 25px;
  background-color: #f87030;
  border: 0;
  color: #ffffff;
  margin: 25px auto 25px auto;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
@media only screen and (max-width: 1024px) {
  .menu_bar {
    width: 100%;
    font-size: 12px;
  }
  .div_hachii {
    padding: 0px 0px 0px 0px;
    text-align: left;
    font-size: 12px;
  }
  .table {
    font-size: 12px;
    vertical-align: center;
  }
  .btn_add {
    background-color: #f87030;
    padding: 4px 7px 4px 7px;
    border-radius: 5px;
    color: #ffffff;
  }
  .btn_add:hover {
    background-color: #f87030;
    padding: 4px 7px 4px 7px;
    border-radius: 5px;
    color: #ffffff;
  }
  .btn_add_cal {
    width: 100%;
    padding: 5px;
    border-radius: 25px;
    background-color: #f87030;
    border: 0;
    color: #ffffff;
    margin-bottom: 16px;
    box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
  }
  .div_table {
  padding: 0px 10px 10px 10px;
  width: 100%;
}
}
</style>
