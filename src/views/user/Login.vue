<template>
  <a-card class="main">
    <a-form
      id="formLogin"
      :form="form"
      class="user-layout-login"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottonm: 'unset' }"
        @change="handleTabClick"
      >
        <!-- 账号密码登录 -->
        <a-tab-pane tab="账号密码登录" key="tab1">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            message="账户或密码错误"
          />
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    { required: true, message: '请输入帐户名或邮箱地址!' },
                    { validator: handleUsernameOrEmail }
                  ],
                  validateTrigger: 'change'
                }
              ]"
              type="text"
              placeholder="账户: admin"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码!' }],
                  validateTrigger: 'blur'
                }
              ]"
              type="password"
              placeholder="密码: admin"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
        </a-tab-pane>

        <!-- 手机号登录 -->
        <a-tab-pane tab="手机号登录" key="tab2">
          <a-form-item>
            <a-input
              v-decorator="[
                'mobile',
                {
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: '请输入手机号!'
                    }
                  ],
                  validateTrigger: 'change'
                }
              ]"
              type="text"
              placeholder="手机号"
            >
              <a-icon
                slot="prefix"
                type="mobile"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  type="text"
                  placeholder="验证码"
                  v-decorator="[
                    'captcha',
                    {
                      rules: [{ required: true, message: '请输入验证码' }],
                      validateTrigger: 'blur'
                    }
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    :style="{ color: 'rgba(0,0,0,.25)' }"
                  />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="
                  (!state.smsSendBtn && '获取验证码') || state.time + ' s'
                "
              />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <!-- CheckBox -->
      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">
          自动登录
        </a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa' } }"
          class="forge-password"
          style="float: right;"
        >
          忘记密码
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >
          确定
        </a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'register' }">
          注册账户
        </router-link>
      </div>
    </a-form>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      customActiveKey: "tab1",
      isLoginError: false,
      loginType: 0,
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this;
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

      if (regex.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }

      callback();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleTabClick(key) {
      this.customActiveKey = key;
    },
    getCaptcha(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state
      } = this;

      validateFields(["mobile"], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true;

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60;
              state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);

          console.log(values);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
