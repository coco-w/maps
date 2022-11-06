<template>
  <el-container class="w-full h-full flex">
    <el-header class="text-gray-600 body-font h-auto border-b">
      <div
        class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
      >
        <nav
          class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"
        >
          <a class="mr-5 hover:text-gray-900 cursor-pointer" href="/#/echart"
            >全国目录电价展示</a
          >
          <a class="mr-5 hover:text-gray-900 cursor-pointer" href="/#/baidu"
            >华中区域输电通道规划</a
          >
          <a class="mr-5 hover:text-gray-900 cursor-pointer"
            >华中区域输电通道支持</a
          >
        </nav>
      </div>
    </el-header>
    <el-main class="flex-1">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="less">
.el-header {
  --el-header-height: auto;
}

.el-container {
  overflow: hidden;
  height: 100vh;
}
</style>
