<template>
  <a-form :model="form" layout="vertical" style="width: 100%">
    <a-form-item>
      <a-button type="primary" v-on:click="handleUpdateSettings">保存</a-button>
    </a-form-item>
    <a-form-item field="dark" label="护眼模式">
      <a-switch v-model="form.dark" type="round" @change="handleDark">
        <template #checked-icon>
          <icon-moon-fill />
        </template>
        <template #unchecked-icon>
          <icon-sun-fill style="color: orange"/>
        </template>
      </a-switch>
    </a-form-item>
    <a-form-item field="fofaAuth" label="FOFA Authorization">
      <a-input-password placeholder="" allow-clear
                        v-model="form.fofaAuth">
        <template #prefix>
          <icon-link/>
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item required field="url" label="Biu服务器地址">
      <a-input placeholder="格式 https://example.com" allow-clear
               v-model="form.url">
        <template #prefix>
          <icon-link/>
        </template>
      </a-input>
    </a-form-item>
    <a-form-item required field="ak" label="Biu-Api-Key">
      <a-input-password placeholder="前往 个人中心->安全设置 获取" allow-clear v-model="form.ak">
        <template #prefix>
          <icon-lock/>
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item field="secondDirDict" label="二级路径探测字典">
      <a-textarea
          v-model="form.secondDirDict"
          :auto-size="{
    minRows:2,
    maxRows:20
  }" style="margin-top: 20px"/>
    </a-form-item>
    <a-form-item field="thirdDirDict" label="三级路径探测字典">
      <a-textarea
          v-model="form.thirdDirDict"
          :auto-size="{
    minRows:2,
    maxRows:20
  }" style="margin-top: 20px"/>
    </a-form-item>
  </a-form>
</template>

<script>
import {getSetting, setSetting} from "@/utils/setting";

export default {
  name: "Settings",
  data() {
    return {
      form: {
        url: '',
        ak: '',
        fofaAuth: '',
        secondDirDict: '',
        thirdDirDict: '',
      },
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!getSetting('apiKey')) {
        this.chrome.browserAction.setBadgeText({text: "未设置"});
        this.chrome.browserAction.setBadgeBackgroundColor({
          color: [255, 0, 0, 255],
        });
      } else {
        this.chrome.browserAction.setBadgeText({text: "✓"});
        this.chrome.browserAction.setBadgeBackgroundColor({
          color: "#42b983",
        });
      }
      this.form = {
        ak: getSetting('apiKey'),
        url: getSetting('baseUrl'),
        fofaAuth: getSetting('fofaAuth'),
        secondDirDict: getSetting('secondDirDict'),
        thirdDirDict: getSetting('thirdDirDict'),
      };
    },
    handleDark() {
      if (getSetting('dark') === 'yes') {
        document.body.removeAttribute('arco-theme');
        setSetting('dark', 'no')
      } else {
        setSetting('dark', 'yes')
        document.body.setAttribute('arco-theme', 'dark');
      }
    },
    handleUpdateSettings() {
      setSetting('apiKey', this.form.ak);
      setSetting('baseUrl', this.form.url);
      setSetting('fofaAuth', this.form.fofaAuth);
      setSetting('secondDirDict', this.form.secondDirDict);
      setSetting('thirdDirDict', this.form.thirdDirDict);
      this.$message.success("保存成功");
    }
  }
}
</script>

<style scoped>

</style>