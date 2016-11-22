var qiniu = require("qiniu");
var fs = require('fs');
var path = require('path');

var dest = path.resolve(__dirname, 'build');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'uJdbhGnfzZeCmW15JLSnVyqbVYKqvtDk2jLs2mc0';
qiniu.conf.SECRET_KEY = 'C8-gNPipd4nsoYwy49QgjFlwRiJDioDW0oX-o_s-';

//要上传的空间
bucket = 'btcus';

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  //putPolicy.callbackUrl = 'http://your.domain.com/callback';
  //putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
  return putPolicy.token();
}

//生成上传 Token
//token = uptoken(bucket, key);

//要上传文件的本地路径
//filePath = './build/index.html';

//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);       
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}

//调用uploadFile上传
//uploadFile(token, key, filePath);
fs.readdir(dest, function(err, files) {
  files.forEach(function(file, index) {
    var fileWithPath = path.join(dest, file);
    var token = uptoken(bucket, file);
    uploadFile(token, file, fileWithPath);
  });
});
