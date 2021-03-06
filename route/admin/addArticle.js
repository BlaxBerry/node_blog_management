// formidable
const formidable = require('formidable')
const path = require('path')
// 文章规则
const { Article } = require('../../model/article')


// add article   /admin/add/article
module.exports = (req, res) => {
    // 通过formidable解析表单数据（因为包含有上传文件的二进制数据，bodyparser解析不了）

    // 1. 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2. 设置上传文件在服务器中存储位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3. 保留上传文件的后缀
    form.keepExtensions = true;
    // 4. 解析表单
    form.parse(req, (err, fields, files) => {
        /*
        err: 解析出错-》错误对象；解析成功-》null
        fileds: 保存普通表单数据的对象
        files: 保存上传文件数据的对象
         */
        // res.send(fields)

        // 截取上传文件的地址（必须截取为public目录，不然客户端无法访问服务器电脑上的路径）
        // console.log(files.cover.path.split('public')[1]);

        // 存入MongoDB
        Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content.toString()
        })
        // // redirect
        res.redirect('/admin/articles')


    })

}