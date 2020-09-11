<template>
  <div class="data-list">
    <h1 class="data-list-title">数据列表</h1>
    <el-table :data="tableData" border style="width: 90%">
      <el-table-column fixed prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>

      <el-table-column prop="authList" label="访问策略" align="center">
        <template slot-scope="scope">
          <span>{{transferAuthArrToText(scope.row.authList)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="privateCode" label="密文" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.title}}****************</span>
        </template>
      </el-table-column>
      <el-table-column prop="privateCode" label="上传时间" align="center">
        <template slot-scope="scope">
          <span>{{new Date(scope.row.UpdateTime).toLocaleString()}}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看文件" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="openDialog(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="查看内容" :visible.sync="dialogVisible" @opened="recoverToInital" width="60%">
      <el-button-group>
        <el-upload
          ref="uploadFile"
          :show-file-list="false"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList"
          :auto-upload="false"
          :limit="1"
          :on-change="validSuccess"
        >
          <el-button slot="trigger" size="small" type="warning" :disabled="isValided || validating">上传文件</el-button>
        </el-upload>
      </el-button-group>
      <div class="content">
        <h1 class="validating-text" v-if="validating">解密中，请稍后</h1>
        <h1 class="no-valid-text" v-else-if="!isValided">内容已被加密，请上传密钥查看</h1>
        <div class="after-content" v-else-if="showContent.length>0">
            <div v-for="(con, index) in showContent" :key="index">
                <p v-if="con.type==='text'" class="content-text">{{con.data}}</p>
                <img v-else class="content-img" :src="con.data">
            </div>
        </div>
        <h1 v-else>内容为空</h1>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      content: [],
      showContent:[],
      validating: false,
      isValided: false,
    };
  },
  computed: {
    ...mapGetters(["user", "spaceIndex", "userData", "spaceData"]),
    tableData() {
      const { spaceData = {}, spaceIndex = 0 } = this;
      return spaceData[spaceIndex].dataList;
    },
    authMap() {
      const { spaceData = {}, spaceIndex = 0 } = this;
      const authList = spaceData[spaceIndex].auth,
        map = {};
      authList.forEach((auth) => {
        map[auth.id] = auth;
      });
      return map;
    },
  },
  methods: {
    transferAuthArrToText(authArr) {
      const result = authArr.map((group) => {
        return `(${group
          .map((authId) => this.authMap[authId]?.name)
          .join(" and ")})`;
      });
      return result.join(" or ");
    },
    openDialog(row) {
      this.showContent = []
      this.content = row.privateCode;
      this.isValided = false;
      this.dialogVisible = true;
    },
    recoverToInital() {
      this.$refs.uploadFile.clearFiles();
    },
    validSuccess(){
        this.validating = true
        setTimeout(()=>{
            this.validating = false
            this.$message.success({ message: '认证成功' })
            this.isValided = true
            this.showContent = this.content
        },3000)
    }
  },
};
</script>

<style lang="less" scoped>
.data-list{
    flex-direction: column;
    .data-list-title {
        margin:40px;
    }
}
.content {
  min-height: 500px;
  padding: 20px 30px;
  text-align: center;
  font-size: 20px;

  .no-valid-text {
    color: #f40;
  }
  .validating-text{
      color: #666;
  }
  .content-text{
      text-align: left;
      text-indent: 2em;
  }
  .content-img{
      height: 200px;
  }
}
</style>