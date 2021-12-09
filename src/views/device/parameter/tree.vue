<template>
  <div class="bg-white m-4 mr-0 parameter_tree">
    <div class="search_form">
      <Row :gutter="16">
        <Col :span="24">
          <input-search
            v-model:value.trim="searchName"
            placeholder="input search parameter"
            @search="fetch"
          />
        </Col>
        <!--        <Col :span="8" class="switch_box">-->
        <!--          <Switch @click="fetch" v-model:checked="checked">-->
        <!--            <template #checkedChildren>✔ tr069</template>-->
        <!--            <template #unCheckedChildren>✖ tr069</template>-->
        <!--          </Switch>-->
        <!--        </Col>-->
      </Row>
    </div>
    <BasicTree
      v-if="treeData.length"
      :beforeRightClick="getRightMenuList"
      :clickRowToExpand="false"
      :replaceFields="{ key: 'identity', title: 'title' }"
      :treeData="treeData"
      defaultExpandLevel="1"
      @select="handleSelect"
    />
    <Loading :absolute="absolute" :loading="loading" :tip="tip" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue';
  import { InputSearch, Row, Col } from 'ant-design-vue'; // Switch,
  import { BasicTree, TreeItem, ContextMenuItem } from '/@/components/Tree';
  import { findParametersTree } from '/@/api/device/parameter';
  import { Loading } from '/@/components/Loading';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree, InputSearch, Row, Col, Loading }, // Switch,
    emits: ['select'],
    setup(_, { emit }) {
      const searchName = ref<string>('');
      // const checked = ref<boolean>(false);
      const treeData = ref<TreeItem[]>([]);
      const compState = reactive({
        absolute: true,
        loading: false,
        tip: '加载中...',
      });
      /**
       * @desc 输入框查询触发事件
       * @return {Object} findParametersTree 接口返回 查询数据 treeData
       */
      async function fetch() {
        compState.loading = true;
        const params = {
          // tr069: checked.value,
          ...(!!searchName.value && { searchName: searchName.value }),
        };
        treeData.value = [(await findParametersTree(params)) as unknown as TreeItem[]];
        compState.loading = false;
      }
      /**
       * @desc tree 节点选择触发事件
       * @param _
       * @param e 当前选择节点的信息
       * @return {String} 根据treeType的值 判断 是否触发父级select事件
       */
      function handleSelect(_, e) {
        if (!e?.selectedNodes[0]?.props) return;
        console.log('🚀e👉👉', e);
        const { fullName, fullViewName, treeType } = e?.selectedNodes[0]?.props;
        if (treeType !== 0) {
          emit('select', {
            parameterName: fullViewName || fullName,
            // tr069: checked.value,
          });
        }
      }
      // node: any
      /**
       * @desc 定义 右键菜单格式数据
       * @return {Array} rightMenuList
       */
      function getRightMenuList(): ContextMenuItem[] {
        return [
          {
            label: '新增',
            handler: () => {
              alert('新增');
            },
            icon: 'bi:plus',
          },
          {
            label: '删除',
            handler: () => {
              alert('删除');
            },
            icon: 'bx:bxs-folder-open',
          },
        ];
      }

      onMounted(() => {
        fetch();
      });

      return {
        fetch,
        handleSelect,
        getRightMenuList,
        ...toRefs(compState),
        treeData,
        searchName,
        // checked,
      };
    },
  });
</script>

<style scoped>
  .search_form {
    padding: 10px;
    border-bottom: 1px solid #d9d9d9;
  }

  .parameter_tree {
    position: relative;
    padding: 0 10px;
  }
</style>
