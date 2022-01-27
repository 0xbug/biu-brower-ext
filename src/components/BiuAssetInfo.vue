<template>
  <div style="font-size: 12px!important;">
    <a-form-item label="标签">
      <div v-if="result">
        <a-tag v-for="item in result.tags" :key="item" style="margin: 2px">{{ item }}</a-tag>
      </div>
    </a-form-item>
    <a-skeleton animation v-if="loading">
      <a-space direction="vertical" :style="{width:'100%'}" size="large">
        <a-skeleton-line :rows="3"/>
        <a-skeleton-shape/>
      </a-space>
    </a-skeleton>
    <div v-else>
      <a-card v-if="result" :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
        <template #title>
          <a-tag color="#cf1322">漏洞</a-tag>
        </template>
        <a-table size="mini" :bordered="false" stripe :pagination="false" :data="result.vulnerabilities">
          <template #columns>

            <a-table-column title="等级" data-index="severity" width="100">
              <template #cell="{ record }">

                <a-badge
                    :color="colorMap[record.severity]"
                    :text="record.severity"
                    :style="{ marginRight: '24px' }"
                />

              </template>
            </a-table-column>
            <a-table-column title="插件" data-index="plugin">
              <template #cell="{ record }">
                <a-link v-on:click="openUrl(baseUrl+'/scan/report/detail/'+record.md5)">{{ record.plugin }}</a-link>
              </template>
            </a-table-column>
            <a-table-column title="触发点" data-index="target" ellipsis>
              <template #cell="{ record }">
                <a-link v-on:click="openUrl(record.target)">{{ record.target }}</a-link>
              </template>
            </a-table-column>

          </template>
        </a-table>
      </a-card>
      <a-card v-if="result" :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
        <template #title>
          <a-tag color="#1890ff">端口</a-tag>
        </template>
        <a-table size="mini" :bordered="false" stripe :pagination="false" :data="result.ports">
          <template #columns>
            <a-table-column title="IP" data-index="ip" width="150">
              <template #cell="{ record }">
                <a-link v-on:click="openUrl(baseUrl+'/assets/detail/'+record.ip)">{{ record.ip }}</a-link>
              </template>
            </a-table-column>
            <a-table-column title="端口" data-index="port" width="80">
              <template #cell="{ record }">
                <a-link v-on:click="openUrl('http://'+record.ip+':'+record.port)">{{ record.port }}</a-link>
              </template>
            </a-table-column>
            <a-table-column title="标签" data-index="tags">
              <template #cell="{ record }">
                <a-tag v-for="item in record.tags" :key="record.port+':'+item" style="margin: 2px">{{ item }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column title="标题" data-index="title">
            </a-table-column>
            <a-table-column title="Favicon" width="150">
              <template #cell="{ record }">
                <img :src="baseUrl+'/api/favicon?md5='+record.favicon" alt="" width="20">
                <a-link
                    v-on:click="openUrl(baseUrl+'/assets/port?page=1&limit=10&project_id&keyword=favicon='+record.favicon)">
                  {{ record.favicon }}
                </a-link>

              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-card>
      <a-card v-if="result" :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
        <template #title>
          <a-tag color="#a0d911">网站</a-tag>
        </template>
        <a-table size="mini" :bordered="false" stripe :pagination="false" :data="result.hosts">
          <template #columns>
            <a-table-column title="主机" data-index="host" width="150">
              <template #cell="{ record }">
                <a-link v-on:click="openUrl(baseUrl+'/assets/detail/'+record.host)">{{ record.host }}</a-link>
              </template>
            </a-table-column>
            <a-table-column title="端口" data-index="port"></a-table-column>
            <a-table-column title="标题" data-index="title"></a-table-column>
            <a-table-column title="路径" data-index="path" ellipsis></a-table-column>
            <a-table-column title="状态码" data-index="status_code"></a-table-column>
            <a-table-column title="标签" data-index="tags"></a-table-column>
            <a-table-column title="Favicon" width="150">
              <template #cell="{ record }">
                <img :src="baseUrl+'/api/favicon?md5='+record.favicon" alt="" width="20">
                <a-link
                    v-on:click="openUrl(baseUrl+'/assets/port?page=1&limit=10&project_id&keyword=favicon='+record.favicon)">
                  {{ record.favicon }}
                </a-link>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-card>
      <a-card v-if="result" :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
        <template #title>
          <a-tag color="#722ed1">DNS记录</a-tag>
        </template>
        <a-table size="mini" :bordered="false" stripe :pagination="false" :data="result.dns">
          <template #columns>
            <a-table-column title="根域名" data-index="domain"></a-table-column>
            <a-table-column title="子域名" data-index="host"></a-table-column>
            <a-table-column title="解析IP" data-index="ip">
              <template #cell="{ record }">
                <a-link v-on:click="openUrl(baseUrl+'/assets/detail/'+ip)" v-for="ip in record.ip" :key="ip">{{
                    ip
                  }}
                </a-link>
              </template>
            </a-table-column>
          </template>
        </a-table>

      </a-card>
      <a-empty v-else/>
    </div>
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

  </div>
</template>

<script>
import {getAssetInfo} from '@/api/asset';
import {getBaseUrl} from "@/utils/biu";

export default {
  name: 'AssetInfo',
  props: {
    title: String,
    target: String,
    favIconUrl: String
  },
  data() {
    return {
      baseUrl: getBaseUrl(),
      error: false,
      loading: false,
      result: null,
      colorMap: {
        提示: '#1890ff',
        低危: '#36cfc9',
        中危: '#ffd666',
        高危: '#fa8c16',
        严重: '#f5222d'
      },
    }
  },
  mounted() {
    this.handleGet();

  },
  methods: {
    openUrl(url) {
      this.chrome.tabs.create({url: url});
    },
    handleGet() {
      this.loading = true;
      this.error = false;
      getAssetInfo({target: this.target}).then(response => {
        this.result = response.data.result;
      }).catch(error => {
        this.error = error;
      })
      this.loading = false;
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
