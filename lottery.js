;(function(root) {
  var lottery = {}
  let trophys = [
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
      name: '格力冰箱',
    },
    {
      name: '电风扇',
    },
    {
      name: '小度音响',
    },
  ], getTrophys = ''
  

  let findDom = function(domList, i) {
    let dom
    for (let j = 0; j < domList.length; j++) {
      let item = domList[j]
      if(item.className.match(/lottery-index-([0-9])/)[1] == i){
        dom = item
        break
      }
    }
    return dom
  }

  lottery.init = function (data, trophy) {
    let trophyList = data || trophys
    if(trophyList.length!=8){
      alert('请传入正确的数据')
      return
    }
    let verifyMsg = this.verify(trophyList)

    if(verifyMsg){
      alert(verifyMsg)
    } else {
      this.formatting(trophyList) //格式化数据
      this.painting(trophyList) //绘制页面
      let setTimeOutlist = this.animationList(trophyList, trophy)  //设置动画

      //开始按钮点击绑定事件
      document.querySelector('#lottery-start').addEventListener('click', ()=>{
        let domList = document.querySelectorAll('.lottery-div-item')

        findDom(domList, (setTimeOutlist.length - 1) % 8).classList.remove('active')

        let setTimeFunc = function(index,time) {
          let i = index % 8

          if(i != 0) {
            findDom(domList, i - 1).classList.remove('active')
          } else {
            findDom(domList, 7).classList.remove('active')
          }

          findDom(domList, i).classList.add('active')
          
          setTimeout(()=>{
            index++
            if(index <= setTimeOutlist.length - 1){
              setTimeFunc(index, setTimeOutlist[index])
            } else {
              alert(`您中的奖品是 ${getTrophys}`)
            }
          }, time * 1000)
        }
        
        setTimeFunc(0, setTimeOutlist[0])
      })
    }
  }

  lottery.animationList = function(trophys, trophy) {
    let trophyIndex = -1, animationList = [], list = []
    if(trophy){
      trophyIndex = trophys.findIndex((item)=>{
        return item.name == trophy
      })
      if(trophyIndex==-1) alert('请传入正确的数据')
    } else {
      let random = Math.random()
      let rate = 0
      for (let index = 0; index < trophys.length; index++) {
        const element = trophys[index];
        rate += element.rate
        if(rate >= random){
          trophyIndex = index
          break
        }
      }
    }

    list = [...trophys, ...trophys, ...trophys, ...trophys.slice(0, trophyIndex+1)]
    getTrophys = list[list.length-1].name
    console.log(list)
    
    animationList = [0.7, 0.5, 0.3, 0.2, 0.1, 0.05]

    return list.map((i,index)=>{
      if(index < 6){
        return animationList[index]
      } else if(index > list.length - 6){
        return animationList[animationList.length - (index + 6 - (list.length - 1))]
      } else {
        return animationList[animationList.length - 1]
      }
    })
  }

  lottery.painting = function(list) {
    let dom = document.querySelector('.lottery-div')
    let html = ''
    let map = {
      4: 3,
      7: 4,
      3: 7,
      6: 5,
      5: 6
    }
    
    list.forEach((item, index)=>{
      if(index==4){
        html += `<div class="lottery-div-block" id='lottery-start'>开始</div>`
      }
      html += `<div class="lottery-div-block lottery-div-item lottery-index-${map[index] || index}">${list[map[index] || index].name}</div>`
    })

    dom.innerHTML = html
  }


  lottery.verify = function (list) {
    let rateAll = 0

    list.forEach(element => {
      if(element.rate) rateAll += element.rate
    })

    if(rateAll>1){
      return '请传入正确的数据'
    } else {
      return null
    }
  }

  lottery.formatting = function (trophyList) {
    let trophysNum = trophyList.length, rateAll = 0, otherRate = 0

    trophyList.forEach(element => {
      if(element.rate){
        rateAll += element.rate
        trophysNum--
      }
    })

    otherRate = (1 - rateAll) / trophysNum

    trophyList.forEach(element => {
      if(!element.rate){
        element.rate = otherRate
      }
    })
  }

  root.lottery = lottery
})(this)