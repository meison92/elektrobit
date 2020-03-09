*****************************************************

  “Elktrobit” 微信小程序 REST API 开发使用文档
  版本：V1.0
  作者：Dan Hu
  更新日期：2019-03-19

*****************************************************


---------------------

  一、概述
  
---------------------

该系列接口采用REST接口规范编写，通过HTTPS协议调用，请求和响应均采用JSON格式。
接口域名：mp.elektrobit.cn
接口协议：HTTPS



---------------------

  二、活动接口
  
---------------------

    1. 当前活动
    
       接口名称：当前活动
       功能描述：返回当前正在举办或即将举办的活动信息列表，作为活动列表页面用以显示的数据来源。每页最多显示10条记录。
    
       URI：/json/events
       请求方式：GET
       参数：
         page: 以0开始的页码，0代表第一页，以此类推。默认值：0
         sort_by: 排序依据，可选值为“field_date_value”或“title”，分别以活动日期和标题排序。默认值：field_date_value
         sort_order: 顺序，可选值为“ASC”或“DESC”，分别表示升序和降序。默认值：DESC
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/events?page=0&sort_by=field_date_value&sort_order=ASC
    
         返回结果：略
    
    2. 活动详情
    
       接口名称：活动详情
       功能描述：返回指定活动的详细信息，作为活动详情页面用以显示的数据来源。活动由URI上的<event id>指定。
    
       URI：/json/event/<event id>
       请求方式：GET
       参数：
         无
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/event/1
    
         返回结果：略
     
     3. 推荐活动
     
        接口名称：推荐活动
        功能描述：返回推荐活动的背景图用作轮播。最多显示5条记录。
     
        URI：/json/featured-events
        请求方式：GET
        参数：
          无
     
        举例：
        
          请求：https://mp.elektrobit.cn/json/featured-events
     
          返回结果：略
          
     4. 活动报名
     
        接口名称：活动报名
        功能描述：向指定的活动提交报名信息。活动由URI上的<event id>指定。
        
        URI：/json/event/<event id>/register
        请求方式：POST
        Content-Type: application/json
        验证方式：无
        请求数据：JSON格式的活动报名数据
        
        举例：
          请求：https://mp.elektrobit.cn/json/event/1/register
          数据：
          
          {
            "openid": "",
            "name": "张三",
            "company": "上海恋趣信息科技有限公司",
            "title": "总经理",
            "phone": "13800000000",
            "email": "zhang.san@dminorstudio.com"
          }
          
          返回：
          
          {
            "message": "Success!"
          }
        
          

---------------------

  三、技术接口

---------------------

    1. Webinar
    
       接口名称：Webinar
       功能描述：返回Webnar列表，作为Webinar列表页面用以显示的数据来源。每页最多显示10条记录。
    
       URI：/json/webinar
       请求方式：GET
       参数：
         page: 以0开始的页码，0代表第一页，以此类推。默认值：0
         sort_by: 排序依据，可选值为“created”或“title”，分别以发布日期和标题排序。默认值：created
         sort_order: 顺序，可选值为“ASC”或“DESC”，分别表示升序和降序。默认值：DESC
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/webinar?page=0&sort_by=created&sort_order=ASC
    
         返回结果：略
    
    2. 技术文档
    
       接口名称：技术文档
       功能描述：返回技术文档列表，作为技术文档列表页面用以显示的数据来源。每页最多显示10条记录。
    
       URI：/json/documents
       请求方式：GET
       参数：
         page: 以0开始的页码，0代表第一页，以此类推。默认值：0
         sort_by: 排序依据，可选值为“created”或“title”，分别以发布日期和标题排序。默认值：created
         sort_order: 顺序，可选值为“ASC”或“DESC”，分别表示升序和降序。默认值：DESC
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/documents?page=0&sort_by=created&sort_order=ASC
    
         返回结果：略
    
    
    3. 白皮书
    
       接口名称：白皮书
       功能描述：返回白皮书列表，作为白皮书列表页面用以显示的数据来源。每页最多显示10条记录。
    
       URI：/json/white-paper
       请求方式：GET
       参数：
         page: 以0开始的页码，0代表第一页，以此类推。默认值：0
         sort_by: 排序依据，可选值为“created”或“title”，分别以发布日期和标题排序。默认值：created
         sort_order: 顺序，可选值为“ASC”或“DESC”，分别表示升序和降序。默认值：DESC
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/white-paper?page=1&sort_by=created&sort_order=ASC
    
         返回结果：略
    
    4. 技术详情
    
       接口名称：技术详情
       功能描述：返回指定技术的详细信息，作为技术详情页面用以显示的数据来源。活动由URI上的<technology id>指定。
    
       URI：/json/technology/<technology id>
       请求方式：GET
       参数：
         无
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/technology/1
    
         返回结果：略
        
     5. 技术评论
     
        接口名称：技术评论
        功能描述：向指定的技术发起评论。技术页面由URI上的<technology id>指定。
        
        URI：/json/technology/<technology id>/comment
        请求方式：POST
        Content-Type: application/json
        验证方式：无
        请求数据：JSON格式的评论数据
        
        举例：
          请求：https://mp.elektrobit.cn/json/technology/1/comment
          数据：
          
          {
            "openid": "",
            "name": "张三",
            "comment": "评论内容"
          }
          
          返回：
          
          {
            "message": "Success!"
          }
          


