# frontend-backend-api
前後端與 API 串接進度報告

#前端（Frontend：Vue 3）:

 架構建立-->                使用 Vite 建立 Vue 3 專案結構
 
 Vue Router 設定-->         設定 /login、/register、/userhome 等路由
 
 註冊頁面（Register.vue--> 	使用者輸入資料後以 axios.post() 傳送到 /api/register

 登入頁面（Login.vue)--> 		驗證登入資訊，成功則跳轉到 /control






#後端（Backend：Node.js + Express):
  
基本伺服器架設-->		 使用 Express 建立伺服器，監聽 port 3000
 
 CORS 設定-->		     使用 cors 套件允許跨來源請求（前端可正常請求）
 
 連接本地 MariaDB-->	 使用 mysql 模組連接本機資料庫，操作 userdb
 
 密碼加密處理-->		   使用 bcrypt 加密密碼，並在登入時比對雜湊值

 #API 串接整合（Frontend ↔ Backend）:
 
註冊 API	POST	/api/register-->	接收姓名、電話、email、密碼，進行帳號建立	

登入 API	POST	/api/login-->	    接收 email、密碼，進行帳號驗證	
