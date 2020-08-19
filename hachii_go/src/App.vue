<template>
  <div id="app">
    <div class="row" style="padding:10px">
      <div class="col" style="max-width:20%;">
        <a class="navbar-brand" href="#">
          <img src height="30" id="logo" class="d-inline-block align-top" alt />
        </a>
      </div>
      <div class="col" style="max-width:55%; text-align: center;">
        <router-link to="/" class="routerlink">หน้าหลัก</router-link>
        <router-link v-if="this.uid === ''" to="/CaloriesLogin" class="routerlink">แคลอรี่</router-link>
        <router-link v-else to="/calories" class="routerlink">แคลอรี่</router-link>
        <a href="#aboutus" class="routerlink">เกี่ยวกับ</a>
      </div>
      <div class="col" style="max-width:25%;">
        <div v-if="this.uid === ''" class="row">
          <div class="col" style="text-align: right;">
            <div
              type="button"
              class="div_sign_re"
              style="margin-right: 16px;"
              v-on:click="signin"
            >เข้าสู่ระบบ</div>
          </div>
          <div class="col">
            <div type="button" class="div_sign_re" v-on:click="register">ลงทะเบียน</div>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col" style="text-align: right;">
            <router-link to="/profile" class="routerlink">โปรไฟล์</router-link>
          </div>
          <div class="col">
            <div type="button" v-if="!this.nameLine" class="div_btn" v-on:click="logout">ออกจากระบบ</div>
          </div>
        </div>
      </div>
    </div>

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
            <div class="form-group">
              <img class="preview" :src="picture" />
            </div>
            <div class="form-group">
              <p>อัพโหลดรูป:</p>
              <input type="file" @change="previewImage" accept="image/*" style="font-family: auto;" />
            </div>
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
 <p style="font-size:12px; color:#ababab;">*แนะนำให้เลือกใช้ Email ที่ผูกกับ line</p>
            <div class="form-group row mb-0">
              <div class="col-md-8 offset-md-4">
               
                <button
                  v-on:click="authen"
                  style="background-color: #F87030; border-color: #F87030; width:50% ;"
                  class="btn btn-primary"
                >Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <router-view />
    
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
            <li>Line official : @147gmomt</li>
          </ul>
        </div>
        <div class="col">
          <p>ติดต่อเรา:</p>
          <ul>
            <li>https://www.hachiistore.com/</li>
            <li>บริษัท ไบโอเพนนินซูล่า จำกัด (สำนักงานใหญ่) 435 หมู่ที่ 1 ต.ศิลา อ.เมืองขอนแก่น จ.ขอนแก่น 40000</li>
            <li>โทร. 0980978465</li>
            <li>E-mail global@biopeninsula.com</li>
          </ul>
        </div>
        <div class="col">
          <p>Scan Line Offcial:</p>
          <img
            src="../src/assets/QRCode.png"
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
import Swal from "sweetalert2";
import liff from "@line/liff";
export default {
  data() {
    return {
      status: "default",
      password: "",
      email: "",
      uid: "",
      form: {
        name: "",
        email: "",
        password: "",
      },
      error: null,
      imageData: null,
      picture: null,
      uploadValue: 0,
      line_profile: {
        userId: "",
        displayName: "",
        pictureUrl: "",
        statusMessage: "",
      },
      nameLine: "",
      imgLine: "",
      idLine: "",
    };
  },
  beforeCreate() {
    liff
      .init({ liffId: "1654665014-qlP8X7Wd" })
      .then(function () {
        //window.alert('this on OS:' + liff.getOS);
      })
      .catch(function(error) {
            window.alert('Error init msg: ' + error);
        });
  
  },
  async created() {
    await firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.uid = firebaseUser.email;
    });
     if (!liff.isInClient()) {
        /*liff.sendMessages([{
            'type': 'text',
            'text': "heelo" 
        }])*/
    } else {
        liff.getProfile()
          .then(profile=>{
            const name =profile.displayName
            //const line_email = liff.getDecodedIDToken().email
            const line_Uid = profile.userId
            const line_PUrl = profile.pictureUrl
            // merge profile line to database
            this.nameLine = name
            this.idLine = line_Uid
            this.imgLine = line_PUrl
            /*liff.sendMessages([{
              'type': 'text',
              'text': 'hello ' + name
            }])*/
          })
    }
    setTimeout(()=> this.loginLine(),1000)
    console.log(this.uid);
    if(await this.uid === ''){
      Swal.fire('ลงทะเบียนแล้วเข้าสู่ระบบกับเราสิ!')
      }
},
  methods: {
    loginLine() {
      if (this.nameLine) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.idLine + "@line.com", this.idLine)
          .then(
            (data) => {
              this.status = "default";
              this.uid = data.user.uid;
            },
            (err) => {
              firebase
                .auth()
                .createUserWithEmailAndPassword(
                  this.idLine + "@line.com",
                  this.idLine
                )
                .then((data) => {
                  data.user
                    .updateProfile({
                      displayName: this.nameLine,
                      photoURL: this.imgLine,
                    })
                    .then(() => {
                      firebase
                        .auth()
                        .signInWithEmailAndPassword(this.idLine + "@line.com", this.idLine)
                        .then(
                          (data) => {
                            this.status = "default";
                            this.uid = data.user.uid;
                          },
                          (err) => {
                            alert("ับัญชี หรือ รหัสผ่าน ไม่ถูกต้อง!");
                            console.log(err);
                          }
                        );
                    });
                })
                .catch((err) => {
                  this.error = err.message;
                });
              console.log(err);
            }
          );
      }
    },
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
    register() {
      this.status = "register";
    },
    authen() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.form.name,
              photoURL: this.picture,
            })
            .then(() => {});
        })
        .catch((err) => {
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
            this.uid = data.user.uid;
          },
          (err) => {
            alert("ับัญชี หรือ รหัสผ่าน ไม่ถูกต้อง!");
            console.log(err);
          }
        );
    },
    async previewImage(event) {
      if (this.imageData) {
        await firebase
          .storage()
          .ref(`${this.imageData.name}`)
          .delete()
          .then(function () {
            this.picture = null;
          })
          .catch(function (error) {
            console.log(error);
            // Uh-oh, an error occurred!
          });
      }
      this.uploadValue = 0;
      this.imageData = event.target.files[0];

      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      await storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(snapshot);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
          });
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
.preview {
  width: 150px;
  height: auto;
}
#slide {
  position: relative;
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
#logo {
  padding-left: 32px;
}
.div_btn:hover {
  font-size: 18px;
  color: #f87030;
}
.div_sign_re:hover {
  font-size: 18px;
  color: #f87030;
}
@media only screen and (max-width: 1024px) {
  .routerlink {
    padding-right: 16px;
    font-size: 10px;
  }
  #logo {
    padding-left: 5px;
  }
  .div_btn {
    font-size: 10px;
  }
  .div_sign_re {
    font-size: 10px;
  }
  .div_btn:hover {
    font-size: 10px;
    color: #f87030;
  }
  .div_sign_re:hover {
    font-size: 10px;
    color: #f87030;
  }
  .div_signin {
    text-align: center;
    width: 80%;
    background-color: #ffffff;
    color: #f87030;
    margin-top: 50%;
    border-radius: 25px;
    padding: 32px;
    margin: auto;
    box-shadow: 5px 10px 10px #888888;
  }
}
@media only screen and (max-width: 1024px) {
  #aboutus {
    font-size: 10px;
  }
  li {
    font-size: 10px;
  }
}
</style>
