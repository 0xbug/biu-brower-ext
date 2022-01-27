<template>
  <div>
    <a-spin dot :loading="loading">
      <div v-if="faviconHash">
        <p>
          <a-space>
             <a-tag v-on:click="copy(faviconHash.md5);$message.success('复制成功')">MD5: {{ faviconHash.md5 }}</a-tag>
        <a-tag v-on:click="copy(faviconHash.mmh3);$message.success('复制成功')">mmh3: {{ faviconHash.mmh3 }}</a-tag>
          </a-space>
         </p>
        <a-link v-on:click="openUrl(baseUrl+'/assets/port?page=1&limit=10&project_id&favicon='+faviconHash.mmh3)"><img
            src="../assets/logo.png" alt="" width="30"></a-link>
        <a-link v-on:click="openUrl('https://'+fofaWebHost+'/result?q=icon_hash%3D'+faviconHash.mmh3)"><img src="../assets/fofa.png" alt=""
                                                                                      width="40">
        </a-link>
        <a-link v-on:click="openUrl('https://quake.360.cn/quake/#/searchResult?searchVal=favicon:%22'+faviconHash.md5+'%22')"><img
            src="../assets/quake.png" alt=""
            width="30">
        </a-link>
        <a-link v-on:click="openUrl('https://hunter.qianxin.com/list?search=web.icon==%22'+faviconHash.md5+'%22')"><img
            src="../assets/qaxhunter.svg" alt=""
            width="30">
        </a-link>
        <a-link v-on:click="openUrl('https://www.zoomeye.org/searchResult?q=iconhash:%22'+faviconHash.mmh3+'%22')"><img
            src="../assets/zoomeye.png" alt=""
            width="30">
        </a-link>
      </div>


    </a-spin>
  </div>
</template>

<script>
import {getFaviconHash} from '@/api/favicon';
import {getBaseUrl} from "@/utils/biu";
import {getWebHost} from "@/utils/fofa";

export default {
  name: "FaviconInfo",
  props: {
    favIconUrl: String
  },
  data() {
    return {
      loading: false,
      baseUrl: getBaseUrl(),
      fofaWebHost: getWebHost(),
      faviconHash: null
    }
  },
  mounted() {
    this.handleFaviconHash()
  },
  methods: {
    openUrl(url) {
      this.chrome.tabs.create({url: url});
    },
    handleFaviconHash() {
      this.loading = true;
      getFaviconHash(this.favIconUrl).then(response => {
        this.faviconHash = response.data;
        this.loading = false
      });

    }
  }
}
</script>

<style scoped>

</style>