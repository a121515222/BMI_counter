//DOM
const inputweight = document.querySelector('.weight')
const inputtall = document.querySelector('.tall')
const resultcircle = document.querySelector('.displatResult');
const resultText = document.querySelector('.resultText')
const listcontent = document.querySelector('.displayList');
const loopimg = document.querySelector('.loop');
//變數
let readData =JSON.parse(localStorage.getItem('list'))||[]
let bmiresult = 0;
let bmiweight = 0 ;
let bmitall = 0;
let condiction ='';
let classli='';
//取得日期
let today = new Date();
//getFullyear, getMonth, getDate後面要加()不然會無法顯示日期
let todayY = today.getFullYear();
let todayM =today.getMonth()+1;
let todayD = today.getDate();

//判斷體重
function weight(){
  const checkNum = /\D/;
  if(inputweight.value===''){
    alert('沒有輸入體重喔')
  }
  else if(checkNum.test(inputweight.value)===false){
    bmiweight = inputweight.value
    }
  else{
    alert('請輸入體重數字，不能有空白。')
    }
  bmicounter(bmiweight,bmitall)
  storageData()
}
//判斷身高
function tall(){
    const checkNum = /\D/;
  if(inputtall.value===''){
    alert('沒有輸入身高喔')
  } 
  else if(checkNum.test(inputtall.value)===false){ 
    bmitall = (inputtall.value)/100
    }
  else{
    alert('請輸入身高數字，不能有空白。')
    }
  bmicounter(bmiweight,bmitall)
}
//計算bmi與顯示bmi數字
function bmicounter(weight,tall){
    bmiresult=(weight/(tall*tall)).toFixed(2)
    //四捨五入制小數點第二位
    bmiresult

    resultText.innerHTML= `<h2>BMI:${bmiresult}</h2>`
    console.log('你的bmi是'+bmiresult)
    
    resultdisplay(bmiresult)   
}
//判斷顯示結果顏色
function resultdisplay(bmi){
  
  const discriptResultText = document.querySelector('.discriptResultText');
    if(bmiweight===0||bmitall===0){
    resultText.innerHTML= `<h2>計算中</h2>`
    resultcircle.className = 'border_color_calculate'
    }
    else if(0<bmi && bmi<15){
      classli = 'overLight'
      condiction = '嚴重過輕'
      resultcircle.setAttribute('class','border_color_overlight')
      resultText.setAttribute('class','text_color_overlight')
      discriptResultText.innerHTML='<h2 class="advice">體重嚴重過輕，要多吃一點。</h2>'
      const adviceContent = document.querySelector('.advice');
      adviceContent.setAttribute('class','text_color_overlight')
      loopimg.setAttribute('class','loop_overlight') 
      
    }
    else if(bmi<18.5 && bmi>=15){
      classli = 'light'
      condiction = '過輕'
      resultcircle.setAttribute('class','border_color_light')
      resultText.setAttribute('class','text_color_light')
      discriptResultText.innerHTML='<h2 class="advice">體重過輕，要多吃一些。</h2>'
      const adviceContent = document.querySelector('.advice');
      adviceContent.setAttribute('class','text_color_light') 
      loopimg.setAttribute('class','loop_light')
      
    }
    else if(bmi<25 && bmi>=18.5){
      classli = 'normal'
      condiction = '正常'
      resultcircle.setAttribute('class','border_color_normal')
      resultText.setAttribute('class','text_color_normal')
      discriptResultText.innerHTML='<h2 class="advice">體重正常，繼續保持!!</h2>'
      const adviceContent = document.querySelector('.advice');
      adviceContent.setAttribute('class','text_color_normal')
      loopimg.setAttribute('class','loop_normal')

    }
    else if(bmi<30 && bmi>=25){
      classli = 'weight'
      condiction = '有點過重'
      resultcircle.setAttribute('class','border_color_weight')
      resultText.setAttribute('class','text_color_weight')
      discriptResultText.innerHTML='<h2 class="advice">體重過重，要注意了!!</h2>'
      const adviceContent = document.querySelector('.discriptResultText h2');
      adviceContent.setAttribute('class','text_color_weight') 
      loopimg.setAttribute('class','loop_weight')
      
    }
    else if(bmi>=30){
      classli = 'overWeight'
      condiction = '體重過重'
      resultcircle.className = 'border_color_over_weight'
      resultText.className ='text_color_over_weight'
      discriptResultText.innerHTML='<h2 class="advice">體重嚴重過重，要減肥啦!!</h2>'
      const adviceContent = document.querySelector('.advice');
      adviceContent.setAttribute('class','text_color_over_weight')
      loopimg.setAttribute('class','loop_over_weight')

    }
}
//讀取資料
function upDate(){
  const datalen = readData.length;
  const bmilist =document.querySelector('.displayList ul');
  let content =''
  if(datalen===0){
    content="<li class='nodata'><h2>目前沒有資料</h2></li>"
  }
  for(let i =0;i<datalen;i++){
    content+=`<li class="${readData[i].class}"><h3>${readData[i].condiction}</h3><span>BMI</span><h3>
    ${readData[i].bmi}</h3><span>身高</span><h3>${readData[i].tall}cm</h3>
    <span>體重</span><h3>${readData[i].weight}kg</h3><h4>${readData[i].recordTime}</h4><a href="#" data-index="[${i}]">刪除</a></li>`
  }
  bmilist.innerHTML=content
}
//儲存資料
function storageData(){
  let tall = bmitall*100
  let listdata={
    "class":classli,
    "condiction":condiction,
    "bmi":bmiresult,
    "tall":tall,
    "weight":bmiweight,
    "recordTime":`${todayY}-${todayM}-${todayD}`,
  }
  if(bmiweight!==0 && bmitall!==0){
  readData.unshift(listdata)
  localStorage.setItem('list',JSON.stringify(readData))
  upDate()
 }
}
//刪除功能
function deletelist(e){
  const listnodeName = e.target.nodeName;
  e.preventDefault()
  if(listnodeName!=="A"){return}
  else{
  const listindex = e.target.dataset.index;
  readData.splice(listindex,1)
  localStorage.setItem('list',JSON.stringify(readData))
  }
upDate()
}
//清除input文字
function cleaninput(e){
  if(bmiweight!==''&& bmitall!=='' &&bmiresult>0){
    e.stopPropagation()
    inputweight.value=""
    inputtall.value=""
  }
}

//一開始顯先讀data
upDate()
//監聽
inputweight.addEventListener('blur',weight,false)
inputtall.addEventListener('blur',tall,false)
listcontent.addEventListener('click',deletelist,false)