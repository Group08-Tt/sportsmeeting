<template>
  <view
      class="zb__item-inner"
  >
    <view
        @click.stop="sortAction(item,index)"
        class="item-th"
        :style="{
                  width:`${item.width?item.width:'auto'}px`,
                  flex:index===transColumns.length-1?1:'none',
                  minWidth:`${item.width?item.width:'100'}px`,
                  borderRight:`${border?'1px solid #e8e8e8':''}`,
                  borderRight:`${(scrollbarSize&&index===transColumns.length-1)?'':border?'1px solid #e8e8e8':''}`,
                  borderBottom:`${border?'1px solid #e8e8e8':''}`,
                  justifyContent:textPosition(item)

                }"
        :key="index">

        <template v-if="item.type==='selection'">
          <view class="item-content" style="width: 100%">
            <view class="checkbox-item">
              <tableCheckbox
                  :indeterminate="indeterminate" :checked="checkedAll" @checkboxSelected="checkboxSelectedAll"></tableCheckbox>
            </view>
          </view>

        </template>
        <template v-else>
          <view class="item-content" >
          {{ item.label }}
          <view class="sorter-table" v-if="item.sorter">
            <view :class="['sorter-table-icon',item.sorterMode==='_asc'&&`sorting${item.sorterMode||''}`]"></view>
            <view :class="['sorter-table-icon',item.sorterMode==='_desc'&&`sorting${item.sorterMode||''}`]"></view>
          </view>
         </view>
        </template>

    </view>
    <view class="item-children" v-if="item.children&&item.children.length">
      <table-header-item
          :item="ite"
          @sortAction="sortAction"
          :border="border"
          @checkboxSelectedAll="checkboxSelectedAll"
          :indeterminate="indeterminate"
          :checkedAll="checkedAll"
          :transColumns="transColumns"
          :index='`${i}-1-${index}`'
          :scrollbarSize="scrollbarSize"
          v-for="(ite,i) in item.children"/>
    </view>
  </view>
</template>

<script >
  import TableCheckbox from './table-checkbox.vue'
  export default {
    name:'table-header-item',
    props:{
      item:{
        type:Object,
        default:()=>{}
      },
      border:Boolean,
      indeterminate:Boolean,
      checkedAll:Boolean,
      transColumns:Array,
      scrollbarSize:Number,
      index:[Number,String],
      fixedLeftColumns:Array
    },
    components:{
      TableCheckbox
    },
    computed:{
      textPosition(){
        return(item)=>{
          if(item.align==='right') return 'flex-end'
          if(item.align==='left') return 'flex-start'
          if(item.align==='center') return 'center'
        }
      }
    },
    data(){
      return{

      }
    },
    methods:{
      sortAction(item,index){
        this.$emit('sortAction',item,index)
      },
      checkboxSelectedAll(e){
        this.$emit('checkboxSelectedAll',e)
      }
    }
  }
</script>

<style lang="scss">
.zb-stick-side{
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  //border-right: solid 1rpx #dbdbdb;
  box-sizing: border-box;
  background: #fafafa;
  //box-shadow: 6px 0 6px -4px #ccc;
}

.zb__item-inner{

  display: flex;
  flex-direction: column;

  .item-th{
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background: #fafafa;
    .item-content{
      height: 40px;
      padding-left: 8px;
      padding-right: 20px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
  }
  .sorter-table{
    position: absolute;
    right: 6px;
    top:50%;
    transform:translateY(-50%);
    .sorter-table-icon{
      width: 0;
      height: 0;
      color: #dcdcdc;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }
    .sorter-table-icon:first-child{
      border-bottom: 5px solid currentColor;
    }
    .sorter-table-icon:last-child{
      margin-top: 1.5px;
      border-top: 5px solid currentColor;
    }
    .sorting_desc{
      color: #2979ff;
    }
    .sorting_asc{
      color: #2979ff;
    }
  }
  .checkbox-item{
    display: flex;align-items: center;justify-content: center;width: 100%;height: 100%
  }
  .item-children{
    display: flex;
  }
}

</style>
