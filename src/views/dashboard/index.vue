<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <page-tools>
      <el-button type="primary" slot="after">导出</el-button>
    </page-tools>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PageTools from "@/components/PageTools";

export default {
  name: 'Dashboard',
  components: {
    PageTools
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
