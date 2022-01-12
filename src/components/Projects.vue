<template>
  <div>
    <a-form layout="vertical" style="width: 100%">
      <a-form-item required :label="'添加'+target+'到项目'">
        <a-select :options="options" :loading="loading" placeholder="请选择项目" multiple
                  v-model="selectedProjects"
                  @search="handleSearch">
          <a-option v-for="option in projects" :key="option.md5" :value="option.md5">{{ option.name }}</a-option>

        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button v-on:click="handleAddToProject">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {getProjects, updateProject} from '@/api/project';
import {getBaseUrl} from "@/utils/biu";

export default {
  name: 'ProjectsManage',
  props: {
    target: String
  },
  data() {
    return {
      baseUrl: getBaseUrl(),
      loading: false,
      options: [],
      selectedProjects: [],
      projects: [],
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
    this.handleSearch('')
  },
  methods: {
    openUrl(url) {
      this.chrome.tabs.create({url: url});
    },
    handleAddToProject() {
      this.selectedProjects.forEach(project_id => {
        updateProject({asset: this.target, project_id: project_id}).then(response => {
          this.$message.success(response.data.msg)
        })
      })

    },
    handleSearch(value) {
      this.loading = true;
      getProjects({limit: 20, from: 1, keyword: value}).then(response => {
        this.projects = response.data.result;
        for (const project in response.data.result) {
          this.options.push(project.name)
        }
        this.loading = false;
      })
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
