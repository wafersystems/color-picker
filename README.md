# color-picker
 This project is a demo for smart lighting.<br>
 Run only on browsers of mobile devices (mobile phones).
 
## examples
![](https://static.oschina.net/uploads/img/201801/25095806_nIlr.png)
![](https://static.oschina.net/uploads/img/201801/25095757_duwM.png)
![](https://static.oschina.net/uploads/img/201801/25095751_Zayy.png)
 
## Dev
 http://localhost:8000/color/{area}?r={r}&g={g}&b={b}

  * area: lighting area id, required
  * r: r channel of rgb, no required, default: 1
  * g: g channel of rgb, no required, default: 2
  * b: b channel of rgb, no required, default: 3
  
  http://localhost:8000/temperature/{area}?w={w}&c={c}
  
  * area: lighting area id, required
  * w: w is warn color channel of temperature, no required, default: 1
  * c: c is cool color channel of temperature, no required, default: 2
  
## Product
 http://localhost:8000/color.html?area={area}?r={r}&g={g}&b={b}

  * area: lighting area id, required
  * r: r channel of rgb, no required, default: 1
  * g: g channel of rgb, no required, default: 2
  * b: b channel of rgb, no required, default: 3
  
  http://localhost:8000/temperature.html?area={area}?w={w}&c={c}
  
  * area: lighting area id, required
  * w: w is warn color channel of temperature, no required, default: 1
  * c: c is cool color channel of temperature, no required, default: 2
  
## Debugger
  在query中添加debugger=true参数实现debugger，可以查看相应的值，以及转化后的值。
  eg: http://localhost:8000/color.html?debugger=true
  
  
