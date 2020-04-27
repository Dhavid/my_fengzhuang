<template>
  <div class="tabTemplate">
    <el-table :data="comTableData" width="100%">
      <el-table-column align="center" v-for="(items,index) in headerList" :key="index" type="index" :label="items" 
      width="120px" v-if="items!=='操作'">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row[keys[index]] }}</span> -->
          <span>{{ Transform(scope,keys[index]) }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="名称" min-width="1">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column> -->

      <el-table-column label="操作" min-width="2" v-else>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'tabTemplate',
  data() { 
    return {

    }
  },
  props:{
    headerList: {
      type: Array,
      default() {
        return []
      }
    },
    comTableData: {
      type: Array,
      default() {
        return []
      }
    },
    arr:{
      type: Array,
      default() {
        return []
      }
    }
  },
  computed:{
    keys(){
      console.log(Object.keys(this.comTableData[0]))
      return Object.keys(this.comTableData[0])
    }
  },
  filters:{
    // Transform(val){
    //   if(this.arr.includes(val)){
    //     return val[scope.row[val]]
    //   }
    //   return scope.row[val]
    // }
  },
  methods:{
    Transform(scope,val){
      if(this.arr.includes(val)){
        // return val[scope.row[val]]
        // return this.$store.state.myTable.codemap[scope.row[val]]
        console.log(this.$store.state.myTable.codemap[val][scope.row[val]])
        return this.$store.state.myTable.codemap[val][scope.row[val]]
        
      }
      return scope.row[val]
    }
  }
 }
</script>

<style lang="scss" scoped>
  .tabTemplate{
    
  }
</style>