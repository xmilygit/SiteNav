<template>
  <div>
    <b-modal
      id="changepsw-modal"
      ref="modal"
      title="更改密码"
      size="sm"
      v-model="modalshow"
      @hidden="$emit('hidden')"
      hide-footer
    >
      <b-form ref="form" @submit="handleSubmit"   validated>
        <b-form-group label="原密码" label-for="oldpsw-input" invalid-feedback="Name is required">
          <b-form-input id="oldpsw-input" v-model="psw.old" required type="password" :state="$v.psw.old.$dirty ? !$v.psw.old.$error : null"></b-form-input>
        </b-form-group>
        <b-form-group label="新密码" label-for="newpsw-input">
          <b-form-input id="newpsw-input" v-model="psw.new" required type="password"></b-form-input>
        </b-form-group>
        <b-form-group label="确认新密码" label-for="replpsw-input">
          <b-form-input id="replpsw-input" v-model="psw.repl" required type="password"></b-form-input>
        </b-form-group>
        <div style="text-align:right">
          <b-button type="reset" variant="danger" @click="clearform">取消</b-button>
          <b-button type="submit" variant="primary">保存</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
        test:null,
      modalshow: false,
      psw: {
        old: null,
        new: null,
        repl:null
      }
    };
  },
  props: ["show", "username"],
  watch: {
    show: function(val, oldval) {
      if (val) {
        this.modalshow = val;
      }
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    clearform() {
      this.psw.old = "";
      this.psw.new = "";
      this.modalshow = false;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit(evt) {
      // Exit when the form isn't valid
      evt.preventDefault()
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
    //   this.submittedNames.push(this.name);
      // Hide the modal manually
       this.$nextTick(() => {
        //  this.$refs.modal.hide();
       });
    }
  }
};
</script>