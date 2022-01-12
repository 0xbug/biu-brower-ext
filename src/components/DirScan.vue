<template>
  <div style="font-size: 12px!important;">
    <a-card :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
      <a-space style="margin-bottom: 10px">
        <a-select v-model="method" :style="{width:'100%'}" placeholder="Please select ...">
          <a-option>get</a-option>
          <a-option>post</a-option>
          <a-option>head</a-option>
        </a-select>
        <a-button v-on:click="handleGen" type="primary">扫描
          <template #icon>
            <icon-thunderbolt/>
          </template>
        </a-button>
      </a-space>

      <a-card :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
        <template #title>
          <a-tag color="#a0d911">正常请求</a-tag>
        </template>
        <a-table size="mini" :bordered="false" stripe :pagination="false" :data="results">
          <template #columns>
            <a-table-column title="状态码" data-index="status"></a-table-column>
            <a-table-column title="长度" data-index="length"></a-table-column>
            <a-table-column title="url" data-index="url">
              <template #cell="{ record }">
                <a-link v-on:click="openUrl(record.url)">{{
                    record.url
                  }}
                </a-link>
              </template>
            </a-table-column>
            <a-table-column title="标题" data-index="title"></a-table-column>
          </template>
        </a-table>
      </a-card>
      <a-card :bordered="false" :body-style="{padding:0}" :header-style="{padding:0}">
        <template #title>
          <a-tag color="#722ed1">错误请求</a-tag>
        </template>
        <a-table size="mini" :bordered="false" stripe :pagination="false" :data="errorResults">
          <template #columns>
            <a-table-column title="状态码" data-index="status"></a-table-column>
            <a-table-column title="长度" data-index="length" width="100"></a-table-column>
            <a-table-column title="url" data-index="url">
              <template #cell="{ record }">
                <a-link v-on:click="openUrl(record.url)">{{
                    record.url
                  }}
                </a-link>
              </template>
            </a-table-column>
            <a-table-column title="标题" data-index="title"></a-table-column>
            <a-table-column title="报错" data-index="error"></a-table-column>
          </template>
        </a-table>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import {getSetting} from "@/utils/setting";
import {getHTTPResponse} from '@/api/dirscan';
import cheerio from 'cheerio';

export default {
  name: 'DirScan',
  props: {
    protocol: String,
    target: String,
    port: String,
  },
  data() {
    return {
      error: false,
      loading: false,
      method: 'get',
      accountSuffix: '',
      results: [],
      errorResults: [],
      urls: [],
    }
  },
  mounted() {
  },
  methods: {
    openUrl(url) {
      this.chrome.tabs.create({url: url});
    },

    handleScan(urls) {
      this.loading = true;
      this.errorResults = [];
      this.results = [];
      this.error = false;
      if (urls.length) {
        for (const url in urls) {
          getHTTPResponse(urls[url], this.method).then(response => {
            let title = '';
            if (response.data.toLowerCase().indexOf('title') > -1) {
              let root = cheerio.load(response.data);
              title = root('title').text();
            }
            this.results.push({url: urls[url], title: title, length: response.data.length, status: response.status})
          }).catch(error => {
            let response = error.response;
            let title = '';
            if (response.data.toLowerCase().indexOf('title') > -1) {
              let root = cheerio.load(response.data);
              title = root('title').text();
            }
            error = error.toJSON();
            this.errorResults.push({
              url: urls[url],
              title: title,
              length: response.data.length,
              error: error.message,
              status: error.status
            })
          });
        }
        this.$message.success('扫描完成')
      }
    },
    handleGen() {
      let urls = [];
      const secondDirDict = getSetting('secondDirDict') ? getSetting('secondDirDict').split('\n') : [];
      const thirdDirDict = getSetting('thirdDirDict') ? getSetting('thirdDirDict').split('\n') : [];
      for (const secondDir in secondDirDict) {
        for (const thirdDir in thirdDirDict) {
          let path = '/' + secondDirDict[secondDir] + '/' + thirdDirDict[thirdDir];
          path = path.replaceAll('//', '/')
          if (this.port) {
            urls.push(this.protocol + '://' + this.target + ':' + this.port + path);

          } else {
            urls.push(this.protocol + '://' + this.target + path);
          }
        }
      }
      urls = Array.from(new Set(urls));
      this.urls = urls;
      this.handleScan(urls);

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
