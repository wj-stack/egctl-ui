<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { addGateWay } from "@/api/http-server";
import { getEtcdList, EtcdItem } from "@/api/easegress";

// const SELECT_OPTIONS = [
//   { label: "HTTP-Server", value: 1 },
//   { label: "人工智能", value: 2 },
//   { label: "CVM", value: 3 },
//   { label: "防火墙", value: 4 },
//   { label: "未知", value: 5 }
// ];

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const ruleFormRef = ref<FormInstance>();

const formVisible = ref(false);

const formData = ref(props.data);

const emit = defineEmits(["update:visible", "refresh"]);

// Id          int64          `db:"id"`
// Name        string         `db:"name"`
// Address     string         `db:"address"`
// Description sql.NullString `db:"description"`
// Comment     sql.NullString `db:"comment"`
// Status      int64          `db:"status"` // 0 未启用
// CreateTime  time.Time      `db:"create_time"`
// UpdateTime  time.Time      `db:"update_time"`
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      const v = addGateWay({
        name: formData.value.name,
        desc: formData.value.desc,
        port: Number(formData.value.port),
        tag: formData.value.tag
      });
      console.log(v);
      emit("refresh");
      message("提交成功", { type: "success" });
      formVisible.value = false;
      resetForm(formEl);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  formVisible.value = false;
  resetForm(ruleFormRef.value);
};

watch(
  () => formVisible.value,
  val => {
    emit("update:visible", val);
  }
);

watch(
  () => props.visible,
  val => {
    formVisible.value = val;
  }
);

watch(
  () => props.data,
  val => {
    formData.value = val;
  }
);

const rules = {
  name: [{ required: true, message: "请输入HTTP-Server名称", trigger: "blur" }],
  port: [{ required: true, message: "请输入HTTP-Server端口", trigger: "blur" }],
  tag: [{ required: true, message: "请输入所属集群", trigger: "blur" }],
  status: [
    {
      required: true,
      message: "请选择HTTP-Server状态",
      trigger: "change"
    }
  ]
};

// const etcd = ref();
const etcdListOptions = ref([]);

const getEtcdListData = async () => {
  try {
    // const { data } = await getEtcdList();
    const data = await getEtcdList();
    if (data.code === 0) {
      etcdListOptions.value = [];
      data.data.etcd.forEach(function (data: EtcdItem) {
        etcdListOptions.value.push({
          value: data.name,
          label: data.name,
          disabled: data.status === 0
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getEtcdListData();
});
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="新建HTTP-Server"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item label="HTTP-Server名称" prop="name">
        <el-input
          v-model="formData.name"
          :style="{ width: '480px' }"
          placeholder="请输入HTTP-Server名称"
        />
      </el-form-item>
      <el-form-item label="HTTP-Server端口" prop="port">
        <el-input
          v-model="formData.port"
          :style="{ width: '480px' }"
          placeholder="请输入HTTP-Server端口"
        />
      </el-form-item>
      <!-- <el-form-item label="HTTP-Server状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio label="0">已停用</el-radio>
          <el-radio label="1">已启用</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="HTTP-Server描述" prop="desc">
        <el-input
          v-model="formData.desc"
          :style="{ width: '480px' }"
          placeholder="请输入HTTP-Server描述"
        />
      </el-form-item>
      <el-form-item label="集群" prop="tag">
        <el-select v-model="formData.tag" placeholder="Select">
          <el-option
            v-for="item in etcdListOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
