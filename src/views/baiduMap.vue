<template>
    <baidu-map :center="center" :zoom="zoom" @ready="handler" style="width: 100%;height: 500px;"></baidu-map>
  </template>
  <script>
  export default {
    data () {
      return {
        center: {lng: 116.417854, lat:39.921988},
        zoom: 5
      }
    },
    methods: {
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 116.417854
        this.center.lat =  39.921988
        this.zoom = 5
      }
    }
  }
  </script>