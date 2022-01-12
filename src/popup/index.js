import {createApp} from 'vue'
import {getTsTime} from '@/utils/datetime';
import {copyText} from '@/utils/clipboard';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';


const app = createApp(App);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.config.productionTip = false;
app.config.globalProperties.copy = copyText; // eslint-disable-line
app.config.globalProperties.getTsTime = getTsTime; // eslint-disable-line
app.config.globalProperties.chrome = chrome; // eslint-disable-line
app.mount('#app');
