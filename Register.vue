<template>
  <main class="register-page-main">
    <div class="c-box">
      <h2 class="form-title">註冊</h2>

      <div class="form-row">
        <div class="left-column">
          <div class="form-group">
            <label for="name">姓名：</label>
            <div class="input-box">
              <input type="text" id="name" placeholder="請輸入姓名" v-model="name" />
            </div>
          </div>

          <div class="form-group">
            <label for="phone">電話：</label>
            <div class="input-box">
              <input type="text" id="phone" placeholder="請輸入電話" v-model="phone" />
            </div>
          </div>

          <div class="form-group">
            <label for="email">電子郵件：</label>
            <div class="input-box">
              <input type="email" id="email" placeholder="請輸入電子郵件" v-model="email" />
            </div>
          </div>
        </div>

        <div class="right-column">
          <div class="form-group">
            <label for="password">密碼：</label>
            <div class="input-box">
              <input type="password" id="password" placeholder="請輸入密碼" v-model="password" />
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">確認密碼：</label>
            <div class="input-box">
              <input type="password" id="confirmPassword" placeholder="再次輸入密碼" v-model="confirmPassword" />
            </div>
          </div>
        </div>
      </div>

      <div class="submit-button">
        <button class="btn" @click="register">完成</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const name = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

async function register() {
  if (!name.value || !phone.value || !email.value || !password.value || !confirmPassword.value) {
    alert('所有欄位都必須填寫')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    alert('Email 格式錯誤')
    return
  }

  const phoneRegex = /^09\d{8}$/
  if (!phoneRegex.test(phone.value)) {
    alert('請輸入正確的手機號碼（例如：0912345678）')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('密碼與確認密碼不一致')
    return
  }

  try {
    const response = await axios.post('http://localhost:3000/api/register', {
      name: name.value,
      phone: phone.value,
      email: email.value,
      password: password.value
    })

    if (response.data.message === 'Email already exists') {
      alert('此帳號已存在，請使用其他信箱註冊')
    } else if (response.data.success) {
      alert('註冊成功！即將跳轉登入頁面')
      router.push('/login')
    } else {
      alert('註冊失敗：' + response.data.message)
    }
  } catch (error) {
    console.error('註冊失敗', error)
    alert('連線錯誤，請稍後再試')
  }
}
</script>

<style scoped>
.register-page-main {
    min-height: calc(100vh - 200px); /* ✅ 頂部Navbar高度+底部Footer高度，扣掉 */
    position: relative;
  }

.register-box {
  width: 750px;
  padding: 20px 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative; /* ✅ 加這個 */
  top: 40px; /* ✅ 往下推 50px */
  left: 5%;
}


.form-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.form-row {
  display: flex;
  gap: 30px; /* 左右間距 */
}

.left-column,
.right-column {
  flex: 1; /* 左右各占一半 */
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.form-group label {
  width: 80px;
  font-weight: bold;
}

.input-box {
  flex: 1;
  background-color: #ddd;
  border-radius: 25px;
  display: flex;
  align-items: center;
  padding: 10px 10px;
}

.input-box input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 16px;
  padding: 12px 10px;
}

/* 完成按鈕 */
.submit-button {
  text-align: center;
  margin-top: 20px;
}

.btn {
  background-color: #ae6c45;
  color: white;
  padding: 12px 40px;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #935b39;
}
</style>
