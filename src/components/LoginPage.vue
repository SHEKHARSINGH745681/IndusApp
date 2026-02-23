<template>
  <div class="login-page">
    <!-- Toast Notification -->
    <div v-if="showToast" class="toast">{{ toastMessage }}</div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/induslogo.png" alt="KFINTECH Logo" />
      </div>
      <ul class="nav-links">
        <li><a href="#">Solutions</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </nav>

    <!-- Main content -->
    <div class="main-content">
      <!-- Left panel with diagonal stacked text -->
      <div class="left-panel">
        <div class="stacked-text">
          <span>Simple</span>
          <span>Free</span>
          <div class="rotating-container">
            <span class="rotating">{{ rotatingWord }}</span>
          </div>
        </div>
      </div>

      <!-- Right panel login box -->
      <div class="right-panel">
        <div class="login-box">
          <h2>Welcome to IndusInvest, Please Sign In.</h2>

          <div class="toggle-otp">
            <input type="checkbox" id="useOtp" v-model="useOtp" />
            <label for="useOtp">Use OTP</label>
          </div>

          <form @submit.prevent="handleLogin">
            <!-- PAN -->
            <div class="form-group">
              <label>PAN *</label>
              <input
                type="text"
                v-model="pan"
                placeholder="Enter First Holder PAN"
                required
              />
              <div class="forgot">Unlock User ID</div>
            </div>

            <!-- Password (Hidden if OTP used) -->
            <div class="form-group" v-if="!useOtp">
              <label>Password *</label>
              <input
                type="password"
                v-model="password"
                placeholder="Enter your Password"
                required
              />
              <div class="forgot">Forgot Password / Unlock User ID</div>
            </div>

            <!-- OTP Input (Shown if OTP used) -->
            <div class="form-group" v-if="useOtp">
              <label>Enter 4-digit OTP *</label>
              <input
                type="text"
                v-model="otpInput"
                maxlength="4"
                placeholder="Enter OTP"
                required
              />
              <div class="forgot" @click="generateOtp">Generate OTP</div>
            </div>

            <!-- Captcha -->
            <div class="form-group captcha-group">
              <label>Security Code *</label>
              <div class="captcha-box">
                <span>{{ captcha }}</span>
                <button type="button" @click="generateCaptcha">↻</button>
              </div>
              <input
                type="text"
                v-model="captchaInput"
                placeholder="Enter Security Code as displayed above"
                required
              />
            </div>

            <button type="submit" class="login-btn">Login</button>
          </form>

          <p class="signup">
            Don't have a login? <router-link to="/signup">SIGNUP</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      pan: "",
      password: "",
      otpInput: "",
      useOtp: false,
      otp: "",
      captcha: "",
      captchaInput: "",
      rotatingWords: ["Invest", "Stocks", "IPO", "Mutual Funds"],
      currentIndex: 0,
      rotatingWord: "",
      typingInterval: null,
      showToast: false,
      toastMessage: "",
    };
  },

  created() {
    this.generateCaptcha();
    this.startTextCarousel();
  },

  beforeUnmount() {
    clearTimeout(this.typingInterval);
  },

methods: {
  generateCaptcha() {
    this.captcha = Math.floor(100000 + Math.random() * 900000);
  },

  generateOtp() {
    this.otp = Math.floor(1000 + Math.random() * 9000).toString();
    this.toastMessage = "OTP sent successfully!";
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  },

  handleLogin() {
    // Check captcha
    if (this.captchaInput !== this.captcha.toString()) {
      this.toastMessage = "Invalid Captcha!";
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 3000);
      this.generateCaptcha();
      this.captchaInput = "";
      return;
    }

    // Check OTP if used
    if (this.useOtp) {
      if (this.otpInput !== this.otp) {
        this.toastMessage = "Invalid OTP!";
        this.showToast = true;
        setTimeout(() => (this.showToast = false), 3000);
        return;
      }
    }

    // Login success
    this.toastMessage = "Login successful!";
    this.showToast = true;

    // Show toast briefly, then redirect to dashboard
    setTimeout(() => {
      this.showToast = false;
      // Redirect to dashboard (make sure route name or path exists)
      this.$router.push({ name: "Dashboard" }); 
    }, 1000); // 1 second delay to show toast
  },

    // Typewriter effect
    startTextCarousel() {
      const typeWord = (word, callback) => {
        let i = 0;
        const typeNextChar = () => {
          if (i <= word.length) {
            this.rotatingWord = word.slice(0, i);
            i++;
            this.typingInterval = setTimeout(typeNextChar, 150);
          } else {
            setTimeout(callback, 1500);
          }
        };
        typeNextChar();
      };

      const deleteWord = (callback) => {
        let word = this.rotatingWord;
        const deleteChar = () => {
          if (word.length > 0) {
            word = word.slice(0, -1);
            this.rotatingWord = word;
            this.typingInterval = setTimeout(deleteChar, 100);
          } else {
            callback();
          }
        };
        deleteChar();
      };

      const loopWords = () => {
        const word = this.rotatingWords[this.currentIndex];
        typeWord(word, () => {
          deleteWord(() => {
            this.currentIndex = (this.currentIndex + 1) % this.rotatingWords.length;
            loopWords();
          });
        });
      };

      loopWords();
    },
  },
};
</script>

