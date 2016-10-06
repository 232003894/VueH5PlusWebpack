<template>
  <div>
  	tpl--{{msg}}
  </div>
</template>
<script>
    import {
        config,
        common,
        pages
    } from 'assets/js/Lib.js';
    module.exports = {
        components: {

        },
        data: function() {
            return {
                msg: 'Hello，这是组件的模板'
            }
        },
        ready() {},
        methods: {},
        props: {}
    }
</script>
<style scoped>

</style>