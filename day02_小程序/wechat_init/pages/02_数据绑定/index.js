Page({
  data:{
    msg:'初始化测试数据',
    msg2:'双向数据绑定'
  },
  onLoad(){
    console.log('onLoad()');
    console.log(this);// 当前页面的实例
    this.setData({//用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）
      msg:'我是修改后的数据',
      test:'test数据'
    })
  },
  inputHandler(){}//解决报错问题
})