---------------------

  四、产品接口

---------------------

    1. 产品列表
    
       接口名称：产品列表
       功能描述：返回产品信息列表，作为产品列表页面用以显示的数据来源。每页最多显示10条记录。
    
       URI：/json/products
       请求方式：GET
       参数：
         page: 以0开始的页码，0代表第一页，以此类推。默认值：0
         sort_by: 排序依据，可选值为“created”或“title”，分别以发布日期和标题排序。默认值：created
         sort_order: 顺序，可选值为“ASC”或“DESC”，分别表示升序和降序。默认值：DESC
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/products?page=0&sort_by=created&sort_order=ASC
    
         返回结果：略
    
    2. 产品详情
    
       接口名称：产品详情
       功能描述：返回指定产品的详细信息，作为产品详情页面用以显示的数据来源。活动由URI上的<product id>指定。
    
       URI：/json/product/<product id>
       请求方式：GET
       参数：
         无
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/product/1
    
         返回结果：略
    


---------------------

  五、用户接口

---------------------

    1. 用户资料读取
    
       接口名称：用户资料读取
       功能描述：返回指定用户的详细资料。
    
       URI：/json/user
       请求方式：POST
       Content-Type: application/json
       验证方式：无
       请求数据：JSON格式的用户openid信息
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/user
         数据：
         
         {
           "openid": ""
         }
    
         返回结果：
         {
           "openid": "",
           "name": "张三",
           "company": "上海恋趣信息科技有限公司",
           "title": "总经理",
           "phone": "13800000000",
           "email": "zhang.san@dminorstudio.com"
         }


    2. 用户资料更新
    
       接口名称：用户资料更新
       功能描述：更新指定用户的详细资料。
       
       URI：/json/user
       请求方式：POST
       Content-Type: application/json
       验证方式：无
       请求数据：JSON格式的用户资料数据
       
       举例：
         请求：https://mp.elektrobit.cn/json/user
         数据：
         
         {
           "openid": "",
           "name": "张三",
           "company": "上海恋趣信息科技有限公司",
           "title": "总经理",
           "phone": "13800000000",
           "email": "zhang.san@dminorstudio.com"
         }
         
         返回：
         
         {
           "message": "Success!"
         }
    



---------------------

  五、其他接口

---------------------

    1. 首页背景图
    
       接口名称：首页背景图
       功能描述：返回用于显示在首页上的轮播背景图。最多显示5条记录。
    
       URI：/json/backgrounds
       请求方式：GET
       参数：
         无
    
       举例：
       
         请求：https://mp.elektrobit.cn/json/backgrounds
    
         返回结果：略

