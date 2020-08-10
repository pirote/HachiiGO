<template>
  <div id="app">
    <div class="row" style="padding:10px 20px 10px 20px;">
      <div class="col" style="max-width:20%;">
        <a class="navbar-brand" href="#">
          <img
            src="../src/assets/logo2.png"
            height="30"
            style="padding-left:32px;"
            class="d-inline-block align-top"
            alt
          />
        </a>
      </div>
      <div class="col" style="max-width:60%; text-align: center;">
        <router-link to="/" class="routerlink">Home</router-link>
        <router-link to="/calories" class="routerlink">Calories</router-link>
        <a href="#aboutus" class="routerlink">About Us</a>
      </div>
      <div class="col" style="max-width:20%;">
        <div v-if="this.uid === ''">
          <button
            type="button"
            class="btn btn-light"
            style="margin-right: 16px;"
            v-on:click="signin"
          >Sing in</button>
          <button 
            type="button" 
            class="btn btn-light"
            v-on:click="register">Register</button>
        </div>
        <div v-else>
          <button
            type="button"
            class="btn btn-light"
            style="margin-right: 16px;"
            v-on:click="signin"
          >Profile</button>
          <button type="button" class="btn btn-light" v-on:click="logout">Log Out</button>
        </div>
      </div>
    </div>

    <router-view/>
    <!-- Sing in -->
    <div id="slide" class="signin" v-if="this.status === 'signin'">
      <div class="div_signin">
        <button type="button" class="close" aria-label="Close" v-on:click="close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h1>Sing In</h1>

        <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="password"
                  />
                </div>
              </div>
        <b-button
          class="btn"
          style="background-color: #F87030; border-color: #F87030; width:250px ;"
          v-on:click="login"
        >Login</b-button>
      </div>
    </div>
    <!-- Register -->
    <div id="slide" class="signin" v-if="this.status === 'register'">
      <div class="div_signin">
        <button type="button" class="close" aria-label="Close" v-on:click="close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h1>Register</h1>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button v-on:click="authen" style="background-color: #F87030; border-color: #F87030; width:250px ;" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
          </div>
      </div>
    </div>
    <div id="aboutus">
      <div class="row">
        <div class="col">
          <p>เกี่ยวกับ Hachii Store:</p>
          <ul>
            <li>แจ้งโอน</li>
            <li>ตรวจเช็คสถานะสินค้า</li>
            <li>รับสมัครตัวแทน</li>
            <li>Policy</li>
          </ul>
        </div>
        <div class="col">
          <p>ศูนย์บริการลูกค้า:</p>
          <ul>
            <li>หากมีข้อสงสัย สามารถติดต่อสอบถามได้ที่</li>
            <li>Line ID : @hachiigo</li>
          </ul>
        </div>
        <div class="col">
          <p>ติดต่อเรา:</p>
          <ul>
            <li>https://www.hachiistore.com/</li>
            <li>บริษัท ไบโอเพนนินซูล่า จำกัด (สำนักงานใหญ่) 435 หมู่ที่ 1 ต.ศิลา อ.เมืองขอนแก่น จ.ขอนแก่น 40000</li>
            <li>โทร. 0980978465</li>
            <li>E-mail sales@biopeninsula.com</li>
          </ul>
          <p>สงวนลิขสิทธิ์:</p>
          <ul>
            <li>Engine by Commerzy Co.,Ltd.</li>
            <li>v1.7.1.5.4</li>
          </ul>
        </div>
        <div class="col">
          <img
            src="../src/assets/QR.jpg"
            height="150px"
            style="padding-left:32px;"
            class="d-inline-block align-top"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      status: "default",
      password: "",
      email: "",
      uid:'',
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.uid = firebaseUser.email
    });
  },
  methods: {
    logout() {
      firebase
            .auth()
            .signOut()
            .then(() => {
              this.status = "default";
               window.location.reload();
            });
    },
    signin() {
      this.status = "signin";
    },
    close() {
      this.status = "default";
    },
    register(){
      this.status = "register";
    },
    authen() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {});
        })
        .catch(err => {
          this.error = err.message;
        });
    },
    async login() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (data) => {
            this.status = "default";
            this.uid = data.user.uid
          },
          (err) => {
            alert("ับัญชี หรือ รหัสผ่าน ไม่ถูกต้อง!");
            console.log(err);
          }
        );
    },
  },
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
}
li {
  display: list-item;
  font-size: 12px;
}
body {
  width: 100%;
  height: 100%;
  background-color: #f87030;
}
.nav {
  text-align: center;
  padding: 0.5rem 1rem;
  background-color: #f87030;
}
#aboutus {
  padding: 16px;
  width: 100%;
  height: auto;
  color: #ffffff;
  background-color: #313131;
}
.routerlink {
  padding-right: 25px;
  color: #2f255a;
  font-size: 20px;
}
.signin {
  width: 100%;
  height: 100%;
}
.div_signin {
  text-align: center;
  width: 50%;
  background-color: #ffffff;
  color: #f87030;
  margin-top: 50%;
  border-radius: 25px;
  padding: 32px;
  margin: auto;
  box-shadow: 5px 10px 10px #888888;
}
#slide {
  position: absolute;
  bottom: 90px;
  height: 90%;
  -webkit-animation: slide 0.5s forwards;
  -webkit-animation-delay: 0.2s;
  animation: slide 0.5s forwards;
  animation-delay: 0.2s;
}
@-webkit-keyframes slide {
  100% {
    bottom: 0;
  }
}
@keyframes slide {
  100% {
    bottom: 0;
  }
}
</style>
