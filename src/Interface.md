# 已有的接口

接口1：
url：www.vision123.site / audio / list / { type } / { page }
参数：
$1: 频道编码，如7
$2: 页码，如2
返回值json，如
[{ "name": xxx, "id": 0001, "img_url": xxxxxx, "play_num": 555, "author": xxx }]

接口2：
url: www.vision123.site / audio / source / { id } / { page }
参数：
$1：节目id，上个接口返回的id
$2: 页码，如2
返回为音频详细信息列表，自己下载

接口3：
url: www.vision123.site / audio / all
返回为全部频道列表

接口4:
url：www.vision123.site / audio / search / { kw } / { page }
参数：
$1: 关键字，如cnm
$2: 页码，如2
返回值json