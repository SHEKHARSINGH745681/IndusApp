<template>
  <div class="signup-page">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/induslogo.png" alt="IndusInvest Logo" />
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
      <div class="left-panel">
        <div class="stacked-text">
          <span>Simple</span>
          <span>Free</span>
          <div class="rotating-container">
            <span class="rotating">{{ rotatingWord }}</span>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="signup-box">
          <h2 v-if="!otpSent">Create Your IndusInvest Account</h2>
          <h2 v-else>Verify OTPs</h2>

          <!-- Signup Form -->
          <form v-if="!otpSent" @submit.prevent="handleSignup">
            <div class="form-group">
              <label>PAN *</label>
              <input type="text" v-model="pan" placeholder="Enter PAN" required />
            </div>

            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" v-model="fullName" placeholder="Enter Full Name" required />
            </div>

            <div class="form-group">
              <label>Email *</label>
              <input type="email" v-model="email" placeholder="Enter Email" required />
            </div>

            <div class="form-group">
              <label>Mobile *</label>
              <input type="text" v-model="mobile" placeholder="Enter Mobile Number" required />
            </div>

            <div class="form-group">
              <label>Password *</label>
              <div class="password-wrapper">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Enter Password"
                  required
                />
                <button type="button" class="eye-btn" @click="togglePassword">
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label>Confirm Password *</label>
              <div class="password-wrapper">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="confirmPassword"
                  placeholder="Confirm Password"
                  required
                />
                <button type="button" class="eye-btn" @click="toggleConfirmPassword">
                  {{ showConfirmPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div class="form-group captcha-group">
              <label>Security Code *</label>
              <div class="captcha-box">
                <span>{{ captcha }}</span>
                <button type="button" @click="generateCaptcha">↻</button>
              </div>
              <input
                type="text"
                v-model="captchaInput"
                placeholder="Enter Security Code"
                required
              />
            </div>

            <button type="submit" class="signup-btn">Sign Up</button>
          </form>

          <!-- OTP Verification -->
          <form v-if="otpSent" @submit.prevent="verifyOtps">
            <div class="form-group">
              <label>Mobile OTP *</label>
              <input type="text" v-model="mobileOtp" maxlength="4" placeholder="Enter Mobile OTP" required />
            </div>

            <div class="form-group">
              <label>Email OTP *</label>
              <input type="text" v-model="emailOtp" maxlength="4" placeholder="Enter Email OTP" required />
            </div>

            <button type="submit" class="signup-btn">Verify OTPs</button>
          </form>

          <p class="login-link" v-if="!otpSent">
            Already have an account? <router-link to="/login">LOGIN</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      pan: "",
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      captcha: "",
      captchaInput: "",
      rotatingWords: ["Invest", "Stocks", "IPO", "Mutual Funds"],
      currentIndex: 0,
      rotatingWord: "",
      typingInterval: null,
      otpSent: false,
      mobileOtp: "",
      emailOtp: "",
      generatedMobileOtp: "",
      generatedEmailOtp: "",
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
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    generateCaptcha() {
      this.captcha = Math.floor(100000 + Math.random() * 900000);
    },
    handleSignup() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (this.captchaInput !== this.captcha.toString()) {
        alert("Invalid Captcha!");
        this.generateCaptcha();
        this.captchaInput = "";
        return;
      }

      // Simulate OTP sending
      this.generatedMobileOtp = Math.floor(1000 + Math.random() * 9000).toString();
      this.generatedEmailOtp = Math.floor(1000 + Math.random() * 9000).toString();
      this.otpSent = true;

      alert(`Signup successful! OTPs sent.\nMobile OTP: ${this.generatedMobileOtp}\nEmail OTP: ${this.generatedEmailOtp}`);
    },
    verifyOtps() {
      if (this.mobileOtp !== this.generatedMobileOtp) {
        alert("Invalid Mobile OTP!");
        return;
      }
      if (this.emailOtp !== this.generatedEmailOtp) {
        alert("Invalid Email OTP!");
        return;
      }

      alert("Signup & Verification Successful!");
      this.$router.push("/login");
    },

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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.signup-page {
  min-height: 100vh;
  width: 100%;
  font-family: Arial, sans-serif;
  background: url('@/assets/LeftLogo.png') no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
}

.signup-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

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

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  flex: 1;
  padding-right: 40px;
}

.eye-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

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

.stacked-text span:nth-child(1) {
  margin-left: 0;
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

.right-panel {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 180px;
}

.signup-box {
  background: rgba(17, 17, 17, 0.85);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  color: white;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.5);
}

.signup-box h2 {
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

.signup-btn {
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

.login-link {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
}

.login-link a {
  color: #3498db;
  text-decoration: none;
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
    padding: 20px;
  }

  .left-panel,
  .right-panel {
    justify-content: center;
    padding: 10px;
  }

  .stacked-text span {
    font-size: 32px;
    margin-left: 0;
  }
}
</style>