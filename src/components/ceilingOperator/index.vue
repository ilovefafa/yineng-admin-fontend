<template>
  <div>
    <div v-if="navBarFixed" style="height:61px"></div>
    <div
      class="operator"
      :class="{ sidebarClose: navBarFixed,sidebarOpen: sidebarOpen}"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navBarFixed: false
    }
  },
  computed: {
    sidebarOpen() {
      return this.$store.state.app.sidebar.opened && this.navBarFixed
    }
  },
  mounted() {
    window.addEventListener('scroll', this.watchScroll)
  },
  methods: {
    watchScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 50 时，实现吸顶效果
      if (scrollTop > 61) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.operator {
  width: 100%;
  background-color: white;
  text-align: center;
  border-bottom: solid 1px #e6e6e6;
  padding: 10px 0 10px 20px;
}
.sidebarClose {
  position: fixed;
  top: 0;
  left: 36px;
  width: calc(100% - 36px);
  z-index: 1999;
}
.sidebarOpen {
  left: 180px;
  width: calc(100% - 180px);
}
</style>
