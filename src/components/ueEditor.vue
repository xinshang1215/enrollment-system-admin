<template>
    <div style="height:100%;">
        <vue-ueditor-wrap ref="vueUEditor" v-model="htmlContent"
                          :config="myConfig" :destroy="true"
                          @ready="ready"
                          mode="observer"
                          :observerDebounceTime="100"
                          :observerOptions="{ attributes: true, characterData: true, childList: true, subtree: true }"
                          @beforeInit="addCustomButtom"></vue-ueditor-wrap>
        <Progress v-if="percentage" :percent='percentage' :stroke-width="6"/>
        <input id="uploadImg" type="file" style="display:none" accept="image/png, image/jpeg, image/gif"
               @change="uploadImage">
        <input id="uploadVideo" type="file" style="display:none" accept="video/mp4" @change="uploadVideo">
        <input id="uploadFile" type="file" style="display:none" accept="" @change="uploadFile">

    </div>
</template>

<script>
    // import oss from '../utils/ali-oss'
    import VueUeditorWrap from 'vue-ueditor-wrap'
    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    export default {
        name: "ueEditor",
        components: {
            VueUeditorWrap
        },
        data () {
            return {
                progress: '',
                percentage: 0,
                htmlContent: '',
                preContent: '',
                myConfig: {
                    autoHeightEnabled: false,
                    initialFrameHeight: 600,
                    initialFrameWidth: '100%',
                    UEDITOR_HOME_URL: '/UEditor/',
                    allowDivTransToP: false,
                    serverUrl:'',
                    toolbars: [[
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'bold', 'italic', 'underline','|', 'superscript', 'subscript', 'blockquote', '|',
                        'forecolor', 'backcolor', '|', 'insertorderedlist', 'insertunorderedlist', '|','rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                        'removeformat', 'formatmatch', 'autotypeset', 'pasteplain','selectall', 'cleardoc', '|',
                        'directionalityltr', 'directionalityrtl', 'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                        'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                        '|',
                        'horizontal', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                        'print', 'preview', 'searchreplace',
                    ]],'fontfamily':[
                        { label:'',name:'songti',val:'宋体,SimSun'},
                        { label:'',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
                        { label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'},
                        { label:'',name:'heiti',val:'黑体, SimHei'},
                        { label:'',name:'lishu',val:'隶书, SimLi'},
                        { label:'',name:'andaleMono',val:'andale mono'},
                        { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
                        { label:'',name:'arialBlack',val:'arial black,avant garde'},
                        { label:'',name:'comicSansMs',val:'comic sans ms'},
                        { label:'',name:'impact',val:'impact,chicago'},
                        { label:'',name:'timesNewRoman',val:'times new roman'}
                    ],'fontsize':[10, 11, 12, 14, 16, 18, 20, 21, 22, 23, 24, 36]
                    ,'paragraph':{'p':'', 'h1':'', 'h2':'', 'h3':'', 'h4':'', 'h5':'', 'h6':''}
                    ,'rowspacingtop':['2', '5', '10', '15', '20', '25']
                    ,'rowspacingbottom':['2', '5', '10', '15', '20', '25']
                    ,'lineheight':['1', '1.5','1.75','2', '3', '4', '5']
                    ,'customstyle':[
                        {tag:'h1', name:'tc', label:'', style:'border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;'},
                        {tag:'h1', name:'tl',label:'', style:'border-bottom:#ccc 2px solid;padding:0 4px 0 0;margin:0 0 10px 0;'},
                        {tag:'span',name:'im', label:'', style:'font-style:italic;font-weight:bold'},
                        {tag:'span',name:'hi', label:'', style:'font-style:italic;font-weight:bold;color:rgb(51, 153, 204)'}
                    ]
                },
                imageUrl:''
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        computed:{
            // getProgress: function () {
            //     let that = this
            //     return this.progress = async function (p) {
            //         let e = {}
            //         e.percent = Math.floor(p * 100)
            //         that.$nextTick(() => {
            //             that.percentage = e.percent
            //             // console.log(that.percentage)
            //         })
            //     }
            // },
          editorThis(){
              return this.$refs.vueUEditor.editor
          }
        },
        methods: {
            ready (editorInstance) {
                console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
            },
            appendCoverImg(url){
                console.log(url)
                this.editorThis.execCommand('insertitml', `<img src="`+ 'http://localhost:3000/public/img/1.png' + `" />`)
            },
            addCustomButtom (editorId) {
                let that = this
                window.UE.registerUI('upload-img', function (editor, uiName) {
                    // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
                    editor.registerCommand(uiName, {
                        execCommand: function () {

                        }
                    })

                    // 创建一个 button
                    var btn = new window.UE.ui.Button({
                        // 按钮的名字
                        name: uiName,
                        // 提示
                        title: '鼠标悬停时的提示文字',
                        // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
                        cssRules: "background-position: -380px 0px;",
                        // 点击时执行的命令
                        onclick: function () {
                            // 这里可以不用执行命令，做你自己的操作也可
                          that.uploadImageHandler()
                        }
                    })

                    // 当点到编辑内容上时，按钮要做的状态反射
                    editor.addListener('selectionchange', function () {
                        var state = editor.queryCommandState(uiName)
                        if (state === -1) {
                            btn.setDisabled(true)
                            btn.setChecked(false)
                        } else {
                            btn.setDisabled(false)
                            btn.setChecked(state)
                        }
                    })

                    // 因为你是添加 button，所以需要返回这个 button
                    return btn
                } ,54/* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
                window.UE.registerUI('upload-video', function (editor, uiName) {
                    // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作

                    editor.registerCommand(uiName, {
                        execCommand: function () {
                            // editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`)
                        }
                    })

                    // 创建一个 button
                    var btn = new window.UE.ui.Button({
                        // 按钮的名字
                        name: uiName,
                        // 提示
                        title: '鼠标悬停时的提示文字',
                        // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
                        cssRules: "background-position: -320px -20px;",
                        // 点击时执行的命令
                        onclick: function () {
                            // 这里可以不用执行命令，做你自己的操作也可
                            // editor.execCommand(uiName)
                            that.uploadVideoHandler()
                        }
                    })

                    // 当点到编辑内容上时，按钮要做的状态反射
                    editor.addListener('selectionchange', function () {
                        var state = editor.queryCommandState(uiName)
                        if (state === -1) {
                            btn.setDisabled(true)
                            btn.setChecked(false)
                        } else {
                            btn.setDisabled(false)
                            btn.setChecked(state)
                        }
                    })

                    // 因为你是添加 button，所以需要返回这个 button
                    return btn
                } ,55/* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
                window.UE.registerUI('upload-files', function (editor, uiName) {
                    // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作

                    editor.registerCommand(uiName, {
                        execCommand: function () {
                            // editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`)
                        }
                    })

                    // 创建一个 button
                    var btn = new window.UE.ui.Button({
                        // 按钮的名字
                        name: uiName,
                        // 提示
                        title: '鼠标悬停时的提示文字',
                        // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
                        cssRules: "background-position: -620px -40px;",
                        // 点击时执行的命令
                        onclick: function () {
                            // 这里可以不用执行命令，做你自己的操作也可
                            // editor.execCommand(uiName)
                            that.uploadFileHandler()
                        }
                    })

                    // 当点到编辑内容上时，按钮要做的状态反射
                    editor.addListener('selectionchange', function () {
                        var state = editor.queryCommandState(uiName)
                        if (state === -1) {
                            btn.setDisabled(true)
                            btn.setChecked(false)
                        } else {
                            btn.setDisabled(false)
                            btn.setChecked(state)
                        }
                    })

                    // 因为你是添加 button，所以需要返回这个 button
                    return btn
                } ,56/* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
            },
            uploadImageHandler() {
                const input = document.querySelector('#uploadImg')
                input.value = ''
                input.click()
            },
            uploadVideoHandler() {
                const input = document.querySelector('#uploadVideo')
                input.value = ''
                input.click()
            },
            uploadFileHandler() {
                const input = document.querySelector('#uploadFile')
                input.value = ''
                input.click()
            },
          uploadImage(event) {
              console.log(event)
              let file = event.target.files[0]
            getBase64(file, imageUrl => {
                this.imageUrl = imageUrl
              })

                // oss.ossUploadFile(file, 'editpic', this.getProgress).then(res => {
                //     let url = this.$store.state.commonSetting.OSSHTTP + res.fileUrl
                //     this.editorThis.execCommand('inserthtml', `<img src="`+ url +`" />`)
                //     setTimeout(() => {
                //         this.$Message.success('上传成功')
                //         this.percentage = 0
                //     }, 1000);
                // }).catch(err => {
                //     this.$Message.error('上传失败，请重新尝试！')
                // })
            },
            async uploadVideo(event) {
              console.log(event)
                // let file = event.target.files[0]
                // oss.ossUploadFile(file, 'editvideo', this.getProgress).then(res => {
                //     let url = this.$store.state.commonSetting.OSSHTTP + res.fileUrl
                //     this.editorThis.execCommand('inserthtml', `<video src=' `+ url +`' controls='controls' width='100%' height='100%' webkit-playsinline='true' playsinline='true' x5-playsinline='true'></video>`)
                //
                //     setTimeout(() => {
                //         this.$Message.success('上传成功')
                //         this.percentage = 0
                //     }, 1000);
                // }).catch(err => {
                //     this.$Message.error('上传失败，请重新尝试！')
                // })
            },
            async uploadFile(event) {
              console.log(event)
                // let file = event.target.files[0]
                // oss.ossUploadFile(file, 'editFile', this.getProgress).then(res => {
                //     let url = this.$store.state.commonSetting.OSSHTTP + res.fileUrl
                //     let name = res.fileName
                //     this.editorThis.execCommand('inserthtml', `<a href='`+ url +`' target='_blank'>`+name+`</a>`)
                //     setTimeout(() => {
                //         this.$Message.success('上传成功')
                //         this.percentage = 0
                //     }, 1000);
                // }).catch(err => {
                //     this.$Message.error('上传失败，请重新尝试！')
                // })
            },
        },
        created(){

            this.htmlContent = this.value
        },
        mounted(){

        },
        watch: {
            // Watch content change
            value(newVal) {
                if (newVal && newVal !== this.preContent) {
                    this.preContent = newVal
                    this.htmlContent = newVal
                  console.log('222',newVal)
                } else if (!newVal) {
                    this.htmlContent = ''
                }
            },
            htmlContent(newVal) {
                this.$emit('inputE', newVal)
              console.log('333',newVal)
            },
          imageUrl(newVal){
            this.appendCoverImg(newVal)
          }
        }
    }
</script>

<style lang="scss">
    #edui_fixedlayer{
        z-index:99999!important;
    }
</style>