<style scoped>
/* ---------- General ---------- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ---------- Toast ---------- */
/* Toast sliding from right */
.toast {
  position: fixed;
  top: 80px;
  right: 20px;
  background: #3498db;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  z-index: 9999;
  animation: slideInRight 0.7s forwards, slideOutRight 0.5s 2.5s forwards;
}

/* Slide in from right */
@keyframes slideInRight {
  0% { opacity: 0; transform: translateX(100%); }
  100% { opacity: 1; transform: translateX(0); }
}

/* Slide out to right */
@keyframes slideOutRight {
  0% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(100%); }
}
/* ---------- Login Page ---------- */
.login-page {
  min-height: 100vh;
  width: 100%;
  font-family: Arial, sans-serif;
  background: url('@/assets/LeftLogo.png') no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
}

.login-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 50px;
  z-index: 1;
  position: relative;
}

.navbar .logo img {
  height: 50px;
}

.navbar .nav-links {
  list-style: none;
  display: flex;
  gap: 25px;
}

.navbar .nav-links li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
}

.navbar .nav-links li a:hover {
  color: #3498db;
}

/* Main Content */
.main-content {
  display: flex;
  flex: 1;
  z-index: 1;
  position: relative;
  min-height: calc(100vh - 80px);
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Left Panel */
.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 50px;
  color: white;
}

.stacked-text span {
  display: block;
  font-size: 60px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.stacked-text span:nth-child(2) {
  margin-left: 150px;
}

.rotating-container {
  height: 60px;
  overflow: hidden;
  position: relative;
}

.stacked-text span.rotating {
  margin-left: 250px;
  color: #87CEEB;
}

/* Right Panel */
.right-panel {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 180px;
}

.login-box {
  background: rgba(17, 17, 17, 0.85);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 360px;
  color: white;
  animation: slideInRight 1s ease forwards, glow 2s ease-in-out infinite alternate;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.5);
}

@keyframes slideInRight {
  0% { opacity: 0; transform: translateX(100px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes glow {
  0% { box-shadow: 0 0 10px rgba(52,152,219,0.3), 0 0 20px rgba(26,188,156,0.3); }
  50% { box-shadow: 0 0 20px rgba(52,152,219,0.6), 0 0 30px rgba(26,188,156,0.6); }
  100% { box-shadow: 0 0 30px rgba(52,152,219,0.8), 0 0 40px rgba(26,188,156,0.8); }
}

.login-box h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
}

.forgot {
  font-size: 10px;
  color: yellow;
  margin-top: 3px;
  text-align: right;
  cursor: pointer;
}

.captcha-group .captcha-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  padding: 5px 10px;
  margin-bottom: 5px;
  font-family: monospace;
  font-weight: bold;
  letter-spacing: 2px;
  border-radius: 5px;
}

.captcha-box button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #3498db, #1abc9c);
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  color: white;
}

.signup {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
}

.signup a {
  color: #3498db;
  text-decoration: none;
}

@media (max-width: 1024px) {
  .main-content { flex-direction: column; padding: 20px; }
  .left-panel, .right-panel { justify-content: center; padding: 10px; }
  .stacked-text span { font-size: 32px; margin-left: 0; }
}
</style>