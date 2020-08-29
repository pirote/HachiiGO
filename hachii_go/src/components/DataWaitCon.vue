<template>
  <div class="div_dataWC">
    <h4>ข้อมูลรอการยืนยัน</h4>
    <div v-if="this.status === 'admin'">
      <label>จัดกลุ่ม</label>
      <table class="table borderless">
        <thead>
          <tr>
            <th>ชื่ออาหาร</th>
            <th>ปริมาณ</th>
            <th>ค่าแคลอรี</th>
            <th style="padding: 0.75rem 3px 0.75rem 0px; text-align: right;">ยืนยัน</th>
            <th style="padding: 0.75rem 0.85rem 0.75rem 0px; text-align: right;">ยกเลิก</th>
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
            <td style="padding: 0.75rem 0px 0.75rem 0px; text-align: right;">
              <a target="_blank" v-on:click="addCaloryDB(item)">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  class="bi bi-check2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#80e12a"
                    d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </a>
            </td>
            <td style="text-align: right;">
              <a target="_blank" v-on:click="delCaloryDB(item.key)">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  class="bi bi-x"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#ff0000"
                    d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                  />
                  <path
                    fill="#ff0000"
                    d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                  />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="this.status === 'user'">
      <table class="table borderless">
        <thead>
          <tr>
            <th>ชื่ออาหาร</th>
            <th>ปริมาณ</th>
            <th>ค่าแคลอรี</th>
            <th style="padding: 0.75rem 0.85rem 0.75rem 0px; text-align: right;">ยกเลิก</th>
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
            <td style="text-align: right;">
              <a target="_blank" v-on:click="delCaloryDB(item.key)">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  class="bi bi-x"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#ff0000"
                    d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                  />
                  <path
                    fill="#ff0000"
                    d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                  />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
var database = firebase.database();
import Swal from "sweetalert2";
export default {
  data() {
    return {
      data: [],
      email: "",
      status: "",
    };
  },
  async created() {
    var datafilterStatus = [];
    var dataRef = database.ref("/FoodData/DataWaitConfirm");
    await dataRef.on("child_added", (snapshot) => {
      if(snapshot.val().status === 'wait'){
        datafilterStatus.push({ ...snapshot.val(), key: snapshot.key });
      }
     
    });
    dataRef.on("child_removed", (snapshot) => {
      const del = this.data.find((mgs) => mgs.key == snapshot.key);
      const index = this.data.indexOf(del);
      this.data.splice(index, 1);
    });
    this.collection = "ไข่";
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.email = firebaseUser.email;
    });
    await this.dataStatus(datafilterStatus);
    setTimeout(() => this.dataStatus(datafilterStatus), 2000);
  },
  methods: {
    async dataStatus(datafilterStatus) {
      this.data = []
      if (await this.email === "hachiigo@admin.com") {
        this.data = datafilterStatus;
        this.status = "admin";
      } else {
        for(var i = 0; i < datafilterStatus.length; i++){
          if(datafilterStatus[i].credit === this.email){
            this.data.push(datafilterStatus[i])
          }
        }
        this.status = "user";
      }
    },
    async addCaloryDB(value) {
        var dataRef = database.ref("/FoodData/DataWaitConfirm/");
        await dataRef.push({
          Calories: value.Calories,
          Food: value.Food,
          Unit: value.Unit,
          status: "confirm"
        });
        var dataRefDel = database.ref("/FoodData/DataWaitConfirm/");
        await dataRefDel.child(value.key).remove();

    },
    delCaloryDB(value) {
      var dataRef = database.ref("/FoodData/DataWaitConfirm/");
      Swal.fire({
        title: "ลบข้อมูล?",
        text: "คุณแน่ใจที่จะลบข้อมูลออกจากรายการฐานข้อมูล",
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
  },
};
</script>

<style>
.div_dataWC {
  padding: 16px;
  width: 100%;
}
@media only screen and (max-width: 1024px) {
  .borderless {
    font-size: 14px;
  }
}
</style>