<template>
  <div class="create-meeting">
    <a-page-header title="创建会议报名" sub-title="" @back="() => null" />
    <div class="form-box">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <h3 style="text-align:center;margin-bottom:24px;font-weight:600">
          {{ steps[current].content }}
        </h3>
        <div v-if="current === 0">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item ref="name" label="会议名称" prop="name">
              <a-input v-model="form.name" placeholder="输入会议名称" />
            </a-form-model-item>
            <a-form-model-item label="起始日期" required prop="startDate">
              <a-date-picker
                v-model="form.startDate"
                show-time
                type="date"
                placeholder="选择起始日期"
                style="width: 100%;"
              />
            </a-form-model-item>
            <a-form-model-item label="结束日期" required prop="endDate">
              <a-date-picker
                v-model="form.endDate"
                show-time
                type="date"
                v-cloak
                placeholder="选择结束日期"
                style="width: 100%;"
              />
            </a-form-model-item>
            <a-form-model-item label="会议简介" prop="content">
              <a-input
                v-model="form.content"
                rows="6"
                type="textarea"
                placeholder="请输入会议简介，100字以内"
              />
            </a-form-model-item>
            <a-form-model-item label="会议封面" prop="cover">
              <a-input v-model="form.cover" hidden/>
              <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div v-if="current === 1">2</div>
        <div v-if="current === 2">3</div>
      </div>
      <div class="steps-action">
        <a-button
          v-if="current < steps.length - 1"
          type="primary"
          @click="next"
        >
          下一步
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="complete"
        >
          完成
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          上一步
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  PageHeader,
  Form,
  FormModel,
  Input,
  Button,
  DatePicker,
  Radio,
  Checkbox,
  Switch,
  Select,
  Steps,
  message,
  Upload,
} from "ant-design-vue";
Vue.use(PageHeader)
  .use(Form)
  .use(FormModel)
  .use(Input)
  .use(Button)
  .use(DatePicker)
  .use(Radio)
  .use(Checkbox)
  .use(Switch)
  .use(Select)
  .use(Steps)
  .use(message).use(Upload);
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "CreateMeeting",
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "第一步",
          content: "创建会议基本信息",
        },
        {
          title: "第二步",
          content: "上传会议宣传图",
        },
        {
          title: "最后一步",
          content: "发布分享",
        },
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      form: {
        name: "",
        startDate: "",
        endDate: "",
        content: "",
        cover: "",
      },
      rules: {
        name: [{ required: true, message: "请输入会议名称", trigger: "blur" }],
        startDate: [
          { required: true, message: "请输入起始日期", trigger: "blur" },
        ],
        endDate: [
          { required: true, message: "请输入结束日期", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入会议简介", trigger: "blur" },
        ],
        cover: [{ required: true, message: "请上传会议封面", trigger: "blur" }],
      },
      loading: false,
      imageUrl: '',
    };
  },
  methods: {
    next() {
     
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
           this.current++;
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    prev() {
      this.current--;
    },
    complete() {
      message.info("创建成功");
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.form.cover = this.imageUrl
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  },
};
</script>

<style>
.create-meeting {
  margin-bottom:24px;
}
.create-meeting .form-box {
  width: 960px;
  min-height: 600px;
  overflow: hidden;
  margin: 0 auto;
  padding: 24px;
}
.steps-content {
  min-height: 480px;
  padding: 24px;
  border: 1px solid #e8e8e8;
  background-color: #f5f5f5;
  margin: 24px 0;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
