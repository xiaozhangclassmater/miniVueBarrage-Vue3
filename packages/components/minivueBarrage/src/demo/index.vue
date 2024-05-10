<template>
  <div class="panel-wapper">
    <miniVueBarrage
      v-model="barrages"
      :fullScreen="fullScreenSwitch"
      :showBarrage="showBarrage"
      :opacity="opacityValue"
      :pausedFlag="barragePaused"
      :createFrequencyTime="times"
      :delay="10"
      :color="'#000'"
      :bgColor="'#ddd'"
      ref="barrageRef"
      batchDestroy
      @change="changeHandle"
       >
      <template #icon>
        <div class="icon"></div>
      </template>
    </miniVueBarrage>
    <div class="operation-panel">
      <div class="container">
        <div>操作面板</div>
        <div class="left-operation-panel">
          <div class="slider-demo-block">
            <div class="demonstration flex-wapper">透明度：</div>
            <el-slider v-model="opacityValue" />
          </div>
          <div class="flex-wapper margin-t-8">
            <div>弹幕高度：</div>
            <div>
              <el-input class="el-input-wapper" v-model="barrageHeightValue" style="width: 220px" placeholder="Please input" />
            </div>
          </div>
          <div class="flex-wapper margin-t-8">
            <div>发送弹幕：</div>
            <el-input class="el-input-wapper" v-model="barrageContent" style="width: 220px" placeholder="弹幕内容" />
          </div>
          <div class="flex-wapper margin-t-8">
            <div>渲染频率：</div>
            <el-input class="el-input-wapper"   v-model="times" style="width: 220px" placeholder="渲染频率(s)" />
          </div>
          <div class="flex-wapper margin-t-8">
            <div>弹幕显示（是否全屏）</div>
            <el-switch v-model="fullScreenSwitch"    style="--el-switch-on-color: #13ce66 ; --el-switch-off-color: #b2b2b2"/>
          </div>
          <div class="flex-wapper margin-t-8">
            <div>弹幕暂停（是否暂停）</div>
            <el-switch v-model="barragePaused"    style="--el-switch-on-color: #13ce66 ; --el-switch-off-color: #b2b2b2"/>
          </div>
          <div class="flex-wapper margin-t-8">
            <div>弹幕（隐藏 / 显示）</div>
            <el-switch v-model="showBarrage"    style="--el-switch-on-color: #13ce66 ; --el-switch-off-color: #b2b2b2"/>
          </div>
          <div class="flex-wapper margin-t-8">
            <div>实时弹幕总数：{{barrages.length}}</div>
          </div>
          <div class="flex-wapper margin-t-8">
            <div>已渲染总数： {{curRenderCount}}</div>
          </div>
          <div class="button-groups margin-t-8 flex-wapper">
            <el-button type="success" @click="startHandle" >开始</el-button>
            <el-button type="warning" @click="resetHandle" >重置弹幕</el-button>
            <el-button type="danger" @click="clearHandle">清空</el-button>
            <el-button type="info" @click="addHandle">添加弹幕</el-button>
            <el-button type="primary">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage as Message } from 'element-plus';
import { ref } from 'vue';
import { barrageDatas } from '../../../../mock';
import miniVueBarrage from '../index.vue';
const barrages = [...barrageDatas]
const opacityValue = ref(100)
const barrageRef= ref<InstanceType<typeof miniVueBarrage> >()
const barrageHeightValue = ref(35)
const fullScreenSwitch = ref(true)
const showBarrage = ref(true)
const barragePaused = ref(false)
const barrageContent = ref('')
const curRenderCount = ref(0)
const times = ref(0.1)
const addHandle = () => {
  if(!barrageContent.value){
    return Message.warning("内容不能为空")
  }
  barrageRef.value?.create({
    content: barrageContent.value,
    id: 1,
    type: 'user'
  })
}
const startHandle = () => {
  barrageRef.value?.start()
}
const changeHandle = (params: any) => {
  curRenderCount.value = params.renderCount
}
const resetHandle = () => {
  barrageRef.value?.reset()
}
const clearHandle = () => {
  barrageRef.value?.clear()
}
</script>

<style scoped lang="less">
.flex-wapper{
  display: flex;
  align-items: center;
}
.margin-t-8{
  margin-top: 8px;
}
.el-button{
  margin-left: 7px;
}
.panel-wapper{
  .operation-panel{
    justify-content: center;
    position: absolute;
    width: 18%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    .container{
      user-select: none;
      padding: 20px 10px;
      box-sizing: border-box;
      color: #fff;
      text-align: center;
      width: 100%;
      .left-operation-panel{
        .slider-demo-block{
          display: flex;
          align-items: center;
          .demonstration{
            width: 100px
          }
        }
      }
    }
  }
}
.icon{
  width:22px;
  height: 22px;
  background: url('../assets/vue.png') no-repeat center center;
  background-size: 100% 100%
}
</style>
