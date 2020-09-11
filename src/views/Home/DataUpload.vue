<template>
  <div class="data-upload">
    <h1 class="title" v-if="loading">上传中，请稍后...</h1>
    <h1 class="title" v-else>数据上传</h1>

    <el-form style="width:80%; margin: 0 auto;">
      <!-- 文件上传 -->
      <el-form-item>
        <el-upload
          ref="upload"
          class="upload-demo"
          drag
          :auto-upload="false"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">大小不超过2GB</div>
        </el-upload>
      </el-form-item>

      <!-- 标题 -->
      <el-form-item label="标题:" style="width:90%;" >
        <el-input placeholder="请输入标题" v-model="title"></el-input>
      </el-form-item>

      <!-- 策略选择 -->
      <p style="textAlign: left; margin: 10px 0">请选择策略：</p>
      <el-form-item v-for="index in selected.length" :key="index">
        <div class="auth-unit">
          <el-tag
            class="tag"
            @click="handleChoose(index - 1, i)"
            :type="selected[index-1][i]?'success':'info'"
            v-for="(tag, i) in options"
            :key="tag.id"
          >{{tag.label}}</el-tag>
          <el-button
            v-if="selected.length === index && !selected[index-1].every(a=>a===false)"
            type="warning"
            size="mini"
            @click="handleAddGroup"
          >增加组</el-button>
          <el-button
            v-if="1 !== index"
            type="danger"
            size="mini"
            @click="handleRemoveGroup(index-1)"
          >删除组</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="success" :disabled="loading" @click="handleUpdate">
          <span v-if="loading">
            上传中
            <i class="el-icon-loading"></i>
          </span>
          <span v-else>上传</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      selected: [],
      loading: false,
      title: "",
    };
  },
  mounted() {
    this.handleAddGroup();
  },
  computed: {
    ...mapGetters(["spaceData", "spaceIndex"]),
    options() {
      const { spaceData = [[], []], spaceIndex = 0 } = this;
      return spaceData[spaceIndex].auth.map((item) => ({
        id: item.id,
        label: item.name,
        comId: item.comId,
      }));
    },
  },
  methods: {
    handleUpdate() {
      if (this.selectedId === null) {
        this.$message.error({ message: "请选择策略" });
        return;
      }
      this.loading = true;
      const randomTime = 3000 + Math.random() * 5000;
      setTimeout(() => {
        this.loading = false;
        this.selectedId = null;
        this.$refs.upload.clearFiles();
        this.$notify.success({
          title: "成功",
          message: "上传成功",
        });
      }, randomTime);
    },
    handleChoose(x, y) {
      const origin = this.selected[x][y];
      this.selected[x].splice(y, 1, !origin);
    },
    handleAddGroup() {
      this.selected.push(this.options.map(() => false));
    },
    handleRemoveGroup(i) {
      this.selected.splice(i, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.data-upload {
  flex-direction: column;
  justify-content: space-between;
  .title {
    margin: 60px 0;
  }

  .auth-unit {
    text-align: left;
    border: 1px dotted rgba(255, 68, 0, 0.5);
    .tag {
      margin: 10px 5px;
      cursor: pointer;
    }
  }
}
</style>