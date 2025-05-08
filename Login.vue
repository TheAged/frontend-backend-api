<template>
  <main class="login-page-main">
    <div class="login-box">
      <h2 class="form-title">登入</h2>

      <div class="form-group">
        <label for="email">電子郵件：</label>
        <div class="input-box">
          <input type="email" id="email" placeholder="請輸入電子郵件" v-model="email" />
        </div>
      </div>

      <div class="form-group">
        <label for="password">密碼：</label>
        <div class="input-box">
          <input type="password" id="password" placeholder="請輸入密碼" v-model="password" />
        </div>
      </div>

      <div class="btn-group">
        <router-link to="/register">
          <button class="btn register">註冊</button>
        </router-link>
        <button class="btn login" @click="login">登入</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

async function login() {
  if (!email.value || !password.value) {
    alert('請輸入 Email 和密碼')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    alert('Email 格式錯誤')
    return
  }

  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      email: email.value,
      password: password.value
    })

    if (response.data.success) {
      alert('登入成功！')
      router.push('/userhome')
    } else {
      alert(response.data.message || '登入失敗')
    }
  } catch (error) {
    alert('連線錯誤，請稍後再試')
    console.error(error)
  }
}
</script>

<style scoped>
.login-page-main {
  min-height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
}

.login-box {
  width: 450px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.form-group label {
  width: 100px;
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

.btn-group {
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
  margin: 0 10px;
  cursor: pointer;
}

.btn:hover {
  background-color: #935b39;
}
</style>


