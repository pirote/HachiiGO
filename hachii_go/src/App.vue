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
        <router-link to="/about" class="routerlink">Calories</router-link>
        <a href="#aboutus" class="routerlink">About Us</a>
      </div>
      <div class="col" style="max-width:20%;"></div>
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
          <p> สงวนลิขสิทธิ์:</p>
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
.routerlink{
  padding-right:25px; 
  color:#2F255A;
  font-size: 20px;
}
</style>
