<template>
  <b-modal
    id="modallinklist"
    ref="modallinklist"
    title="链接管理"
    hide-footer
    v-model="modalshow"
    @hidden="$emit('hidden')"
  >
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="variant"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{message}} ({{dismissCountDown}})</p>
      <b-progress variant="warning" :max="dismissSecs" :value="dismissCountDown" height="2px"></b-progress>
    </b-alert>
    <b-input-group>
      <b-form-input placeholder="搜索关键字" v-model="keyword"/>
      <b-button @click="loadlinklist" size="sm">搜索</b-button>
      <b-button @click="showaddlink=true" size="sm">添加</b-button>
    </b-input-group>
    <b-collapse id="collapse1" class="mt-2" v-model="showaddlink">
      <b-card>
        <form style="text-align:left;" ref="form" @submit="savelink">
          <b-form-group
            id="InputGroup1"
            label="链接文字:"
            label-for="linktext"
            description="链接显示的文字"
          >
            <b-form-input
              id="linktext"
              type="text"
              v-model.trim="form.linktext"
              required
              placeholder="链接文字"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="InputGroup2"
            label="链接地址:"
            label-for="linkaddress"
            description="链接地址"
          >
            <b-form-input
              id="linkaddress"
              type="text"
              v-model.trim="form.linkaddress"
              placeholder="链接地址"
              required
            ></b-form-input>
          </b-form-group>
          <div style="text-align:right">
            <b-button type="submit" variant="primary">保存</b-button>
            <b-button type="reset" variant="danger" @click="clearform">取消</b-button>
          </div>
        </form>
      </b-card>
    </b-collapse>
    <b-table striped hover :items="items" :fields="fields" :per-page="perPage">
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button-group class="mx-1" size="sm">
          <b-btn @click.stop="editlesson(row.index,row.item)">编辑</b-btn>
          <b-btn @click.stop="del(row.index,row.item)">删除</b-btn>
          <b-btn @click.stop="row.toggleDetails">详细</b-btn>
        </b-button-group>
      </template>
      <template slot="row-details" slot-scope="row">
        <span style="word-wrap:break-word;word-break:break-all;">{{row.item.url}}</span>
      </template>
    </b-table>
    <b-pagination align="center" :total-rows="totalrows" v-model="currentPage" :per-page="perPage"></b-pagination>
  </b-modal>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loadingbacktitle: "正在保存...",
      showloadingback: false,
      showaddlink: false,
      variant: "warning",
      dismissSecs: 10,
      dismissCountDown: 0,
      message: "",
      totalrows: 0,
      perPage: 5,
      currentPage: 1,
      modalshow: false,
      fields: [
        { key: "title", label: "链接文字", sortable: true },
        { key: "actions", label: "操作" }
      ],
      items: [],
      keyword: "",
      form: {
        linktext: "",
        linkaddress: ""
      }
    };
  },
  props: ["show", "user"],
  watch: {
    currentPage: function() {
      this.loadlinklist();
    },
    show: function(val, oldval) {
      if (val) {
        this.modalshow = val;
        this.loadlinklist();
      }
    }
  },
  methods: {
    showalert(message, variant, dismissSecs) {
      this.variant = variant || "success";
      this.dismiss = dismissSecs || 10;
      this.message = message || "保存成功！";
      this.dismissCountDown = dismissSecs;
    },
    showloading(message, show) {
      this.$emit('showloading',message,show)
    },
    clearform() {
      if (this.form.id) delete this.form["id"];
      this.form.linktext = "";
      this.form.linkaddress = "";
      this.showaddlink = false;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    del(index, item) {
      this.showloading("正在删除...", true);
      let self = this;
      axios
        .get("/sitenav/deletelink?id=" + item._id)
        .then(this.deletelink)
        .catch(function(err) {
          self.showalert("系统出错：" + err.message, "danger", 10);
        });
    },
    deletelink(res) {
      this.showloading();
      if (res.data.error) {
        this.showalert("删除记录出错：" + res.data.message, "danger", 10);       
        return;
      }
      this.loadlinklist();
    },
    loadlinklist() {
      this.showloading("正在加载数据...", true);
      let self = this;
      axios
        .get(
          "/sitenav/getalllinkpaging?currentpage=" +
            this.currentPage +
            "&keyword=" +
            this.keyword
        )
        .then(this.showlink)
        .catch(function(err) {
          self.showloading()
          self.showalert("系统出错：" + err.message, "danger", 10);
        });
    },
    showlink(res) {
      this.showloading();
      if (res.data.error) {
        this.showalert("加载数据出错：" + res.data.message, "danger", 10);
        return;
      }
      this.totalrows = res.data.pagingdata.count;
      this.items = res.data.pagingdata.recordset;
    },
    savelink(evt) {
      evt.preventDefault();
      let self = this;
      this.showloading("正在保存...", true);
      if (this.form.id) {
        axios
          .post("/sitenav/editlink", {
            linkinfo: this.form
          })
          .then(this.editinglink)
          .catch(function(err) {
            self.showloading()
            self.showalert("系统出错：" + err.message, "danger", 10);
          });
        return;
      }

      axios
        .post("/sitenav/savelink", { linkinfo: this.form })
        .then(this.saveinglink)
        .catch(function(err) {
          self.showloading()
          self.showalert("系统出错：" + err.message, "danger", 10);
        });
    },
    editinglink(res) {
      this.showloading();
      if (res.data.error) {
        this.showalert("保存失败：" + res.data.message, "danger", 10);
        return;
      }
      this.showaddlink = false;
      this.showalert("保存成功", "success", 5);
      this.form.lessonname = "";
      this.form.lessoncontent = "";
      this.loadlinklist();
    },
    saveinglink(res) {
      this.showloading();
      if (res.data.error) {
        this.showalert("保存失败：" + res.data.message, "danger", 10);
        return;
      }
      //正常处理
      this.showaddlink = false;
      this.showalert("保存成功", "success", 5);
      this.form.linktext = "";
      this.form.linkaddress = "";
      this.loadlinklist();
    },
    editlesson(index, item) {
      this.showaddlink = true;
      this.form.linktext = item.title;
      this.form.linkaddress = item.url;
      this.form.id = item._id;
    }
  }
};
</script>
