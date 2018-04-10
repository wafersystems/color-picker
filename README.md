# color-picker
 This project is a demo for smart lighting.<br>
 can support edit area and channels for running on browsers of window.
 
## examples
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
  
  http://localhost:8000/brightness/{area}?b={b}
    
  * area: lighting area id, required
  * b: b is brightness channel, no required, default: 1
  
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
  
  http://localhost:8000/brightness.html?area={area}?b={b}
  
  * area: lighting area id, required
  * b: b is brightness channel, no required, default: 1

  
## Debugger
  在query中添加debugger=true参数实现debugger，可以查看相应的值，以及转化后的值。
  eg: http://localhost:8000/color.html?debugger=true
  
## using on windows

   Temperature： 
  
     http://localhost:8000/temperature.html
     or
     http://localhost:8000/temperature
   
   Color：
   
     http://localhost:8000/color.html
     or
     http://localhost:8000/color
   
   Brightness：
   
    http://localhost:8000/brightness.html
    or
    http://localhost:8000/brightness
   
   if view the value, entry `?debugger=true` to url
     
## Scene control for config

    http://localhost:8000/scene.html
    or
    http://localhost:8000/scene 
    
  #### config.json
    
   Direction: /data/config.json
   
   All data of this json are required.
  
  * area: lighting area id.
  * bChannel: brightness channel id.
  * tChannel: temperature cool channel id.
  * wChannel: temperature warn channel id.
  * scene: a array for all scene. every scene is a object, key is display name, value is scene value that is only.
 
     
 > Notes:
 > All of the above URL can use `.html` or do not use `.html`
