<template>
  <div class="bg-white m-4 mr-0 parameter_tree">
    <div class="search_form">
      <Row :gutter="16">
        <Col :span="16">
          <input-search
            @search="fetch"
            placeholder="input search parameter"
            v-model.trim:value="searchName"
          />
        </Col>
        <Col :span="8" class="switch_box">
          <Switch @click="fetch" v-model:checked="checked">
            <template #checkedChildren>✔ tr069</template>
            <template #unCheckedChildren>✖ tr069</template>
          </Switch>
        </Col>
      </Row>
    </div>
    <BasicTree
      v-if="treeData.length"
      :beforeRightClick="getRightMenuList"
      :clickRowToExpand="false"
      :replaceFields="{ key: 'fullName', title: 'nodeName' }"
      :treeData="treeData"
      defaultExpandLevel="1"
      @select="handleSelect"
    />
    <Loading :absolute="absolute" :loading="loading" :tip="tip" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue';
  import { InputSearch, Switch, Row, Col } from 'ant-design-vue';
  import { BasicTree, TreeItem, ContextMenuItem } from '/@/components/Tree';
  import { findParametersTree } from '/@/api/device/parameter';
  import { Loading } from '/@/components/Loading';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree, InputSearch, Switch, Row, Col, Loading },
    emits: ['select'],
    setup(_, { emit }) {
      const searchName = ref<string>('');
      const checked = ref<boolean>(false);
      const treeData = ref<TreeItem[]>([]);
      const compState = reactive({
        absolute: true,
        loading: false,
        tip: '加载中...',
      });

      async function fetch() {
        compState.loading = true;
        const params = {
          tr069: checked.value,
          ...(!!searchName.value && { searchName: searchName.value }),
        };
        treeData.value = [(await findParametersTree(params)) as unknown as TreeItem[]];
        compState.loading = false;
      }
      //:{selected: bool, selectedNodes, node, event}
      function handleSelect(_, e) {
        if (!e?.selectedNodes[0]?.props) return;
        const { fullName, treeType } = e?.selectedNodes[0]?.props;
        if (treeType !== 0) {
          emit('select', {
            fullName,
            tr069: checked.value,
          });
        }
      }

      function getRightMenuList(node: any): ContextMenuItem[] {
        return [
          {
            label: '新增',
            handler: () => {
              console.log('点击了新增', node);
              alert('新增');
            },
            icon: 'bi:plus',
          },
          {
            label: '删除',
            handler: () => {
              console.log('点击了删除', node);
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
        checked,
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

  .switch_box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
