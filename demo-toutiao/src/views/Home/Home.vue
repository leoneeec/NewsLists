<template>
  <div class="home-container">
    <van-nav-bar title="新闻头条" fixed />
    <!-- <P>{{ artlist.length }}</P> -->

    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleInfo v-for="item in artlist" :key="item.id" :title="item.title" :author="item.aut_name" :cmt-count="item.comm_count" :time="item.pubdate" :cover="item.cover">
        </ArticleInfo>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticleAPI } from '@/api/ArticleAPI'

// 导入Article组件
import ArticleInfo from '@/components/Article/ArticleInfo'

export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10,
      artlist: [],
      loading: true,
      finished: false,
      isLoading: true
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    async initArticleList(isRefresh) {
      const { data: res } = await getArticleAPI(this.page, this.limit)

      if (isRefresh) {
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }

      if (res.length === 0) {
        this.finished = true
      }
    },
    onLoad() {
      // 页码值加一
      this.page++
      // 重新调用接口数据
      this.initArticleList()
    },
    onRefresh() {
      this.page++
      this.initArticleList(true)
    }
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
}
</style>
