<script setup lang="ts">
import { getGateWayList } from "@/api/http-server";
// import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
import { ref, onMounted, computed } from "vue";
import dialogForm from "./components/AddGateWayDialogForm.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "http-server"
});

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const INITIAL_DATA = {
  name: "",
  port: "",
  desc: "",
  tag: ""
};

const pagination = ref({ current: 1, pageSize: 12, total: 0 });

const productList = ref([]);
const dataLoading = ref(true);

const getGateWayListData = async () => {
  try {
    // const { data } = await getGateWayList();
    const data = await getGateWayList();
    if (data.code === 0) {
      productList.value = data.data.gateway;
      pagination.value = {
        ...pagination.value,
        total: data.data.gateway.length
      };
    }
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
  }
};

// const delGateWayData = async (v?: GateWayItem) => {
//   try {
//     const data = await delGateWay(v);
//     if (data.code === 0) {
//       getGateWayListData();
//     }
//   } catch (e) {
//     console.log(e);
//   } finally {
//     setTimeout(() => {
//       dataLoading.value = false;
//     }, 500);
//   }
// };

onMounted(() => {
  getGateWayListData();
});

const formDialogVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });
const searchValue = ref("");

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};

// const handleDeleteItem = product => {
//   ElMessageBox.confirm(
//     product ? `确认删除HTTP-Server ${product.name}, 且无法恢复` : "",
//     "提示",
//     {
//       type: "warning"
//     }
//   )
//     .then(() => {
//       delGateWayData(
//         reactive<GateWayItem>({
//           name: product.name as string,
//           port: 0,
//           desc: "",
//           tag: ""
//         })
//       );
//       message("删除成功", { type: "success" });
//     })
//     .catch(() => {});
// };
// const handleManageProduct = product => {
//   formDialogVisible.value = true;
//   nextTick(() => {
//     formData.value = { ...product, status: product?.isSetup ? "1" : "0" };
//   });
// };

const GetFilterGatewayCount = computed(() => {
  const a = productList.value
    .slice(
      pagination.value.pageSize * (pagination.value.current - 1),
      pagination.value.pageSize * pagination.value.current
    )
    .filter(v =>
      v.name.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  return a.length;
});
</script>

<template>
  <div class="main">
    <div class="w-full flex justify-between mb-4">
      <el-button
        :icon="useRenderIcon(AddFill)"
        @click="formDialogVisible = true"
      >
        新建HTTP-Server
      </el-button>
      <el-input
        style="width: 300px"
        v-model="searchValue"
        placeholder="请输入HTTP-Server名称"
        clearable
      >
        <template #suffix>
          <el-icon class="el-input__icon">
            <IconifyIconOffline
              v-show="searchValue.length === 0"
              :icon="Search"
            />
          </el-icon>
        </template>
      </el-input>
    </div>
    <div
      v-loading="dataLoading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <template v-if="pagination.total > 0">
        <el-table
          :data="
            productList
              .slice(
                pagination.pageSize * (pagination.current - 1),
                pagination.pageSize * pagination.current
              )
              .filter(v =>
                v.name.toLowerCase().includes(searchValue.toLowerCase())
              )
          "
          style="width: 100%"
        >
          <el-table-column prop="name" label="HTTP-Server" width="180" />
          <el-table-column prop="port" label="端口" width="180" />
          <el-table-column prop="desc" label="描述" />
          <el-table-column prop="tag" label="所属网关" />
          <el-table-column label="后端" />
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default>
              <!-- @click="handleClick -->
              <el-button link type="primary" size="small">Detail</el-button>
              <el-button link type="primary" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="float-right"
          v-model:currentPage="pagination.current"
          :page-size="pagination.pageSize"
          :total="GetFilterGatewayCount"
          :page-sizes="[12, 24, 36]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </template>
    </div>
    <dialogForm
      v-model:visible="formDialogVisible"
      @refresh="getGateWayListData"
      :data="formData"
    />
  </div>
</template>
