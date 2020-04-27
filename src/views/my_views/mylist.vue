<template>
  <div class="list">
    <h1>列表页</h1>

    <mytable :headerList="headerList" :comTableData="bodyList" :arr="['CertType','CustomerType']"></mytable>
  </div>
</template>

<script>

import mytable from "@/components/myTable/myTable.vue";

export default {
  name: "",
  data() {
    return {
      resBodyData:{
        "body":{
            "codemap":{
                "businessProperty":{
                    "Review":"评审对象",
                    "Lessee":"承租人",
                    "Debtor":"债务人",
                    "Creaditor":"债权人",
                    "Other":"其他"
                },
                "CertType":{
                    "Usc":"统一社会信用代码",
                    "BookLet":"户口薄",
                    "Corp":"组织机构代码",
                    "IDCard":"身份证",
                    "Soldier":"士兵证"
                },
                "CustomerType":{
                    "Ent":"法人客户",
                    "Ind":"自然人客户",
                    "Third":"第三方客户"
                }
            },
            "cols":1,
            "data":{
              "list":[
                {
                  "EnterpriseName":"杜海维",
                  "CustomerType":"Third",
                  "CertType":"BookLet",
                  "UscNo":"120",
                  "CustomerId":"00003Y",
                  "InputUserId":"Dhavid"
                },
                {
                  "EnterpriseName":"路人甲",
                  "CustomerType":"Ind",
                  "CertType":"Corp",
                  "UscNo":"554",
                  "CustomerId":"55121",
                  "InputUserId":"AAA"
                },
                {
                  "EnterpriseName":"路人乙",
                  "CustomerType":"Ent",
                  "CertType":"Soldier",
                  "UscNo":"777",
                  "CustomerId":"64664",
                  "InputUserId":"BBB"
                },
                {
                  "EnterpriseName":"路人丙",
                  "CustomerType":"Third",
                  "CertType":"IDCard",
                  "UscNo":"888",
                  "CustomerId":"66666",
                  "InputUserId":"CCC"
                }
              ]
            }
        }
      },
      arr:['CertType','CustomerType']
    };
  },
  created() {
    // this.getHeader();
    // this.getBody();
    this.$store.dispatch("myTable/getHeader");
    this.$store.dispatch("myTable/getBody");
  },
  methods: {
    // getHeader() {
    //   getMyHeaderList().then(data => {
    //     console.log(data);
    //   });
    // },
    // getBody() {
    //   getMyBodyList().then(data => {
    //     console.log(data);
    //   });
    // }
  },
  computed:{
    headerList(){
      return this.$store.state.myTable.header
    },
    bodyList(){
      // console.log(this.$store.state.myTable)
      return this.$store.state.myTable.body.list||[]
      // return this.resBodyData.body.data.list
    }
  },
  components:{
    mytable
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding: 30px;
}
</style>