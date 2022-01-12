<template>
  <div>
    <a-skeleton animation v-if="loading">
      <a-space direction="vertical" :style="{width:'100%'}" size="large">
        <a-skeleton-line :rows="4"/>
        <a-skeleton-shape/>
      </a-space>
    </a-skeleton>
    <a-card v-else :bordered="false" :body-style="{padding:0}">
      <a-descriptions :data="data" title="FOFA信息" bordered/>
      <a-table size="mini" :bordered="false" stripe :pagination="false" :data="ports" style="margin-top: 5px">
        <template #columns>
          <a-table-column title="端口" data-index="port" width="150"></a-table-column>
          <a-table-column title="协议" data-index="service" width="150">
            <template #cell="{ record }">
              <a-link v-on:click="openUrl(record.service.toLowerCase().split('/')[1]+'://' +target+':'+record.port)">{{
                    record.service
                  }}
                </a-link>

            </template>
          </a-table-column>
          <a-table-column title="时间" data-index="date" width="150"></a-table-column>
          <a-table-column title="组件" data-index="components" width="150">
            <template #cell="{ record }">
              <div v-if="portRules">
                <a-tag v-for="rule in portRules[record.port]" :key="rule.id">{{ rule.name }}</a-tag>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import {getHostInfo, getHostComponentsInfo} from '@/api/fofa';
import cheerio from 'cheerio';

export default {
  name: "FofaHostInfo",
  props: {
    title: String,
    target: String,
    favIconUrl: String
  },
  data() {
    return {
      loading: false,
      portRules: null,
      ports: [],
      data: [],
    }
  },
  mounted() {
    this.handleGetFofaHtml()
  },
  methods: {
    openUrl(url) {
      this.chrome.tabs.create({url: url});
    },
    handleGetFofaHtml() {
      this.loading = true;
      getHostComponentsInfo(this.target).then(response => {
        this.portRules = response.data.data.port_rules;
      })
      getHostInfo(this.target).then(response => {
        this.data = [];
        this.ports = [];
        let root = cheerio.load(response.data);
        let kv = root("#__layout > div > div.contentContainer.ipPolymerization > div.api-main-right > div.section.flex-section > div.ip-base > div");
        for (let i = 0; i < kv.length; i++) {
          let label = root("#__layout > div > div.contentContainer.ipPolymerization > div.api-main-right > div.section.flex-section > div.ip-base > div:nth-child(" + i + ") > div.ipDLeft").text();
          if (label && label.indexOf("端口") === -1) {
            let value = root("#__layout > div > div.contentContainer.ipPolymerization > div.api-main-right > div.section.flex-section > div.ip-base > div:nth-child(" + i + ") > div.ipDRight").text().trim();
            this.data.push({label: label, value: value});
          }
          let ports = [];
          if (label.indexOf("端口") > -1) {
            let portNodes = root("div.ipDRight > a.portHover");
            for (let j = 1; j <= portNodes.length; j++) {
              let port = root("div.ipDRight > a:nth-child(" + j + ").portHover").text();
              ports.push(port)

            }
            this.data.push({label: label, value: ports.join(',')});
          }
        }
        let portNode = root("#__layout > div > div.contentContainer.ipPolymerization > div.api-main-right > div:nth-child(2) > div > div");
        for (let i = 2; i <= portNode.length; i++) {
          let label = root("#__layout > div > div.contentContainer.ipPolymerization > div.api-main-right > div:nth-child(2) > div > div:nth-child(" + i + ")").text();
          let port = label.split(' ')[0];
          let service = label.split(' ')[1];
          let date = label.split(' ')[2];
          this.ports.push({port: port, service: service, date: date});
        }
        this.loading = false;
      })
      this.loading = false;
    }
  }
}
</script>

<style scoped>

</style>