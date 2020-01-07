# -demo
转盘抽奖
//引入lottery.js
 
//初始化数据，name奖品名称，rate为该项奖品中奖概率，概率0-1，如果设置了rate，所有奖品rate加起来不能大于1
 
//8个奖品随机选中，几率相同，则不需要设置单个rate
 
let data = [
    {
      name: '华为',
      rate: 0.5,
    },
    {
      name: 'iPhone X',
    },
    {
      name: '谢谢惠顾',
    },
    {
      name: '手环',
    },
    {
      name: '小熊抱枕',
    },
    {
      name: '电风扇',
    },
    {
      name: '小度音响',
    },
    {
      name: '格力冰箱',
    },
  ]
 
//第一个参数传入奖品数组
lottery.init(data)
 
//第二个参数传入必中奖品名称，奖品名称必须在传入的奖品数组中
lottery.init(data, '电风扇')
