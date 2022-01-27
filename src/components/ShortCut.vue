<template>
  <a-card title="快捷方式" :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
    <a-form layout="vertical" style="width: 100%">
      <a-form-item label="Favicon">
        <FaviconInfo :favIconUrl="favIconUrl"></FaviconInfo>
      </a-form-item>
      <a-form-item :label="'Host：'+target">
        <a-link v-on:click="openUrl(baseUrl+'/assets/port?page=1&limit=10&project_id&keyword='+target)"><img
            src="../assets/logo.png" alt="" width="30"></a-link>
        <a-link v-on:click="openUrl('https://'+fofaWebHost+'/result?q='+target)"><img src="../assets/fofa.png" alt=""
                                                                                      width="40">
        </a-link>
        <a-link v-on:click="openUrl('https://quake.360.cn/quake/#/searchResult?searchVal=%22'+target+'%22')"><img
            src="../assets/quake.png" alt=""
            width="30">
        </a-link>
        <a-link v-on:click="openUrl('https://hunter.qianxin.com/list?search=%22'+target+'%22')"><img
            src="../assets/qaxhunter.svg" alt=""
            width="30">
        </a-link>
        <a-link v-on:click="openUrl('https://www.zoomeye.org/searchResult?q='+target)"><img
            src="../assets/zoomeye.png" alt=""
            width="30">
        </a-link>
      </a-form-item>
      <a-form-item :label="'标题：'+title">
        <a-link v-on:click="openUrl(baseUrl+'/assets/port?page=1&limit=10&project_id&keyword=title='+title)"><img
            src="../assets/logo.png" alt="" width="30"></a-link>
        <a-link v-on:click="openUrl('https://'+fofaWebHost+'/result?q=title=='+title)"><img src="../assets/fofa.png"
                                                                                            alt=""
                                                                                            width="30"></a-link>
        <a-link v-on:click="openUrl('https://quake.360.cn/quake/#/searchResult?searchVal=title=%22'+title+'%22')"><img
            src="../assets/quake.png" alt=""
            width="30">
        </a-link>
        <a-link v-on:click="openUrl('https://hunter.qianxin.com/list?search=title%3D%22'+title+'%22')"><img
            src="../assets/qaxhunter.svg" alt=""
            width="30">
        </a-link>
        <a-link v-on:click="openUrl('https://www.zoomeye.org/searchResult?q=title:%22'+title+'%22')"><img
            src="../assets/zoomeye.png" alt=""
            width="30">
        </a-link>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import FaviconInfo from '@/components/FaviconInfo.vue'

import {getWebHost} from "@/utils/fofa";
import {getBaseUrl} from "@/utils/biu";

export default {
  name: "ShortCut",
  components: {FaviconInfo},
  props: {
    title: String,
    target: String,
    favIconUrl: String
  },
  data() {
    return {
      baseUrl: getBaseUrl(),
      fofaWebHost: getWebHost(),
    }
  },
  methods: {
    openUrl(url) {
      this.chrome.tabs.create({url: url});
    },
  }
}
</script>

<style scoped>

</style>