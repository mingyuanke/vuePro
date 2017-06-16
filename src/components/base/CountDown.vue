<template>
  <span class="count-down">
    <span class="add-text">{{this.beforeText}}</span>
    <span class="count-day"
          v-if="this.dValue"><span class="count-down-text">{{this.dValue}}</span><span>{{this.dText}}</span><span>&nbsp;</span></span>
    <span class="count-hour"
          v-if="this.hValue"><span class="count-down-text">{{this.hValue}}</span><span>{{this.hText}}</span></span>
    <span class="count-minute"
          v-if="this.mValue"><span class="count-down-text">{{this.mValue}}</span><span>{{this.mText}}</span></span>
    <span class="count-second"
          v-if="this.sValue"><span class="count-down-text">{{this.sValue}}</span><span>{{this.sText}}</span></span>
    <span class="add-text">{{this.afterText}}</span>
  </span>
</template>
<script>
  /**
   * countOption: format      --------> 'dd','hh','mm','ss','dd hh:mm:ss','hh:mm:ss','mm:ss'
   *              beforeText  --------> String
   *              afterText   --------> String
   *              dText       --------> String,default:'天'
   *              hText       --------> String,default:':'
   *              mText       --------> String,default:':'
   *              sText       --------> String,default:''
   *              endTime     --------> Date(String):yyyy/MM/dd hh:mm:ss
   *              endEvents   --------> String
   **/
  function formatDate() {
    let diffT = this.endTime.getTime() - new Date().getTime();
    if(diffT<0){
      clearInterval(this.ri);
      this.$emit(this.endEvents);
      return false
    }
    let format = this['countOption']['format'];
    if (format.match(/dd/)) {
      this.dValue = parseInt(diffT / (1000 * 60 * 60 * 24)).toString();
      this.minFormat = 'dd'
    }
    if (!format.match(/hh/)) {
    } else {
      if (typeof this.dValue === 'boolean') {
        this.hValue = parseInt(diffT / (1000 * 60 * 60));
      } else {
        this.hValue = parseInt(diffT / (1000 * 60 * 60)) % 24;
      }
      this.hValue = this.hValue < 10 ? '0' + this.hValue : this.hValue;
      this.minFormat = 'hh'
    }
    if (format.match(/mm/)) {
      if (typeof this.hValue === 'boolean') {
        this.mValue = parseInt(diffT / (1000 * 60));
      } else {
        this.mValue = parseInt(diffT / (1000 * 60)) % 60;
      }
      this.mValue = this.mValue < 10 ? '0' + this.mValue : this.mValue;
      this.minFormat = 'mm'
    }
    if (format.match(/ss/)) {
      if (typeof this.mValue === 'boolean') {
        this.sValue = parseInt(diffT / 1000);
      } else {
        this.sValue = parseInt(diffT / 1000) % 60;
      }
      this.sValue = this.sValue < 10 ? '0' + this.sValue : this.sValue;
      this.minFormat = 'ss'
    }
  }
  export default{
    name: 'count-down',
    props: ['countOption'],
    created(){
      formatDate.apply(this);
    },
    mounted(){
        if(this.endTime.getTime()<new Date().getTime()){
          this.beforeText="已过期";
            return false
        }
      const refreshInterval = {
        dd: 1000 * 60 * 10,
        hh: 1000 * 60 * 5,
        mm: 1000 * 15,
        ss: 500
      };
       this.ri = function () {
        formatDate.apply(this);
        setTimeout(this.ri.bind(this), refreshInterval[this.minFormat])
      }.bind(this);
      this.ri()

    },
    data(){
      return {
        dValue: false,
        hValue: false,
        mValue: false,
        sValue: false,
        dText: this['countOption']['dText'] || '天',
        hText: this['countOption']['hText'] || ':',
        mText: this['countOption']['mText'] || ':',
        sText: this['countOption']['sText'] || '',
        beforeText: this['countOption']['beforeText'] || '',
        afterText: this['countOption']['afterText'] || '',
        endTime: new Date(this['countOption']['endTime']) || new Date(),
        minFormat: '',
        endEvents:this['countOption']['endEvents']
      }

    },

  }
</script>
<style scoped lang="scss">
  .count-down{
    font-size: 0.6rem;
    .add-text{
      font-size: 0.5rem;
      color: rgba(125,125,125,0.8);
    }
    .count-down-text{
      padding: 0 0.4rem;
      background-color: rgba(25,25,25,0.8);
      border-radius: 0.2rem;
      margin-right: 0.2rem;
      color: white;
      font-weight: bold;
    }
  }

</style>
