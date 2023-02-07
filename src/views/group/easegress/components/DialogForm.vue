<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { addEtcd } from "@/api/easegress";

// const SELECT_OPTIONS = [
//   { label: "网关", value: 1 },
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
      const v = addEtcd({
        name: formData.value.name,
        address: formData.value.address,
        description: formData.value.description,
        comment: formData.value.comment,
        status: Number(formData.value.status)
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
  name: [{ required: true, message: "请输入网关名称", trigger: "blur" }],
  address: [{ required: true, message: "请输入网关地址", trigger: "blur" }],
  status: [
    {
      required: true,
      message: "请选择网关状态",
      trigger: "change"
    }
  ]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="新建网关"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="网关名称" prop="name">
        <el-input
          v-model="formData.name"
          :style="{ width: '480px' }"
          placeholder="请输入网关名称"
        />
      </el-form-item>
      <el-form-item label="网关地址" prop="address">
        <el-input
          v-model="formData.address"
          :style="{ width: '480px' }"
          placeholder="请输入网关地址"
        />
      </el-form-item>
      <el-form-item label="网关状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio label="0">已停用</el-radio>
          <el-radio label="1">已启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="网关描述" prop="description">
        <el-input
          v-model="formData.description"
          :style="{ width: '480px' }"
          placeholder="请输入网关描述"
        />
      </el-form-item>
      <el-form-item label="备注" prop="mark">
        <el-input
          v-model="formData.comment"
          type="textarea"
          :style="{ width: '480px' }"
          placeholder="请输入内容"
        />
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
