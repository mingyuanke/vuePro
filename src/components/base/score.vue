<template>
  <span class="score">
    <label v-for="item in scoreRank" v-bind:key="item.key" v-bind:style="{'font-size':scoreSize}"
           class="star star-1">
      <span v-bind:style="{'height':valueSize,'background':item.value}" class="score-star-outer icon-star-out"></span>
      <span class="score-star-border icon-star-border"></span>
    </label>
    <label class="score-value" v-bind:style="{'font-size':valueSize}" v-text="scoreValue"></label>
  </span>
</template>
<script>
  export default{
    name: 'score',
    props: ['comInfo'],
    data(){
      return {
        scoreSize: this['comInfo']['scoreSize'],
        scoreValue: 0,
        scoreRank: [{key: 'score' + Math.random() + 1, value: 'white'}, {
          key: 'score' + Math.random() + 2,
          value: 'white'
        }, {key: 'score' + Math.random() + 3, value: 'white'}, {
          key: 'score' + Math.random() + 4,
          value: 'white'
        }, {key: 'score' + Math.random() + 5, value: 'white'}],
      }
    },
    computed: {
      valueSize(){
        let size = this.scoreSize.match(/(\d+)([a-zA-Z]+)/);
        return parseFloat(size[1]) * 0.8 + size[2]
      }
    },
    mounted(){
      this.scoreValue = this['comInfo']['scoreValue'];
    },
    watch: {
      scoreValue: {
        handler: function (value, oValue) {
          let cIndex = 0;
          let newRank = [];
          while (cIndex < 5) {
              let sValue='';
            if (value > 1) {
              sValue= 'linear-gradient(to right,white,white 5%, red 5%, red 95%,white 95%,white 95% )';
              value = value - 1;
            } else if(value>0){
              let cValue = parseFloat(value.toFixed(2));
              sValue = `linear-gradient(to right,white,white 5%, red 5%, red ${7+20*(0.5-cValue) + 90 * cValue}%,white ${7+20*(0.5-cValue) + 90 * cValue}%,white 95% )`;
              value=0
            }else{
              sValue='white'
            }
            newRank.push({
              key:'score' + Math.random() +cIndex,
              value:sValue
            });
            cIndex++;
          }

          this.scoreRank = newRank;
        },
        deep: true
      }
    }
  }
</script>
<style scoped lang="scss">
  .score {
    font-size: 0;
    display: inline-block;
    .score-value {
      padding-left: 0.4rem;
      font-style: italic;
    }
  }

  .star {
    position: relative;
    display: inline-block;
    span {
      display: inline-block;
    }
    .score-star-outer {
      color: white;
      background: white;
      /*background: linear-gradient(to right,white,white 5%, red 5%, red 95%,white 95%,white 95% );*/
      line-height: 1;
    }
    .score-star-border {
      position: absolute;
      left: 0;
      top: 0;
      color: #888;
      font-weight: bold;
    }
  }
</style>
