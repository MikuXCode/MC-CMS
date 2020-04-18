import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Select,
  DatePicker,
  Card,
  Alert,
  Input,
  Divider,
  InputNumber,
  Row,
  Col,
  Tabs,
  Checkbox,
  Popover,
  Progress,
  Breadcrumb
} from "ant-design-vue";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Alert);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Divider);
Vue.use(Card);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(Popover);
Vue.use(Progress);
Vue.use(Checkbox);
Vue.use(Breadcrumb);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
