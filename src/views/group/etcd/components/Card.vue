<script setup lang="ts">
import { computed, PropType } from "vue";
// import shopIcon from "@/assets/svg/shop.svg?component";
// import laptopIcon from "@/assets/svg/laptop.svg?component";
import serviceIcon from "@/assets/svg/service.svg?component";
// import calendarIcon from "@/assets/svg/calendar.svg?component";
// import userAvatarIcon from "@/assets/svg/user_avatar.svg?component";
import More2Fill from "@iconify-icons/ri/more-2-fill";
import { EtcdItem } from "@/api/etcd";

defineOptions({
  name: "ReCard"
});

const props = defineProps({
  product: {
    type: Object as PropType<EtcdItem>
  }
});

const emit = defineEmits(["manage-product", "delete-item"]);

const handleClickManage = (product: EtcdItem) => {
  emit("manage-product", product);
};

const handleClickDelete = (product: EtcdItem) => {
  emit("delete-item", product);
};

const cardClass = computed(() => [
  "list-card-item",
  { "list-card-item__disabled": props.product.status === 0 }
]);

const cardLogoClass = computed(() => [
  "list-card-item_detail--logo",
  { "list-card-item_detail--logo__disabled": props.product.status === 0 }
]);
</script>

<template>
  <div :class="cardClass">
    <div class="list-card-item_detail bg-bg_color">
      <el-row justify="space-between">
        <div :class="cardLogoClass">
          <!-- v-if="product.type === 3" -->
          <serviceIcon />
        </div>
        <div class="list-card-item_detail--operation">
          <el-tag
            :color="props.product.status === 0 ? '#00a870' : '#eee'"
            effect="dark"
            class="mx-1 list-card-item_detail--operation--tag"
          >
            {{ props.product.status === 0 ? "已启用" : "已停用" }}
          </el-tag>
          <el-dropdown trigger="click" :disabled="props.product.status === 0">
            <IconifyIconOffline :icon="More2Fill" class="text-[24px]" />
            <template #dropdown>
              <el-dropdown-menu :disabled="props.product.status === 0">
                <el-dropdown-item @click="handleClickManage(product)">
                  管理
                </el-dropdown-item>
                <el-dropdown-item @click="handleClickDelete(product)">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-row>
      <p class="list-card-item_detail--name text-text_color_primary">
        {{ product.name }}
      </p>
      <p class="list-card-item_detail--desc text-text_color_regular">
        {{ product.description }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-card-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;

  &_detail {
    flex: 1;
    padding: 24px 32px;
    min-height: 140px;

    &--logo {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #e0ebff;
      font-size: 32px;
      color: #0052d9;

      &__disabled {
        color: #a1c4ff;
      }
    }

    &--operation {
      display: flex;
      height: 100%;

      &--tag {
        border: 0;
      }
    }

    &--name {
      margin: 24px 0 8px 0;
      font-size: 16px;
      font-weight: 400;
    }

    &--desc {
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 24px;
      height: 40px;
    }
  }

  &__disabled {
    .list-card-item_detail--name,
    .list-card-item_detail--desc {
      color: var(--el-text-color-disabled);
    }

    .list-card-item_detail--operation--tag {
      color: #bababa;
    }
  }
}
</style>
