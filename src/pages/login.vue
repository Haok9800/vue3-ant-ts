<template>
  <div class="login">
    <div class="login-body">
      <h3>市民码平台</h3>
      <a-icon type="setting" />
      <div><Icon type="smile"></Icon></div>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item ref="name" name="name">
          <a-input v-model:value="formState.name" placeholder="请输入用户名">
          </a-input>
        </a-form-item>
        <a-form-item ref="pwd" name="pwd">
          <a-input-password
            v-model:value="formState.pwd"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item ref="code" required name="code">
          <a-input v-model:value="formState.code" placeholder="请输入验证码" />
        </a-form-item>
        <a-form-item>
          <a-button style="width: 100%" type="primary" @click="onSubmit"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { request } from "../sdk/request";
import { defineComponent, reactive, ref, toRaw, UnwrapRef,inject } from "vue";
interface FormState {
  name: string;
  pwd: string | undefined;
  code: string | number;
}
export default defineComponent({
  setup: () => {
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      name: "",
      pwd: undefined,
      code: "",
    });
    // 表单规则
    const rules = {
      name: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      pwd: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
      code: [
        {
          required: true,
          message: "请输入验证码",
          trigger: "blur",
        },
      ],
    };
    const  onSubmit =async () => {
      const store = inject('store');  
      console.log(store)
      debugger
      let data = await request({
        url: "/captcha",
        method: "post",
      })
      return;
      formRef.value
        .validate()
        .then(() => {
          console.log("values", formState, toRaw(formState));
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      formRef,
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
      formState,
      rules,
      onSubmit,
      resetForm,
    };
  },
});
</script>
<style lang="less" scoped>
.login {
  background: #fff;
  height: 100vh;
  position: relative;
  &-body {
    width: 404px;
    height: 380px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    padding: 0 32px;
  }
}
</style>
