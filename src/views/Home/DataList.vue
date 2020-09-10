<template>
  <div class="data-list">
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
          <span>****************</span>
        </template>
      </el-table-column>
      <el-table-column prop="privateCode" label="上传时间" align="center">
        <template slot-scope="scope">
          <span>{{new Date(scope.row.UpdateTime).toLocaleString()}}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看文件" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="()=>dialogVisible=true">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="查看内容" :visible.sync="dialogVisible" width="60%">
      <el-button-group>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList"
          :auto-upload="false"
          :limit="1"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          {{!!fileList[0]}}
        </el-upload>
      </el-button-group>
      <p>******</p>
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
          .map((authId) => this.authMap[authId].name)
          .join(" and ")})`;
      });
      return result.join(" or ");
    },
  },
};
</script>