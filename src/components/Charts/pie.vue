<template>
  <div
    :style="{height:height,width:width,margin:'0 auto'}"
    class="wrap_container"
  >
    <div
      :id="id"
      :class="className"
      :style="{height:height,width:width,margin:'0 auto'}"
    />
  </div>

</template>

<script>
import echarts from 'echarts';
import resize from './mixins/resize';
export default {
  mixins: [resize],
  props: {
    timeType: {
      type: String,
      default: '1',
    },
    className: {
      type: String,
      default: 'chart',
    },
    id: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '200px',
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
      chartPie: null,
      radio: 'line',
    };
  },
  watch: {
    data(val) {
      val.length > 0 && this.initChart();
    },
    radio() {
      this.chart.dispose();
      this.chart = null;
      this.initChart();
    },
  },
  mounted() {
    this.data.length > 0 && this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    // this.chartPie.dispose();
    this.chart = null;
    this.chartPie = null;
  },

  methods: {
    initChart() {
      let options = {};
      this.chart = echarts.init(document.getElementById(this.id));
      const XData = this.data
        .map((item) => {
          return {
            name: item.name,
            value: item.data[0].count,
          };
        })
        .sort(function (a, b) {
          return a.value - b.value;
        });
      console.log(XData);
      options = {
        title: {
          text: '',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc',
          },
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '90%',
            center: ['50%', '50%'],
            data: XData,
            roseType: 'radius',
            label: {
              color: 'rgba(0, 0, 0, 0.7)',
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(0, 0, 0, 0.7)',
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 100,
              shadowColor: 'rgba(0, 0, 0, 0.4)',
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      };

      this.chart.setOption(options);
      // this.chart.setOption(options);
      // }
      // console.log(options);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap_container {
  position: relative;
  .select_type {
    position: absolute;
    left: 0;
    top: -50px;
  }
}
</style>
