<template>
    <a-card :bordered="false" :body-style="{padding:'2px 10px'}">
    <a-tabs type="capsule" v-if="tab">
      <a-tab-pane key="info" title="信息">
        <Projects :target="host"></Projects>
        <ShortCut :title="title" :target="host" :favIconUrl="favIconUrl"></ShortCut>
        <FofaHostInfo :title="title" :target="host"></FofaHostInfo>
        <BiuAssetInfo :title="title" :target="host" :port="port" :favIconUrl="favIconUrl"></BiuAssetInfo>
      </a-tab-pane>
      <a-tab-pane key="dnslog" title="DNSLog">
        <BiuDNSLog></BiuDNSLog>
      </a-tab-pane>
      <a-tab-pane key="dirscan" title="目录扫描">
        <DirScan :protocol="protocol" :target="host" :port="port"></DirScan>
      </a-tab-pane>
      <a-tab-pane key="settings" title="配置">
        <Settings></Settings>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import DirScan from '@/components/DirScan.vue'
import ShortCut from '@/components/ShortCut.vue'
import BiuDNSLog from '@/components/BiuDNSLog.vue'
import BiuAssetInfo from '@/components/BiuAssetInfo.vue'
import FofaHostInfo from '@/components/FofaHostInfo.vue'
import Settings from '@/components/Settings.vue'
import Projects from '@/components/Projects.vue'
import URI from 'urijs';
import wsCache from "@/utils/storage";

export default {
  name: "app",
  data() {
    return {
      dark:wsCache.get('dark')==='yes',
      loading: false,
      tab: null,
      port: null,
      protocol: null,
      url: null,
      host: null,
      title: null,
      favIconUrl: null,
      favIconHash: null,
    }
  },
  mounted() {
    this.initDark();
    this.handleGetTab();

  },
  methods: {
    initDark() {
      if (wsCache.get('dark') === 'yes') {
        document.body.setAttribute('arco-theme', 'dark');

      }
    },
    openUrl(url) {
      this.chrome.tabs.create({url: url});
    },
    handleGetTab() {
      let queryOptions = {active: true, currentWindow: true};
      const currentTab = this.chrome.tabs.query(queryOptions, (tabs => {
        let tab = tabs[0];
        this.url = URI(tab.url);
        this.port = URI(tab.url).port();
        this.protocol = URI(tab.url).protocol();
        this.host = URI(tab.url).hostname();
        this.tab = tab;
        this.title = tab.title;
        this.favIconUrl = tab.favIconUrl;
      }));
      console.log(currentTab)
    }
  },
  computed: {},
  components: {
    BiuAssetInfo,
    BiuDNSLog,
    DirScan,
    FofaHostInfo,
    Projects,
    Settings,
    ShortCut,
  },
};
</script>

<style>
</style>
