/*
 Navicat Premium Data Transfer

 Source Server         : admin
 Source Server Type    : MySQL
 Source Server Version : 100119
 Source Host           : localhost:3306
 Source Schema         : youth_hosted

 Target Server Type    : MySQL
 Target Server Version : 100119
 File Encoding         : 65001

 Date: 28/11/2022 10:47:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 丢弃数据库，如果存在
drop database if exists youth_hosted;

-- 创建新的数据库
-- 设置服务器端创建数据库存储字符的编码utf8
create database youth_hosted charset=utf8;

-- 进入创建的数据库
use youth_hosted;

-- ----------------------------
-- Table structure for abouts
-- ----------------------------
DROP TABLE IF EXISTS `abouts`;
CREATE TABLE `abouts`  (
  `about_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '关于我们ID',
  `about_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '关于我们标题',
  `about_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '关于我们内容',
  `about_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '关于我们图片',
  PRIMARY KEY (`about_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of abouts
-- ----------------------------
INSERT INTO `abouts` VALUES (1, '九驻青年旅社简介11', '九驻青年旅舍，不仅汇集了全国各地的品质青旅供您挑选，更具有人文关怀，邀您在旅途中找到归属感。111', '/imgs/about/aid-01.jpg');
INSERT INTO `abouts` VALUES (2, '选择九驻的理由', '我们精益求精，披星戴月，传承服务精神，用敬业的态度对待每一个客户；我们专注品质，10年青旅经验，3000+成功案例，10万+客户积累；我们用心服务，专业的商务服务团队，提供更全面，更强大的实时服务支持', '/imgs/about/aid-02.jpg');
INSERT INTO `abouts` VALUES (3, '九驻的使命11', '我们的使命是：五星服务，探索世界，我们在你身边。11', '/imgs/about/aid-03.jpg');

-- ----------------------------
-- Table structure for activities
-- ----------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities`  (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动ID',
  `activity_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动主题',
  `activity_cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动封面',
  `activity_start_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动开始时间, 时间戳形式, 单位s',
  `activity_end_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动结束时间, 时间戳形式, 单位s',
  `activity_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动内容',
  `activity_discount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动折扣',
  `activity_face_to` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动面向对象, 0所有用户, 1会员用户',
  PRIMARY KEY (`activity_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of activities
-- ----------------------------
INSERT INTO `activities` VALUES (2, '年味福气，时尚悠闲', '/imgs/activity/8c56dd9f-adf5-4b09-ad63-152f5012b4aa.jpg', '1669824000', '1672416000', '<p>虎年春节，火爆的崇明民宿</p><p><img src=\"http://127.0.0.1:3000/imgs/activity/f9886fff-a1a0-4b82-b981-4a91e91fe0ac.jpg\" alt=\"\" data-href=\"\" style=\"\"/></p><p>赢得了好评无数</p><p>这不仅是因为民宿的住宿环境好</p><p>更是因为入住在崇明民宿里</p><p>感受到了满满的幸福感</p><p>春节期间，民宿主们花心思，备材料</p><p>给前来入住的市民游客</p>', '0.85', '1');
INSERT INTO `activities` VALUES (3, '“常山漫居”民宿品牌主题活动', '/imgs/activity/ccc9e6a6-e2e9-47f7-a55e-6aae547655c6.jpg', '1667923200', '1670688000', '<p>9月15日，由衢州市常山县委、县政府主办，常山县文化和广电旅游体育局承办，常山县民宿行业协会协办的“常山漫居”民宿品牌主题宣传活动在常山举办。活动旨在进一步加大对常山民宿经营、宣传扶持力度，扩大常山民宿、“常山漫居”民宿品牌影响力，借助“微改造、精提升”行动，推动常山文化和旅游产业发展，促进乡村振兴与共富建设。</p><p><img src=\"http://127.0.0.1:3000/imgs/activity/38d7a540-cac6-4872-afc1-e53081307cb4.jpg\" alt=\"\" data-href=\"\" style=\"\"/></p>', '0.7', '0');
INSERT INTO `activities` VALUES (4, '进入暑期旅游旺季 三亚各大民宿推出促销活动', '/imgs/activity/259e1d94-99d2-4b35-88ff-4f5b7071d862.jpg', '1667750400', '1668441600', '<p>新海南客户端、南海网、南国都市报6月21日消息（记者 沙晓峰）白色的墙体、蓝色的门窗、一望无垠的大海……盛夏六月，正值暑期到来之际，三亚市天涯区马岭大社区迎来了一群新面孔，各地高考毕业生来到这里住民宿、吃海鲜、赏海景，开启别样的暑期之旅。</p><p>“近期有不少高考生通过社交媒体关注到我们家的民宿，入住率较疫情期间有所回升。”马岭大社区月光海豚的负责人陈博告诉记者，作为三亚新晋的网红打卡地，有“小圣托里尼”之称的马岭大社区已经成为游客来三亚必打卡的目的地之一。类似的情形在三亚市吉阳区博后村同时上演。</p><p><img src=\"http://127.0.0.1:3000/imgs/activity/5a9c8500-ee55-450c-a2fc-1efc2d9056be.jpg\" alt=\"\" data-href=\"\" style=\"\"/></p><p>有“小圣托里尼”之称的马岭大社区已经成为游客来三亚必打卡的目的地之一。记者沙晓峰摄</p><p>“当前正值夏日，游客出行将更偏向清凉避暑之旅，三亚作为海岛城市有望成为毕业生出游的热门选择。我们将瞄准暑期旅游市场，加大流量投放力度，推出优惠产品，争取入住率实现较大的回升，缓解经营压力。”博后村的一家民宿负责人说。</p><p><img src=\"http://127.0.0.1:3000/imgs/activity/a103c10a-b142-4cf0-8215-98d825046859.jpg\" alt=\"\" data-href=\"\" style=\"\"/></p><p>除了折扣优惠，各大民宿还推出了特定房型优惠套餐。如西岛漫时光海景民宿推出海景双/大床房498/间夜，赠一套双人海鲜套餐正餐。三亚海棠湾悦舍海景民宿推出高级大床房199元，赠送后海冲浪体验课+视频拍照，提升旅游消费吸引力，满足不同客群的需求。</p><p>据了解，近年来，三亚民宿市场发展迅猛，后海、马岭、博后、西岛渔村等民宿集群区域，凭借优质、特色的民宿产品和服务，吸引着不少游客前来打卡体验民宿。“在网上被视频‘种草’，特地前来体验，推开窗便是一望无垠的大海，感觉非常美妙，期待冬季再来打卡。”游客李女士说。</p><p>“值此暑期到来之际，联手民宿协会开展跨城市联动营销，旨在充分发挥民宿协会在资源整合、渠道搭建、营销推广等方面的优势，形成营销宣传合力，促进旅游消费增长，助力旅游市场全面复苏。”市旅文局相关负责人说。</p>', '0.7', '0');
INSERT INTO `activities` VALUES (5, '当民宿遇上非遗', '/imgs/activity/7b5a5d43-32e0-4023-95d3-73e060654eee.jpeg', '1667232000', '1672416000', '<p>用非遗之韵，点亮民宿之美。</p><p>金山区文化和旅游局，</p><p>在国庆期间推出</p><p>“非遗进民宿”活动，</p><p>为市民游客带来特色的非遗体验。</p><p>和家人朋友一起来体验</p><p>有温度，有故事，有文化的</p><p>民宿生活吧！</p><p><img src=\"http://127.0.0.1:3000/imgs/activity/e1032755-78b0-49d1-bb16-5f9c0afec89c.jpeg\" alt=\"\" data-href=\"\" style=\"\"/></p>', '0.9', '1');
INSERT INTO `activities` VALUES (6, '体验赏鹅卵石沙滩', '/imgs/activity/bcc78b81-86c4-42f1-a92d-360f83c418e6.jpg', '1668700800', '1670774400', '<p>很多人都想去一些有趣的地方，那里的景色非常吸引人，吸引了不少的游人。以辽宁省大连市棒棰岛为例，一看就很有趣。这里是大连市的东南方，大约五公里的地方</p><p>棒棰岛以山、岛、海、滩等景观为主要题材。从景区的角度来看，这里的地形可以用三座大山来形容，但是，由于地形的关系，这里靠近大海，所以，这里的北边，到处都是乱七八糟的石头和海滩。</p><p>据说，在离海边五百多公里的地方，有一片小小的岛屿，那岛屿十分的显眼，远远的看去，就像是一个女人在洗衣服一样，而棒棰岛，则是以这种方式命名的。</p><p>我们从附近的高地上俯瞰，可以看到非常漂亮的海滩。</p><p>在海岸边，我们看到的是一座座奇形怪状的房子，它们就像一朵朵盛开的花朵，杂乱无章地分布在地面上。这座棒棰岛全长四百一十米，宽一百二十多米，呈南北方向，在岛屿的正南方，还有一个自然形成的山洞。</p><p>总而言之，这里绝对是一个旅游胜地，是一个非常有吸引力的地方。空气清新，可以参与很多好玩的活动。住在城里的人，肯定会有更大的心理负担。所以，夏天到了这个地方，也是一种很好的记忆。</p>', '0.89', '1');
INSERT INTO `activities` VALUES (7, '俄罗斯风情街', '/imgs/activity/83726430-1ce3-4e39-af0f-dff32168cc50.jpg', '1667232000', '1672416000', '<p>俄罗斯风情街，地处繁华的胜利桥西北，又称为团结街，保留了3栋原远东白俄罗斯时的建筑，已有百年历史，是全国第一条具有俄罗斯十九、二十世纪风格的俄罗斯风情街。</p><p>建筑风格上，体现了俄罗斯风情，整条街布满了差参不齐的“尖式”、“塔式”阁独户。独特的建筑风格引来了大量游客专程观赏，是大连市集旅游、观光、购物、休闲餐饮、娱乐为一体的商业步行街。</p>', '0.9', '1');
INSERT INTO `activities` VALUES (8, '达人们提供了这7种新玩法', '/imgs/activity/3fbcdf47-4e23-49cd-947d-2c93cf020356.jpg', '1667232000', '1672416000', '<p><strong>01</strong></p><p><strong>“在民宿里野炊，这是年轻女孩们的热爱。”</strong></p><p>——隐居乡里营销经理 赖姗姗</p><p>把亲近大自然做到极致，成为时下年轻人的一大目标。露营风的兴起，带来了相关产品销量的增长，也带来了精致野炊的打卡。于是，在民宿里野炊，不睡床睡草地，成为了一个潮流。</p><p>在民宿里找一片绿地，铺上一张桌布，搭配着精致的下午茶和酒水、香薰蜡烛、抱枕和花，打造出一组无论怎么拍都格外美的野炊照，这是在北京房山青龙湖环绕的“左岸花园”里常发生的事情。午后的槐树枝叶将阳光筛得细碎，欧式花园便被打造成了充满文艺气息的野炊胜地。对爱拍照的年轻人来说，玻璃房里的床已经吸引不了她们了，睡在草地里更能出片。</p><p><strong>02</strong></p><p><strong>“牛羊和马兔，孩子们喜欢去的民宿原来叫做——动物园。”</strong></p><p>——途家民宿公关 李乐</p><p>对亲子家庭来说，孩子们玩得好，玩得有趣很重要。除了之前介绍的一些科普知识和动手实践的操作，一些只能在城市动物园里远观的动物们，如果能近距离接触也很有意义。</p><p>当一匹马就在民宿院子里时，你会做出什么反应？</p><p>位于北京延庆区的一家名为熙熙宪宪de乐园就是这样一家民宿。院子里有一匹白马，出门还有奶牛场和羊圈，孩子们既可以体验喂养牛羊的快乐，还可以动手挤奶，打包纯正奶皮鲜奶。除了与小动物们近距离接触，院子里还搭建了一个7.2米高的旋转滑梯、4.5米长的爬网、秋千沙坑等玩乐体验项目。此外，民宿周边也有石京龙滑雪场、龙庆峡度假区和玉渡山风景区，还能赏赏春景。</p>', '0.9', '0');
INSERT INTO `activities` VALUES (9, '认识民宿', '/imgs/activity/7f598e47-581f-47a9-a7c5-b27a7b4bb4d7.png', '1669824000', '1672416000', '<p>现代人们的旅游活动越来越重视旅游体验，为了迎合游客的需要，民宿经营者大都会为游客提供个性化体验，根据民宿的功能不同，民宿的类型也就不同。按功能及体验，民宿活动可分为以下几种类型。</p><p><strong>（一）农家体验民宿：农林牧渔体验活动</strong></p><p>乡村民俗结合农业有两层意义。一是民宿食材来自自家农村，让旅客在田场、菜园或牧场、养殖场，看到自己吃到的是无污染、安全的食材。二是农场提供农业体验活动，让旅客获得休闲，也获得农业操作的知识与技术，由此扩大民宿服务顾客的广度。</p><p>浙江省永嘉县的“温周一家人农家乐”位于楠溪江风景区，与太平岩景点隔江相望。游客有机会在民宿体验农耕，远离喧嚣，感受美丽自然风景。</p><p><strong>（二）工艺体验民宿：柳编、刺绣等</strong></p><p>民宿主人具备一些小技艺，如歌艺、舞艺、乐器技艺、棋艺、书法、绘画、雕刻、陶艺、球技、口技、魔术、杂耍等，可与游客互相交流与娱乐，强化游客的消费体验。</p><p>民宿的工艺体验主要有以下几种：</p><p>柳编。柳编是中国民间传统手工艺品之一，经过历代艺人的传承发展，凝聚了广大劳动人民的心血和汗水。作为一种民间艺术形式，其实用价值、审美价值和社会价值得到普遍认可。柳编的编织工艺大致分为平编、纹编、勒编、砌编、缠边五种。</p><p>蓑衣。许多人在孩提的时候，都曾见到过穿蓑衣、戴蓑笠的农夫在田间辛勤劳作的场景。随着时光的流转，如今，蓑衣人已逐渐模糊成了记忆。蓑衣制作分为挑料、绞棕绳、编织棕衣三步。</p><p>蓝染。蓝染是一种古老的印染工艺，制作一件蓝染，要花上至少20年的时间，才能出现特有的颜色。</p><p>刺绣。刺绣是中国民间传统手工艺之一，在中国至少有两三千年历史。中国刺绣主要有苏绣、湘绣、蜀绣和粤绣四大门类。</p><p>舂年糕。舂年糕有许多程序，碾米粉，拌和米，兑水，蒸糕，然后是打糕，和饼，盖印，晾干。</p><p>做陶器。陶器是指以黏土为胎，经过手捏、轮制、模塑等方法加工成型后，在800～1000℃高温下焙烧而成的器具，坯体不透明，有微孔，具有吸水性，叩之声音不清。</p><p><strong>（三）民俗体验民宿：祭祀祭典、民俗节日、民俗礼仪传说等</strong></p><p>乡愁是青山绿水，心有栖居。民俗文化的挖掘传承，让我们重温乡情乡音；民宿旅游的蓬勃兴起，让我们体验诗意栖居。近年来，杭州依托独特的自然风光、山水资源和文化底蕴，大力发展民宿经济。如今，民宿已成为杭州气质最丰富的表达，形成了四眼井、白乐桥、满觉陇、青芝坞、河坊街等精品民宿集群，以及桐庐、富阳、临安等特色民宿区块。据统计，目前杭州已有民宿床位5万多张，民宿农庄点300多个，对民宿装修改造等投入30多亿元。同时，杭州依托美丽乡村和农村文化礼堂建设，着力挖掘、保护、传承各地的民俗风情、人文景观、历史遗存以及特色文化，让民俗记忆的符号融入故乡新貌。民俗民宿，把自然生态和历史人文融合为一体，让杭州市民在城市化的进程中依然“看得见山、望得见水、留得住乡愁”。</p><p>有着800余年历史的新叶古村，至今仍完好地保存着16处古祠堂、古塔、古阁和200多幢古民居，被誉为“明清古建筑露天博物馆”“中国民居建筑大观园”。近年来，浙江省建德市全面启动“乡村记忆工程”，着力保护好村镇千百年来传承的自然景观、民风民俗等“乡愁”符号。新叶古村更是完美诠释了“水清流、绿掩映、房古朴、人安逸”的新乡村魅力，成为中国传统村落的保护典范。</p><p><strong>（四）自然体验民宿：采集制作标本、烧烤、草药采集等</strong></p><p>浙江省丽水市松阳县是我国有名的“油茶之乡”，早在几百年前，当地村民就经常榨好山茶油，挑着油担翻山越岭去外地换取其他物品，闻名的“油茶古道”就是最好的历史见证。随着科学技术的进步，借助于发达的物流网络，松阳的山茶油已经实现了产业化的发展。</p><p>不同于大木山周边的其他民宿，坐落于松阴溪旁的“中野·茶香轩榭”的诞生，源于山茶油产业与休闲旅游的结合。有了产业的依托，入住民宿的体验变得愈加丰富，原来传统的茶油产区，被改造成了多个不同主题和功能的区块，在装饰古朴的古法榨油展示馆，可见传统压榨工具的展出，游客可以在这里体验学习古法压榨工艺中的粉碎与压榨；在特色产品展示馆，展品已经不仅限于我们对于传统农产品的想象，适合女性的精油、香氛等深加工产品以及新开发的特制歇力茶、端午茶饮品都得到展示。</p><p><strong>（五）运动体验民宿：登山、涉水、滑雪、骑马等</strong></p><p>“月光岛”民宿位于国家级海洋特别保护区浙江省乐江市西门岛内，距离雁荡山主景区10公里，是一家以海鲜美食为主题的民宿。“月光岛”民宿充分利用西门岛优良的自然环境及优质的海产品资源，精心打造海岛美食主题民宿，极大地推动了雁荡山海上旅游的发展。接下来，雁荡镇党委政府还将继续加快对“海上旅游+体育、观光、体验”等新兴项目的打造，大力发展“海鲜养殖+体验”、“登山观光+摄影+写生”、环岛公路马拉松赛、自行车骑行等项目。</p><p>不同的体验可以满足游客不同的需求，让游客在真正放松的同时学习相关知识。在当前“传统文化热”的背景下，个性化的民宿尤其是工艺、民俗体验民宿得到众多游客的青睐，同时也可以加强对文化遗产的保护，有助于文化遗产的延续传承。</p>', '0.9', '1');
INSERT INTO `activities` VALUES (10, '\"五五购物节\",体验周来袭', '/imgs/activity/aid-01.jpg', '1667836800', '1668441600', '<p>对于很多市民朋友来说，民宿是体验慢生活的方式之一。为了响应“2022国际消费季”暨第三届上海“五五购物节”相关要求，奉贤区也即将开启“五五购物节民宿体验周”活动！活动期间，奉贤十一家民宿将在持续一周的时间里惊喜送不停，还不快赶紧冲！</p><p>想体验民宿生活</p><p>偷得浮生半日闲的小伙伴</p><p>这次可千万不要错过</p><p>本次活动内的十一家民宿</p><p>风格不同又各自美好</p><p>相比于传统的酒店</p><p>在假期住一住身边的民宿</p><p>才是人间最值得的打开方式', '0.9', '0');
INSERT INTO `activities` VALUES (11, '\"五五购物节\",体验周来袭', '/imgs/activity/aid-01.jpg', '1667836800', '1668441600', '<p>对于很多市民朋友来说，民宿是体验慢生活的方式之一。为了响应“2022国际消费季”暨第三届上海“五五购物节”相关要求，奉贤区也即将开启“五五购物节民宿体验周”活动！活动期间，奉贤十一家民宿将在持续一周的时间里惊喜送不停，还不快赶紧冲！</p><p>想体验民宿生活</p><p>偷得浮生半日闲的小伙伴</p><p>这次可千万不要错过</p><p>本次活动内的十一家民宿</p><p>风格不同又各自美好</p><p>相比于传统的酒店</p><p>在假期住一住身边的民宿</p><p>才是人间最值得的打开方式', '0.9', '0');
INSERT INTO `activities` VALUES (12, '\"五五购物节\",体验周来袭', '/imgs/activity/aid-01.jpg', '1667836800', '1668441600', '<p>对于很多市民朋友来说，民宿是体验慢生活的方式之一。为了响应“2022国际消费季”暨第三届上海“五五购物节”相关要求，奉贤区也即将开启“五五购物节民宿体验周”活动！活动期间，奉贤十一家民宿将在持续一周的时间里惊喜送不停，还不快赶紧冲！</p><p>想体验民宿生活</p><p>偷得浮生半日闲的小伙伴</p><p>这次可千万不要错过</p><p>本次活动内的十一家民宿</p><p>风格不同又各自美好</p><p>相比于传统的酒店</p><p>在假期住一住身边的民宿</p><p>才是人间最值得的打开方式', '0.9', '0');
INSERT INTO `activities` VALUES (13, '\"五五购物节\",体验周来袭', '/imgs/activity/aid-01.jpg', '1667836800', '1668441600', '<p>对于很多市民朋友来说，民宿是体验慢生活的方式之一。为了响应“2022国际消费季”暨第三届上海“五五购物节”相关要求，奉贤区也即将开启“五五购物节民宿体验周”活动！活动期间，奉贤十一家民宿将在持续一周的时间里惊喜送不停，还不快赶紧冲！</p><p>想体验民宿生活</p><p>偷得浮生半日闲的小伙伴</p><p>这次可千万不要错过</p><p>本次活动内的十一家民宿</p><p>风格不同又各自美好</p><p>相比于传统的酒店</p><p>在假期住一住身边的民宿</p><p>才是人间最值得的打开方式', '0.9', '0');
INSERT INTO `activities` VALUES (14, '\"五五购物节\",体验周来袭', '/imgs/activity/aid-01.jpg', '1667836800', '1668441600', '<p>对于很多市民朋友来说，民宿是体验慢生活的方式之一。为了响应“2022国际消费季”暨第三届上海“五五购物节”相关要求，奉贤区也即将开启“五五购物节民宿体验周”活动！活动期间，奉贤十一家民宿将在持续一周的时间里惊喜送不停，还不快赶紧冲！</p><p>想体验民宿生活</p><p>偷得浮生半日闲的小伙伴</p><p>这次可千万不要错过</p><p>本次活动内的十一家民宿</p><p>风格不同又各自美好</p><p>相比于传统的酒店</p><p>在假期住一住身边的民宿</p><p>才是人间最值得的打开方式', '0.9', '0');
INSERT INTO `activities` VALUES (15, '\"五五购物节\",体验周来袭', '/imgs/activity/aid-01.jpg', '1667836800', '1668441600', '<p>对于很多市民朋友来说，民宿是体验慢生活的方式之一。为了响应“2022国际消费季”暨第三届上海“五五购物节”相关要求，奉贤区也即将开启“五五购物节民宿体验周”活动！活动期间，奉贤十一家民宿将在持续一周的时间里惊喜送不停，还不快赶紧冲！</p><p>想体验民宿生活</p><p>偷得浮生半日闲的小伙伴</p><p>这次可千万不要错过</p><p>本次活动内的十一家民宿</p><p>风格不同又各自美好</p><p>相比于传统的酒店</p><p>在假期住一住身边的民宿</p><p>才是人间最值得的打开方式', '0.9', '0');
INSERT INTO `activities` VALUES (16, '\"五五购物节\",体验周来袭', '/imgs/activity/aid-01.jpg', '1667836800', '1668441600', '<p>对于很多市民朋友来说，民宿是体验慢生活的方式之一。为了响应“2022国际消费季”暨第三届上海“五五购物节”相关要求，奉贤区也即将开启“五五购物节民宿体验周”活动！活动期间，奉贤十一家民宿将在持续一周的时间里惊喜送不停，还不快赶紧冲！</p><p>想体验民宿生活</p><p>偷得浮生半日闲的小伙伴</p><p>这次可千万不要错过</p><p>本次活动内的十一家民宿</p><p>风格不同又各自美好</p><p>相比于传统的酒店</p><p>在假期住一住身边的民宿</p><p>才是人间最值得的打开方式', '0.9', '0');
INSERT INTO `activities` VALUES (17, '\"五五购物节\",体验周来袭', '/imgs/activity/aid-01.jpg', '1667836800', '1668441600', '<p>对于很多市民朋友来说，民宿是体验慢生活的方式之一。为了响应“2022国际消费季”暨第三届上海“五五购物节”相关要求，奉贤区也即将开启“五五购物节民宿体验周”活动！活动期间，奉贤十一家民宿将在持续一周的时间里惊喜送不停，还不快赶紧冲！</p><p>想体验民宿生活</p><p>偷得浮生半日闲的小伙伴</p><p>这次可千万不要错过</p><p>本次活动内的十一家民宿</p><p>风格不同又各自美好</p><p>相比于传统的酒店</p><p>在假期住一住身边的民宿</p><p>才是人间最值得的打开方式', '0.9', '0');
INSERT INTO `activities` VALUES (18, '\"五五购物节\",体验周来袭', '/imgs/activity/aid-01.jpg', '1667836800', '1668441600', '<p>对于很多市民朋友来说，民宿是体验慢生活的方式之一。为了响应“2022国际消费季”暨第三届上海“五五购物节”相关要求，奉贤区也即将开启“五五购物节民宿体验周”活动！活动期间，奉贤十一家民宿将在持续一周的时间里惊喜送不停，还不快赶紧冲！</p><p>想体验民宿生活</p><p>偷得浮生半日闲的小伙伴</p><p>这次可千万不要错过</p><p>本次活动内的十一家民宿</p><p>风格不同又各自美好</p><p>相比于传统的酒店</p><p>在假期住一住身边的民宿</p><p>才是人间最值得的打开方式', '0.9', '0');

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins`  (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `admin_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员名称',
  `admin_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员密码',
  `admin_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员电话',
  `admin_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '管理员邮箱',
  `admin_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '管理员头像',
  PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES (1, 'admin11', '111111', '17811112222', 'admin@163.com', '/imgs/avatar/16715aa5-a512-4d5b-aa42-b6f793fba849.jpeg');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `user_id` int(11) DEFAULT NULL COMMENT '评论的用户ID',
  `supplier_id` int(11) DEFAULT NULL COMMENT '被评论的旅店ID',
  `comment_score` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评分, 1-5',
  `comment_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `comment_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论时间',
  `order_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '评论订单',
  PRIMARY KEY (`comment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `supplier_id`(`supplier_id`) USING BTREE,
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, 1, 1, '5', '很好！很棒！', '1668668635', '1668668505493');
INSERT INTO `comments` VALUES (5, 8, 3, '5', 'qqq', '1669376488', '1669372325294');

-- ----------------------------
-- Table structure for facilities
-- ----------------------------
DROP TABLE IF EXISTS `facilities`;
CREATE TABLE `facilities`  (
  `facility_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL COMMENT '旅社ID',
  `leisure` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '休闲和健身',
  `network` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '网络设施',
  `restaurant` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '餐饮',
  `provide` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '旅社提供',
  `scenic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '景点、旅游设施',
  `service` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '旅社提供的服务',
  `easy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '便利设施',
  `motion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '运动/活动',
  `wheelchair` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '无障碍设施',
  PRIMARY KEY (`facility_id`) USING BTREE,
  INDEX `supplier_id`(`supplier_id`) USING BTREE,
  CONSTRAINT `facilities_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of facilities
-- ----------------------------
INSERT INTO `facilities` VALUES (1, 1, '公共休息室,乒乓球组,台球桌', '无线网络', '咖啡厅/小餐厅,自动售卖机', '空调,自助洗衣机,行李房', '当地市场,国家公园', '接收信用卡支付,旅游/旅游服务平台', '便利店', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');
INSERT INTO `facilities` VALUES (2, 2, '公共休息室,游戏室,乒乓球组,操场/游乐场', '无线网络', '咖啡厅/小餐厅,自助厨房', '空调,自助洗衣机,行李房', '当地市场,国家公园', '接收信用卡支付', '便利店', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');
INSERT INTO `facilities` VALUES (3, 3, '公共休息室,游戏室', '无线网络', '咖啡厅/小餐厅,自助厨房', '空调,自助洗衣机,行李房', '当地市场,国家公园', '接收信用卡支付', '便利店', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');
INSERT INTO `facilities` VALUES (4, 4, '公共休息室,游戏室,乒乓球组', '无线网络', '咖啡厅/小餐厅,自助厨房', '空调,自助洗衣机,行李房', '当地市场,国家公园', '接收信用卡支付', '便利店', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');
INSERT INTO `facilities` VALUES (5, 5, '公共休息室,游戏室,乒乓球组', '无线网络', '咖啡厅/小餐厅,自助厨房', '空调,自助洗衣机,行李房', '当地市场,国家公园', '接收信用卡支付', '便利店,附近有停车场', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');
INSERT INTO `facilities` VALUES (6, 6, '公共休息室,乒乓球组', '无线网络', '咖啡厅/小餐厅,自助厨房', '空调,自助洗衣机,行李房', '当地市场,国家公园', '接收信用卡支付', '便利店', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');
INSERT INTO `facilities` VALUES (7, 7, '公共休息室,游戏室,乒乓球组', '无线网络', '咖啡厅/小餐厅,自助厨房', '空调,自助洗衣机,行李房', NULL, '接收信用卡支付', '便利店', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');
INSERT INTO `facilities` VALUES (8, 8, '公共休息室,游戏室,乒乓球组', '无线网络', '咖啡厅/小餐厅,自助厨房', '空调,自助洗衣机,行李房', NULL, '接收信用卡支付', '便利店', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');
INSERT INTO `facilities` VALUES (9, 9, '公共休息室,游戏室,乒乓球组', '无线网络', '咖啡厅/小餐厅,自助厨房', '空调,自助洗衣机,行李房', NULL, '接收信用卡支付', '便利店', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');
INSERT INTO `facilities` VALUES (10, 10, '公共休息室,游戏室,乒乓球组', '无线网络', '咖啡厅/小餐厅,自助厨房', '空调,自助洗衣机,行李房', NULL, '接收信用卡支付', '便利店', '团队协作,自行车,划船', '适合轮椅使用者/接待残疾人士');

-- ----------------------------
-- Table structure for houses
-- ----------------------------
DROP TABLE IF EXISTS `houses`;
CREATE TABLE `houses`  (
  `house_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '房型ID',
  `house_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '房型名称',
  `house_intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '房型简单介绍',
  `house_detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '房型详细介绍',
  `house_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '房型价格',
  `house_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '房型地址',
  `house_imgs` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '房型图片, 数组形式的字符串, 如\"[路径1,路径2,...]\"',
  `supplier_id` int(11) DEFAULT NULL COMMENT '旅店ID',
  PRIMARY KEY (`house_id`) USING BTREE,
  INDEX `supplier_id`(`supplier_id`) USING BTREE,
  CONSTRAINT `houses_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of houses
-- ----------------------------
INSERT INTO `houses` VALUES (1, '男生高端影音·时尚太空舱111', '仅男生入住，wifi(免费),无宽带', '一楼，3平方米，1张1.2米太空舱，公共卫浴，无窗，禁烟，无早餐', '34', '山东省-青岛市-市南区-肥城路53号', '/imgs/houses/hid-01-01.jpg,/imgs/houses/hid-01-02.jpg,/imgs/houses/hid-01-03.jpg,/imgs/houses/hid-01-04.jpg', 1);
INSERT INTO `houses` VALUES (2, '女生高端影音·时尚太空舱', '仅女生入住，wifi(免费),无宽带', '一楼，3平方米，1张1.2米太空舱，公共卫浴，窗户位于走廊或过道，禁烟，无早餐', '34', '山东省-青岛市-市南区-肥城路53号', '/imgs/houses/hid-02-01.jpg,/imgs/houses/hid-02-02.jpg,/imgs/houses/hid-02-03.jpg,/imgs/houses/hid-02-04.jpg', 1);
INSERT INTO `houses` VALUES (4, '骑士八人房', '仅男生入住，wifi(免费),无宽带', '4-6楼，24平方米，4张1.3米上下铺，有窗，无早餐', '62', '广东省-广州市-越秀区-海珠中路215号', '/imgs/houses/hid-04-01.jpg,/imgs/houses/hid-04-02.jpg,/imgs/houses/hid-04-03.jpg,/imgs/houses/hid-04-04.jpg', 2);
INSERT INTO `houses` VALUES (5, '公主四人房', '仅女生入住，wifi(免费),无宽带', '4-6楼，24平方米，2张1.3米上下铺，有窗，无早餐', '72', '广东省-广州市-越秀区-海珠中路215号', '/imgs/houses/hid-05-01.jpg,/imgs/houses/hid-05-02.jpg,/imgs/houses/hid-05-03.jpg,/imgs/houses/hid-05-04.jpg', 2);
INSERT INTO `houses` VALUES (6, '三人家庭套间', '适合三人家庭入住，wifi(免费),无宽带', '7-8楼，15平方米，3张1.2米单人床', '195', '广东省-广州市-越秀区-海珠中路215号', '/imgs/houses/hid-06-01.jpg,/imgs/houses/hid-06-02.jpg,/imgs/houses/hid-06-03.jpg,/imgs/houses/hid-06-04.jpg', 2);
INSERT INTO `houses` VALUES (7, '经典双床房', '适合四人行入住，wifi(免费),无宽带', '2-6楼，12平方米，2张1.5米双人床，有窗', '151', '四川省-成都市-武侯区-跳伞塔街道-锦绣路44-9号', '/imgs/houses/hid-07-01.jpg,/imgs/houses/hid-07-02.jpg,/imgs/houses/hid-07-03.jpg,/imgs/houses/hid-07-04.jpg', 3);
INSERT INTO `houses` VALUES (8, '阳光大床房', '适合双人入住，wifi(免费),无宽带', '2-6楼，10平方米，1张1.5米双人床', '151', '四川省-成都市-武侯区-跳伞塔街道-锦绣路44-9号', '/imgs/houses/hid-08-01.jpg,/imgs/houses/hid-08-02.jpg,/imgs/houses/hid-08-03.jpg,/imgs/houses/hid-08-04.jpg', 3);
INSERT INTO `houses` VALUES (9, '小花六人间', '仅女生入住，wifi(免费),无宽带', '7楼，8平方米，3张1米上下铺', '40', '四川省-成都市-武侯区-跳伞塔街道-锦绣路44-9号', '/imgs/houses/hid-09-01.jpg,/imgs/houses/hid-09-02.jpg,/imgs/houses/hid-09-03.jpg,/imgs/houses/hid-09-04.jpg', 3);
INSERT INTO `houses` VALUES (10, '女生六人间', '仅女生入住，wifi(免费),无宽带', '9层,30㎡,3张0.8m上下铺,有窗,无餐食', '80', '广东省-深圳市-龙华区-民治街道-龙光玖钻3A栋', '/imgs/houses/hid-10-01.jpg,/imgs/houses/hid-10-02.jpg,/imgs/houses/hid-10-03.jpg,/imgs/houses/hid-10-04.jpg', 4);
INSERT INTO `houses` VALUES (12, '女生四人间', '仅女生入住，wifi(免费),无宽带', '9层,25㎡,有窗,2张0.8m上下铺,无餐食', '80', '广东省-深圳市-龙华区-民治街道-龙光玖钻3A栋', '/imgs/houses/hid-12-01.jpg,/imgs/houses/hid-12-02.jpg,/imgs/houses/hid-12-03.jpg,/imgs/houses/hid-12-04.jpg', 4);
INSERT INTO `houses` VALUES (13, '女生四人间', '仅女生入住，wifi(免费),无宽带', '11层,16-19㎡,部分无窗,2张1.2m上下铺,无餐食', '101', '江苏省-苏州市-姑苏区-金阊街道-石路29号11楼', '/imgs/houses/hid-13-01.jpg,/imgs/houses/hid-13-02.jpg,/imgs/houses/hid-13-03.jpg,/imgs/houses/hid-13-04.jpg', 5);
INSERT INTO `houses` VALUES (14, '高空日落景观大床房', '可住2人，wifi(免费),无宽带', '15-19㎡,有窗,1张1.8m大床，11层,无餐食', '183', '江苏省-苏州市-姑苏区-金阊街道-石路29号11楼', '/imgs/houses/hid-14-01.jpg,/imgs/houses/hid-14-02.jpg,/imgs/houses/hid-14-03.jpg,/imgs/houses/hid-14-04.jpg', 5);
INSERT INTO `houses` VALUES (15, '男生特惠床位', '仅男生入住,wifi(免费),无宽带', '20㎡,窗户位于走廊或过道,3张1m上下铺,11层,无餐食', '93', '江苏省-苏州市-姑苏区-金阊街道-石路29号11楼', '/imgs/houses/hid-15-01.jpg,/imgs/houses/hid-15-02.jpg,/imgs/houses/hid-15-03.jpg,/imgs/houses/hid-15-04.jpg', 5);
INSERT INTO `houses` VALUES (16, '柠月如风·女生六人间', '上下铺 仅女生入住,wifi(免费),无宽带', '20㎡,有窗,3张1m上下铺,11层,无餐食', '93', '湖南省-长沙市-天心区-五一大道717号-五一新干线大厦1120室', '/imgs/houses/hid-16-01.jpg,/imgs/houses/hid-16-02.jpg,/imgs/houses/hid-16-03.jpg,/imgs/houses/hid-16-04.jpg', 6);
INSERT INTO `houses` VALUES (17, '年少有为·男生床位', '上下铺（仅男生入住）,wifi(免费),无宽带', '20㎡,有窗,3张1m上下铺,11层,无餐食', '93', '湖南省-长沙市-天心区-五一大道717号-五一新干线大厦1120室', '/imgs/houses/hid-17-01.jpg,/imgs/houses/hid-17-02.jpg,/imgs/houses/hid-17-03.jpg,/imgs/houses/hid-17-04.jpg', 6);
INSERT INTO `houses` VALUES (18, '静世芳华·女生特惠六人间', '上下铺（仅女生入住）', '20㎡,窗户位于走廊或过道,3张1m上下铺,11层,无餐食', '77', '湖南省-长沙市-天心区-五一大道717号-五一新干线大厦1120室', '/imgs/houses/hid-18-01.jpg,/imgs/houses/hid-18-02.jpg,/imgs/houses/hid-18-03.jpg,/imgs/houses/hid-18-04.jpg', 6);
INSERT INTO `houses` VALUES (19, '何夜·优选四人间', '上下铺（仅女生入住）,wifi(免费),无宽带', '18-20㎡,有窗,1张1.1m上下铺,wifi(免费),无宽带,2层,无餐食', '105', '陕西省-西安市-新城区-南新街28号', '/imgs/houses/hid-19-01.jpg,/imgs/houses/hid-19-02.jpg,/imgs/houses/hid-19-03.jpg,/imgs/houses/hid-19-04.jpg', 7);
INSERT INTO `houses` VALUES (20, '何夜·智选四人间', '上下铺（仅男生入住）,wifi(免费),无宽带', '18-20㎡,有窗,1张1.1m上下铺,2层,无餐食', '105', '陕西省-西安市-新城区-南新街28号', '/imgs/houses/hid-20-01.jpg,/imgs/houses/hid-20-02.jpg,/imgs/houses/hid-20-03.jpg,/imgs/houses/hid-20-04.jpg', 7);
INSERT INTO `houses` VALUES (21, '小筑·影音房', '可住2人，wifi(免费),无宽带', '22㎡，有窗，1张1.8m大床，wifi(免费)，无宽带，5层，无餐食', '158', '陕西省-西安市-新城区-南新街28号', '/imgs/houses/hid-21-01.jpg,/imgs/houses/hid-21-02.jpg,/imgs/houses/hid-21-03.jpg,/imgs/houses/hid-21-04.jpg', 7);
INSERT INTO `houses` VALUES (22, '乐巢千寻女生6人床位房', '上下铺（仅女生入住）,wifi(免费),无宽带', '35㎡,有窗,3张1.1m上下铺,8层,无餐食', '46', '海南省-海口市-龙华区-金龙路8号-嘉华城市花园嘉景苑805', '/imgs/houses/hid-22-01.jpg,/imgs/houses/hid-22-02.jpg,/imgs/houses/hid-22-03.jpg,/imgs/houses/hid-22-04.jpg', 8);
INSERT INTO `houses` VALUES (23, '乐巢男生4人床位房', '上下铺（仅男生入住）,wifi(免费),无宽带', '15-20㎡,有窗,2张1.3m上下铺,8层,无餐食', '50', '海南省-海口市-龙华区-金龙路8号-嘉华城市花园嘉景苑805', '/imgs/houses/hid-23-01.jpg,/imgs/houses/hid-23-02.jpg,/imgs/houses/hid-23-03.jpg,/imgs/houses/hid-23-04.jpg', 8);
INSERT INTO `houses` VALUES (24, '乐巢男生舒适4人床位房', '上下铺（仅男生入住）,wifi(免费),无宽带', '20㎡,有窗,2张1m上下铺,无餐食', '50', '海南省-海口市-龙华区-金龙路8号-嘉华城市花园嘉景苑805', '/imgs/houses/hid-24-01.jpg,/imgs/houses/hid-24-02.jpg,/imgs/houses/hid-24-03.jpg,/imgs/houses/hid-24-04.jpg', 8);
INSERT INTO `houses` VALUES (25, '男生新风房', '上下铺（仅男生入住）,wifi(免费),无宽带', '15㎡,无窗,3张1m上下铺,3层,无餐食', '68', '福建省-厦门市-思明区-马柱巷33-101号', '/imgs/houses/hid-25-01.jpg,/imgs/houses/hid-25-02.jpg,/imgs/houses/hid-25-03.jpg,/imgs/houses/hid-25-04.jpg', 9);
INSERT INTO `houses` VALUES (26, '女生新风房', '上下铺（仅女生入住）,wifi(免费),无宽带', '15㎡,无窗,4张1m上下铺,3层,无餐食', '68', '福建省-厦门市-思明区-马柱巷33-101号', '/imgs/houses/hid-26-01.jpg,/imgs/houses/hid-26-02.jpg,/imgs/houses/hid-26-03.jpg,/imgs/houses/hid-26-04.jpg', 9);
INSERT INTO `houses` VALUES (27, '女生阳光房', '上下铺（仅女生入住）,wifi(免费),无宽带', '15㎡,有窗,4张1m上下铺,3层,无餐食', '70', '福建省-厦门市-思明区-马柱巷33-101号', '/imgs/houses/hid-27-01.jpg,/imgs/houses/hid-27-02.jpg,/imgs/houses/hid-27-03.jpg,/imgs/houses/hid-27-04.jpg', 9);
INSERT INTO `houses` VALUES (28, '六人间A', '（仅女生入住）,wifi(免费),无宽带', '20㎡,无窗,6张1.1m单人床,3层,无餐食', '105', '江苏省-南京市-秦淮区-建康路185号-招商花园里三楼', '/imgs/houses/hid-28-01.jpg,/imgs/houses/hid-28-02.jpg,/imgs/houses/hid-28-03.jpg,/imgs/houses/hid-28-04.jpg', 10);
INSERT INTO `houses` VALUES (29, '四人间', '（仅男生入住）,wifi(免费),无宽带', '15㎡,无窗,2张1m上下铺,3层,无餐食', '115', '江苏省-南京市-秦淮区-建康路185号-招商花园里三楼', '/imgs/houses/hid-29-01.jpg,/imgs/houses/hid-29-02.jpg,/imgs/houses/hid-29-03.jpg,/imgs/houses/hid-29-04.jpg', 10);
INSERT INTO `houses` VALUES (30, '八人间', '（仅男生入住）,wifi(免费),无宽带', '25㎡,无窗,3张1m上下铺,3层,无餐食', '100', '江苏省-南京市-秦淮区-建康路185号-招商花园里三楼', '/imgs/houses/hid-30-01.jpg,/imgs/houses/hid-30-02.jpg,/imgs/houses/hid-30-03.jpg,/imgs/houses/hid-30-04.jpg', 10);
INSERT INTO `houses` VALUES (31, '大床房', '广阔视野，35 m²，免费WiFi，空调', '房间均配有空调、带卫星频道的平板电视、电热水壶、淋浴设施、浴袍和书桌。客房均配有私人浴室、拖鞋和床上用品。', '120', '云南省-大理市-古城-大丽-派出所-东南侧约30米', '/imgs/houses/hid-31-01.jpg,/imgs/houses/hid-31-02.jpg,/imgs/houses/hid-31-03.jpg,/imgs/houses/hid-31-04.jpg', 11);
INSERT INTO `houses` VALUES (32, '简约双床房', '45 m²，免费WiFi，浴室', '房间均配有空调、带卫星频道的平板电视、电热水壶、淋浴设施、浴袍和书桌。客房均配有私人浴室、拖鞋和床上用品。', '135', '云南省-大理市-古城-大丽-派出所-东南侧约30米云南省-大理市-古城-大丽-派出所-东南侧约30米', '/imgs/houses/hid-32-01.jpg,/imgs/houses/hid-32-02.jpg,/imgs/houses/hid-32-03.jpg,/imgs/houses/hid-32-04.jpg', 11);
INSERT INTO `houses` VALUES (33, '榻榻米双床房', '40 m²，免费WiFi，恒温', '房间均配有空调、带卫星频道的平板电视、电热水壶、淋浴设施、浴袍和书桌。客房均配有私人浴室、拖鞋和床上用品。', '80', '云南省-大理市-古城-大丽-派出所-东南侧约30米', '/imgs/houses/hid-33-01.jpg,/imgs/houses/hid-33-02.jpg,/imgs/houses/hid-33-03.jpg,/imgs/houses/hid-33-04.jpg', 11);
INSERT INTO `houses` VALUES (34, '家庭房', '烧烤架 露台咖啡机 免费WiFi', '客房位于传统的木制结构的粘土住宅内，独特地配有现代化的设施，如壁炉、石头比萨炉、烧烤工具、地暖和空调。独立浴室拥有天窗和浴缸，享有充足的自然光。民宿提供浴袍。', '80', '浙江省-湖州市-德清县-衡山-衡山街道-81号', '/imgs/houses/hid-34-01.jpg,/imgs/houses/hid-34-02.jpg,/imgs/houses/hid-34-03.jpg,/imgs/houses/hid-34-04.jpg', 12);
INSERT INTO `houses` VALUES (35, '大床房', '烧烤架 露台咖啡机 免费WiFi', '客房位于传统的木制结构的粘土住宅内，独特地配有现代化的设施，如壁炉、石头比萨炉、烧烤工具、地暖和空调。独立浴室拥有天窗和浴缸，享有充足的自然光。民宿提供浴袍。', '60', '浙江省-湖州市-德清县-衡山-衡山街道-81号', '/imgs/houses/hid-35-01.jpg,/imgs/houses/hid-35-02.jpg,/imgs/houses/hid-35-03.jpg,/imgs/houses/hid-35-04.jpg', 12);
INSERT INTO `houses` VALUES (36, '山景房', '烧烤架 露台咖啡机 免费WiFi', '客房位于传统的木制结构的粘土住宅内，独特地配有现代化的设施，如壁炉、石头比萨炉、烧烤工具、地暖和空调。独立浴室拥有天窗和浴缸，享有充足的自然光。民宿提供浴袍。', '90', '浙江省-湖州市-德清县-衡山-衡山街道-81号', '/imgs/houses/hid-36-01.jpg,/imgs/houses/hid-36-02.jpg,/imgs/houses/hid-36-03.jpg,/imgs/houses/hid-36-04.jpg', 12);
INSERT INTO `houses` VALUES (37, '四人客房', 'Spa浴缸 庭院私人 浴室 平板电视', '部分客房享有山脉或泳池的景致。客房提供拖鞋、免费洗浴用品和吹风机。镜立方山居提供免费WiFi。', '120', '湖南省-张家界-武陵源区-锣鼓-塔管街道-二等组', '/imgs/houses/hid-37-01.jpg,/imgs/houses/hid-37-02.jpg,/imgs/houses/hid-37-03.jpg,/imgs/houses/hid-37-04.jpg', 13);
INSERT INTO `houses` VALUES (38, '家庭房', 'Spa浴缸 庭院私人 浴室 平板电视', '部分客房享有山脉或泳池的景致。客房提供拖鞋、免费洗浴用品和吹风机。镜立方山居提供免费WiFi。', '110', '湖南省-张家界-武陵源区-锣鼓-塔管街道-二等组', '/imgs/houses/hid-38-01.jpg,/imgs/houses/hid-38-02.jpg,/imgs/houses/hid-38-03.jpg,/imgs/houses/hid-38-04.jpg', 13);
INSERT INTO `houses` VALUES (39, '简约双床房', 'Spa浴缸 庭院私人 浴室 平板电视', '部分客房享有山脉或泳池的景致。客房提供拖鞋、免费洗浴用品和吹风机。镜立方山居提供免费WiFi。', '99', '湖南省-张家界-武陵源区-锣鼓-塔管街道-二等组', '/imgs/houses/hid-39-01.jpg,/imgs/houses/hid-39-02.jpg,/imgs/houses/hid-39-03.jpg,/imgs/houses/hid-39-04.jpg', 13);
INSERT INTO `houses` VALUES (40, '经济房', '整租公寓 空调 独立浴室 平板电视 隔音 免费WiFi', '客房提供私人浴室。这家旅馆的部分房间也配备休息区。', '40', '湖南省-张家界-武陵源区-卸甲路-塔管街道-99号', '/imgs/houses/hid-40-01.jpg,/imgs/houses/hid-40-02.jpg,/imgs/houses/hid-40-03.jpg,/imgs/houses/hid-40-04.jpg', 14);
INSERT INTO `houses` VALUES (41, '主题房', '整租公寓 空调 独立浴室 平板电视 隔音 免费WiFi', '客房提供私人浴室。这家旅馆的部分房间也配备休息区。', '100', '湖南省-张家界-武陵源区-卸甲路-塔管街道-99号', '/imgs/houses/hid-41-01.jpg,/imgs/houses/hid-41-02.jpg,/imgs/houses/hid-41-03.jpg,/imgs/houses/hid-41-04.jpg', 14);
INSERT INTO `houses` VALUES (42, '秘密基地', '整租公寓 空调 独立浴室 平板电视 隔音 免费WiFi', '客房提供私人浴室。这家旅馆的部分房间也配备休息区。', '110', '湖南省-张家界-武陵源区-卸甲路-塔管街道-99号', '/imgs/houses/hid-42-01.jpg,/imgs/houses/hid-42-02.jpg,/imgs/houses/hid-42-03.jpg,/imgs/houses/hid-42-04.jpg', 14);
INSERT INTO `houses` VALUES (43, '双层房', '22 m² 免费WiFi', '所有客房都配有带淋浴设施、拖鞋和吹风机的共用浴室。', '80', '黑空江省-绥化市-万宝山-省建-五公司农场-39号', '/imgs/houses/hid-43-01.jpg,/imgs/houses/hid-43-02.jpg,/imgs/houses/hid-43-03.jpg,/imgs/houses/hid-43-04.jpg', 15);
INSERT INTO `houses` VALUES (44, '主题房', '22 m² 免费WiFi', '所有客房都配有带淋浴设施、拖鞋和吹风机的共用浴室。', '120', '黑空江省-绥化市-万宝山-省建-五公司农场-39号', '/imgs/houses/hid-44-01.jpg,/imgs/houses/hid-44-02.jpg,/imgs/houses/hid-44-03.jpg,/imgs/houses/hid-44-04.jpg', 15);
INSERT INTO `houses` VALUES (45, '简约双床房', '22 m² 免费WiFi', '所有客房都配有带淋浴设施、拖鞋和吹风机的共用浴室。', '140', '黑空江省-绥化市-万宝山-省建-五公司农场-39号', '/imgs/houses/hid-45-01.jpg,/imgs/houses/hid-45-02.jpg,/imgs/houses/hid-45-03.jpg,/imgs/houses/hid-45-04.jpg', 15);
INSERT INTO `houses` VALUES (46, '阳台房', '地标景 空调 平板电视 隔音 露台迷你吧 免费WiFi', '客栈距离元世祖平云南碑有4.3公里。最近的机场是大理机场，距离大理宁院星空海景主题客栈有6公里。客栈提供免费机场班车服务。', '89', '云南省-大理市-洱海-生态城-2号楼-39号', '/imgs/houses/hid-46-01.jpg,/imgs/houses/hid-46-02.jpg,/imgs/houses/hid-46-03.jpg,/imgs/houses/hid-46-04.jpg', 16);
INSERT INTO `houses` VALUES (47, '套房', '地标景 空调 平板电视 隔音 露台迷你吧 免费WiFi', '所有客房都配有带淋浴设施、客栈距离元世祖平云南碑有4.3公里。最近的机场是大理机场，距离大理宁院星空海景主题客栈有6公里。客栈提供免费机场班车服务。拖鞋和吹风机的共用浴室。', '140', '云南省-大理市-洱海-生态城-2号楼-39号', '/imgs/houses/hid-47-01.jpg,/imgs/houses/hid-47-02.jpg,/imgs/houses/hid-47-03.jpg,/imgs/houses/hid-47-04.jpg', 16);
INSERT INTO `houses` VALUES (48, '简约双床房', '地标景 空调 平板电视 隔音 露台迷你吧 免费WiFi', '客栈距离元世祖平云南碑有4.3公里。最近的机场是大理机场，距离大理宁院星空海景主题客栈有6公里。客栈提供免费机场班车服务。', '110', '云南省-大理市-洱海-生态城-2号楼-39号', '/imgs/houses/hid-48-01.jpg,/imgs/houses/hid-48-02.jpg,/imgs/houses/hid-48-03.jpg,/imgs/houses/hid-48-04.jpg', 16);
INSERT INTO `houses` VALUES (49, '花园房', '17 m² 阳台 山景 市景 空调', '部分房间拥有卫星频道平板电视、带微波炉的设施齐全的小厨房，以及带热水浴池和拖鞋的私人浴室', '77', '浙江省-杭州市-西湖-太子湾-上云舍-39号', '/imgs/houses/hid-49-01.jpg,/imgs/houses/hid-49-02.jpg,/imgs/houses/hid-49-03.jpg,/imgs/houses/hid-49-04.jpg', 17);
INSERT INTO `houses` VALUES (50, '套房', '18 m² 阳台 山景 市景 空调', '部分房间拥有卫星频道平板电视、带微波炉的设施齐全的小厨房，以及带热水浴池和拖鞋的私人浴室', '120', '浙江省-杭州市-西湖-太子湾-上云舍-39号', '/imgs/houses/hid-50-01.jpg,/imgs/houses/hid-50-02.jpg,/imgs/houses/hid-50-03.jpg,/imgs/houses/hid-50-04.jpg', 17);
INSERT INTO `houses` VALUES (51, '阳光房', '19 m² 阳台 山景 市景 空调', '部分房间拥有卫星频道平板电视、带微波炉的设施齐全的小厨房，以及带热水浴池和拖鞋的私人浴室', '100', '浙江省-杭州市-西湖-太子湾-上云舍-39号', '/imgs/houses/hid-51-01.jpg,/imgs/houses/hid-51-02.jpg,/imgs/houses/hid-51-03.jpg,/imgs/houses/hid-51-04.jpg', 17);
INSERT INTO `houses` VALUES (52, '主题房', '阳台 花园 景山 景地 景庭院', '这家家庭式住宿享有花园景，铺有镶木地板，配有2间卧室以及3间带淋浴设施和拖鞋的浴室。住宿提供平板电视、PS3游戏机、游戏机、iPad和电脑。', '80', '浙江省-杭州市-西湖-文三西路-锋尚苑-6幢', '/imgs/houses/hid-52-01.jpg,/imgs/houses/hid-52-02.jpg,/imgs/houses/hid-52-03.jpg,/imgs/houses/hid-52-04.jpg', 18);
INSERT INTO `houses` VALUES (53, '秘密基地', '阳台 花园 景山 景地 景庭院', '这家家庭式住宿享有花园景，铺有镶木地板，配有2间卧室以及3间带淋浴设施和拖鞋的浴室。住宿提供平板电视、PS4游戏机、游戏机、iPad和电脑。', '120', '浙江省-杭州市-西湖-文三西路-锋尚苑-7幢', '/imgs/houses/hid-53-01.jpg,/imgs/houses/hid-53-02.jpg,/imgs/houses/hid-53-03.jpg,/imgs/houses/hid-53-04.jpg', 18);
INSERT INTO `houses` VALUES (54, '简约双床房', '阳台 花园 景山 景地 景庭院', '这家家庭式住宿享有花园景，铺有镶木地板，配有2间卧室以及3间带淋浴设施和拖鞋的浴室。住宿提供平板电视、PS5游戏机、游戏机、iPad和电脑。', '140', '浙江省-杭州市-西湖-文三西路-锋尚苑-7幢', '/imgs/houses/hid-54-01.jpg,/imgs/houses/hid-54-02.jpg,/imgs/houses/hid-54-03.jpg,/imgs/houses/hid-54-04.jpg', 18);
INSERT INTO `houses` VALUES (55, '花园房', '庭院 私人浴室 隔音 露台 免费WiFi', '阳朔境谷客栈（阳朔境谷度假酒店）距离阳朔汽车站有7分钟车程，距离竹筏漂流和游泳的地点有5分钟自行车车程，距离两江国际机场有1.2小时车程，提供机场接机服务。', '80', '广西省-桂林市阳朔县-枫木坪村-锋苑-3号', '/imgs/houses/hid-55-01.jpg,/imgs/houses/hid-55-02.jpg,/imgs/houses/hid-55-03.jpg,/imgs/houses/hid-55-04.jpg', 19);
INSERT INTO `houses` VALUES (56, '主题房', '庭院 私人浴室 隔音 露台 免费WiFi', '阳朔境谷客栈（阳朔境谷度假酒店）距离阳朔汽车站有7分钟车程，距离竹筏漂流和游泳的地点有5分钟自行车车程，距离两江国际机场有1.3小时车程，提供机场接机服务。', '110', '广西省-桂林市阳朔县-枫木坪村-锋苑-3号', '/imgs/houses/hid-56-01.jpg,/imgs/houses/hid-56-02.jpg,/imgs/houses/hid-56-03.jpg,/imgs/houses/hid-56-04.jpg', 19);
INSERT INTO `houses` VALUES (57, '秘密基地', '庭院 私人浴室 隔音 露台 免费WiFi', '阳朔境谷客栈（阳朔境谷度假酒店）距离阳朔汽车站有7分钟车程，距离竹筏漂流和游泳的地点有5分钟自行车车程，距离两江国际机场有1.3小时车程，提供机场接机服务。', '140', '广西省-桂林市阳朔县-枫木坪村-锋苑-3号', '/imgs/houses/hid-57-01.jpg,/imgs/houses/hid-57-02.jpg,/imgs/houses/hid-57-03.jpg,/imgs/houses/hid-57-04.jpg', 19);

-- ----------------------------
-- Table structure for joins
-- ----------------------------
DROP TABLE IF EXISTS `joins`;
CREATE TABLE `joins`  (
  `join_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '已参加活动ID',
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `activity_id` int(11) DEFAULT NULL COMMENT '活动ID',
  `join_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '参与活动的时间',
  `is_use` int(11) DEFAULT 0 COMMENT '0未使用 1已使用',
  `order_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '使用的订单',
  PRIMARY KEY (`join_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `activity_id`(`activity_id`) USING BTREE,
  CONSTRAINT `joins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `joins_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`activity_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of joins
-- ----------------------------
INSERT INTO `joins` VALUES (1, 1, 5, '1668668169', 1, '1668668505493');
INSERT INTO `joins` VALUES (3, 1, 6, '1669446588', 0, NULL);

-- ----------------------------
-- Table structure for minorders
-- ----------------------------
DROP TABLE IF EXISTS `minorders`;
CREATE TABLE `minorders`  (
  `id` int(24) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单号',
  `house_id` int(24) NOT NULL COMMENT '房型id',
  `male` int(24) DEFAULT 0 COMMENT '男生人数, 默认0',
  `female` int(24) DEFAULT 0 COMMENT '女生人数, 默认0',
  `children` int(24) DEFAULT 0 COMMENT '小孩人数, 默认0',
  `num` int(24) DEFAULT 1 COMMENT '房间数, 默认1',
  `check_in` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '入住时间, 时间戳形式, 单位s',
  `check_out` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '退房时间, 时间戳形式, 单位s',
  `days` int(24) DEFAULT 1 COMMENT '几晚数, 默认1',
  `price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '房型单价',
  `total_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '该笔房型总价',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `house_id`(`house_id`) USING BTREE,
  CONSTRAINT `minorders_ibfk_1` FOREIGN KEY (`house_id`) REFERENCES `houses` (`house_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of minorders
-- ----------------------------
INSERT INTO `minorders` VALUES (1, '1668668505493', 2, 0, 1, 0, 1, '1668700800', '1668873600', 2, '34', '68');
INSERT INTO `minorders` VALUES (2, '1668668505493', 1, 1, 0, 0, 1, '1668441600', '1668528000', 1, '34', '34');
INSERT INTO `minorders` VALUES (3, '1669372325294', 9, 3, 1, 0, 1, '1669305600', '1669392000', 1, '40', '40');
INSERT INTO `minorders` VALUES (4, '1669372325294', 8, 3, 1, 0, 1, '1669305600', '1669392000', 1, '151', '151');
INSERT INTO `minorders` VALUES (5, '1669372325294', 7, 3, 1, 0, 1, '1669305600', '1669392000', 1, '151', '151');
INSERT INTO `minorders` VALUES (6, '1669376508041', 7, 1, 0, 0, 1, '1669305600', '1669392000', 1, '151', '151');
INSERT INTO `minorders` VALUES (7, '1669446671990', 1, 1, 2, 0, 1, '1669478400', '1669737600', 3, '34', '34');
INSERT INTO `minorders` VALUES (8, '1669446671990', 2, 1, 2, 0, 1, '1669478400', '1669737600', 3, '34', '34');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(24) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `order_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单号',
  `order_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单实际支付价格',
  `order_orgin_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单原价',
  `user_id` int(24) NOT NULL COMMENT '用户id',
  `supplier_id` int(24) NOT NULL COMMENT '旅店id',
  `join_id` int(24) DEFAULT 0 COMMENT '用户使用的已参加的活动id, 默认0',
  `is_vip` int(24) DEFAULT NULL COMMENT '是否使用vip折扣 0否 1是, 默认0',
  `is_comment` int(24) DEFAULT 0 COMMENT '是否已评价 0否 1是',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '入住用户名',
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '入住用户邮箱',
  `user_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '入住用户电话',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `supplier_id`(`supplier_id`) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, '1668668505493', '91.8', '102', 1, 1, 5, 0, 1, '邓永康', 'dyk@qq,com', '1785766666');
INSERT INTO `orders` VALUES (2, '1669372325294', '307.80', '342', 8, 3, 0, 1, 1, '荣荣仙女', '1429846771@qq.com', '15516680261');
INSERT INTO `orders` VALUES (3, '1669376508041', '135.90', '151', 8, 3, 0, 1, 1, 'qa', 'q', 'q');
INSERT INTO `orders` VALUES (4, '1669446671990', '61.20', '68', 1, 1, 2, 1, 1, '汤鹏莹', '1404240289@qq.com', '17857615696');

-- ----------------------------
-- Table structure for suppliers
-- ----------------------------
DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE `suppliers`  (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '旅店ID',
  `supplier_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '旅店名称',
  `supplier_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '111111' COMMENT '旅店密码',
  `supplier_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '旅店电话',
  `supplier_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '旅店邮箱',
  `supplier_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '旅店地址',
  `supplier_intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '旅店介绍',
  `min_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '旅店最低价',
  `supplier_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '旅店头像',
  `supplier_imgs` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '旅店图片',
  `is_agree` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '是否同意加盟, 0否 1是',
  PRIMARY KEY (`supplier_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of suppliers
-- ----------------------------
INSERT INTO `suppliers` VALUES (1, '青游记国际青年旅舍(青岛栈桥店)1111', '111111', '15902398475', 'qyjgjqnls@163.com', '山东省-青岛市-市南区-肥城路53号', '青游记国际青年旅舍(青岛栈桥店)位于市南区肥城路，临近青岛火车站。周边地段繁华交通便利，距离栈桥风景区和中山路商业街仅有几步之遥。旅舍是一家装修极具特色和创新风格的青年旅社，每一个角落都会给您带来意外的发现和惊喜。老板为人热情好客，期待您的光临。', '80', '/imgs/avatar/sid-01.jpeg', '/imgs/suppliers/sid-01.jpeg', '1');
INSERT INTO `suppliers` VALUES (2, '广州春田家家青年旅舍LAZY GAGA', '111111', '18011854215', 'gzctjjqnls@163.com', '广东省-广州市-越秀区-海珠中路215号', '离地铁只需约4分鈡步程，就在北京路与上下九兩大步行街之间，覆蓋广州半数景点和数十间老牌餐馆，毗鄰多个批发市场。300平方巨型客厅、免费公用廚房、桌球、桌上足球、数百套电影、海量桌球、数百套全新电影，24小时全面开放。广州大型青旅，由电梯相连，免除提行李的不便。', '150', '/imgs/avatar/sid-02.jpeg', '/imgs/suppliers/sid-02.jpeg', '1');
INSERT INTO `suppliers` VALUES (3, '成都十方青年客栈', '111111', '15860196511', 'cdsfqnkz@163.com', '四川省-成都市-武侯区-跳伞塔街道-锦绣路44-9号', '成都十方青年客栈位于锦绣路，近科华北路，和四川大学望江校区仅一街之隔，紧邻保利中心，王府井百货，亚太广场等商场；周边沃尔玛，屈臣氏，711便利店，小吃街酒吧KTV一应俱全，距离最近的地铁站一号线【倪家桥】站C出口约800米。这一家青旅客栈和24小时书（咖啡）吧一体的多功能青年空间，原木色简约的装修风格，做到尽可能的贴近自然；三十余间独卫房间和5间公卫多人间的设计意在为客人提供多样的选择空间。七楼多功能大厅，配有桌椅投影图书和各种游戏；顶楼宽敞的天台配有遮阳伞和休闲桌椅，也是平时是发呆乘凉，烧烤聚会的不二之', '174', '/imgs/avatar/sid-03.jpeg', '/imgs/suppliers/sid-03.jpeg', '1');
INSERT INTO `suppliers` VALUES (4, '柏喆国际青年旅舍(深圳北站店)', '111111', '17748553716', 'bjgjqnls@163.com', '广东省-深圳市-龙华区-民治街道-龙光玖钻3A栋', '位于民治街道龙光玖钻，周围有大型购物商超（天虹购物中心），集吃喝玩乐一体的红山6979演绎中心，休闲散步的北站中心公园。免费提供饮水机，24小时燃气热水器，24小时冷暖气空调，洗衣机，洗发水沐浴露，洗衣粉，纸巾，拖鞋，安全锁柜，办公台，休闲沙发，吹风机，床上用品，自助入住，拎包入住。', '123', '/imgs/avatar/sid-04.jpeg', '/imgs/suppliers/sid-04.jpeg', '1');
INSERT INTO `suppliers` VALUES (5, '背包十年青年旅舍(苏州山塘街店)', '111111', '19962123111', 'bbsnqnls@163.com', '江苏省-苏州市-姑苏区-金阊街道-石路29号11楼', '提到苏州，无论你去没去过这座城市，脑子里总会下意识的想到一句话：上有天堂，下有苏杭。吴侬软语，园林建筑，小桥流水，绣品美食，现代与典雅的结合。在苏州，和你一起感受江南的婉约风光，品一品唐代张继诗中的“姑苏城外寒山寺，夜半钟声到客船”。背包十年苏州店，位于姑苏区石路29号11楼。步行至山塘街，地铁2号线12号口很近，方便你来往各个火车站。为了满足大家的住宿需求，苏州店设有170个不同房型床位，5个大床，软硬件等级与国际接轨。全覆盖WIFI，全套科勒卫浴，24小时热水，咖啡，精酿啤酒，国家地理图书杂志，独立游', '145', '/imgs/avatar/sid-05.jpeg', '/imgs/suppliers/sid-05.jpeg', '1');
INSERT INTO `suppliers` VALUES (6, '长沙等风来青年旅舍', '111111', '15874999647', 'csdflqnls@163.com', '湖南省-长沙市-天心区-五一大道717号-五一新干线大厦1120室', '旅舍位于五一商圈核心区五一新干线，以青旅模式运营的旅舍。近五一广场地铁一号出口，到达市内各景区各车站都有地铁和公交直达。楼下就是太平老街、坡子街、解放西、化龙池、都正街、文庙坪、南门口、国金中心、黄兴步行街、王府井、平和堂、步行即至。青旅兼顾经济和实用性。卫生间干湿分离，附带独立洗手台；大窗台宽敞明亮，通风采光俱佳。我们提倡自助服务，相互交流，实践环保，爱护环境，简朴而高素质的生活，我们是青年旅舍，不是经济型酒店。独一的你遇见独一的我们， 希望为每一个独一亮彩的你，带来舒适的入住体验。', '69', '/imgs/avatar/sid-06.jpeg', '/imgs/suppliers/sid-06.jpeg', '1');
INSERT INTO `suppliers` VALUES (7, '何夜青年旅行酒店', '111111', '13887217820', 'hyqnlxjd@163.com', '陕西省-西安市-新城区-南新街28号', '何夜青年旅行酒店(西安钟鼓楼店)位于城市中心地区，出行便利，距地铁2号线钟楼站约600米，步行约10分钟可至钟楼、鼓楼、回民小吃街、骡马市步行街、明城墙等观光名胜，距离大雁塔、大唐芙蓉园等约20分钟车程，群光广场购物中心、海底捞火锅、星巴克咖啡、汉堡王、及各式当地传统中餐、日料、韩式等休闲美食遍布酒店周边。何夜青旅是继重庆解放碑店后在西安打造的一家精品舒适酒店，部分客房配置运动健身器材，保障运动达人不忘在旅途中坚持对身体健康机能的塑造。\r\n客房整体配置新风系统、堪比星级酒店的优质床垫让您在旅途中拥有优质的', '68', '/imgs/avatar/sid-07.jpeg', '/imgs/suppliers/sid-07.jpeg', '1');
INSERT INTO `suppliers` VALUES (8, '海口乐巢青年旅舍', '111111', '18512186155', 'hkycqnls@163.com', '海南省-海口市-龙华区-金龙路8号-嘉华城市花园嘉景苑805', '相信海口乐巢青年旅舍周到的服务和一流的设施，会让您在海口开展一段难忘的旅行。酒店地理位置优越，距离美兰国际机场25km，距离海口东火车站8km。著名的景点万绿园和金牛岭公园均在酒店附近，您可根据时间提前做好行程安排。酒店对客房的装饰十分考究，每间设施齐全的客房都配备有雨伞、空调和衣柜／衣橱。服务人员会提前为您准备好电热水壶和咖啡壶/茶壶，以满足您的饮水需求。倘若您在忙碌的一天后想在自己的客房内放松，提供拖鞋和24小时热水的客房浴室是不错的选择。酒店休闲区提供了各类设施，您可以在这里舒缓身心压力。', '145', '/imgs/avatar/sid-08.jpeg', '/imgs/suppliers/sid-08.jpeg', '1');
INSERT INTO `suppliers` VALUES (9, '厦门暖暖青年旅舍', '111111', '13003988091', 'xmnnqnls@163.com', '福建省-厦门市-思明区-马柱巷33-101号', '厦门暖暖青年旅舍坐落于中山路地区，优越的地理位置使它成为厦门一个令人向往的住宿选择。所有极具特色的客房都配备有空调，让您感受到更加贴心细致的入住体验。在一天的忙碌后，您可以在酒店尽情的享受各种体育和休闲设施。', '122', '/imgs/avatar/sid-09.jpeg', '/imgs/suppliers/sid-09.jpeg', '1');
INSERT INTO `suppliers` VALUES (10, '南京自由落体青年旅舍', '111111', '18120131681', 'njzyltqnls@163.com', '江苏省-南京市-秦淮区-建康路185号-招商花园里三楼', '南京自由落体青年旅舍位于位于地铁3号线夫子庙站正上方，步行至夫子庙约5分钟、总统府、新街口，步行或骑行约10分钟内即可到达。房内免费提供拖鞋、衣架，如需洗漱用品请自备或咨询前台，独立中央空调和新风系统，并提供24小时值班服务。在这里和天南地北的小伙伴一起感受六朝古都的独特韵味。', '110', '/imgs/avatar/sid-10.jpeg', '/imgs/suppliers/sid-10.jpeg', '1');
INSERT INTO `suppliers` VALUES (11, '涵琦客栈 Han Qi', '111111', '15948064103', 'gucheng6@163.com', '云南省-大理市-古城-大丽-派出所-东南侧约30米', '涵琦客栈Han Qi坐落于大理，距离洱海门有18分钟步行路程，配备餐厅、免费私人停车位、酒吧和共用休息室。这家住宿提供的设施包括24小时前台、共用厨房以及免费WiFi。住宿为客人提供客房服务、商务中心和旅游行程安排服务。', '97', '/imgs/avatar/sid-11.jpeg', '/imgs/suppliers/sid-11.jpeg', '1');
INSERT INTO `suppliers` VALUES (12, '莫干山唯乐山居', '111111', '15151511919', 'shenghsan@164.com', '浙江省-湖州市-德清县-衡山-衡山街道-80号', '莫干山唯乐山居精品酒店坐落在莫干山的竹海深处，传统房屋内配有优质的现代化设施，是僻静的隐居之所，可让您悠然自得，提供覆盖各处的免费WiFi。', '82', '/imgs/avatar/sid-12.jpeg', '/imgs/suppliers/sid-12.jpeg', '1');
INSERT INTO `suppliers` VALUES (13, '镜立方山居', '111111', '18674331212', 'zhangjiajie@164.com', '湖南省-张家界-武陵源区-锣鼓-塔管街道-二等组', '镜立方山居坐落在张家界国家森林公园的入口处，提供室外游泳池、烧烤设施、位于森林和山脉之间的客房以及内部餐厅。', '90', '/imgs/avatar/sid-13.jpeg', '/imgs/suppliers/sid-13.jpeg', '1');
INSERT INTO `suppliers` VALUES (14, '妙妙花园童话', '111111', '13169905993', 'miaomiaohua@164.com', '湖南省-张家界-武陵源区-卸甲路-塔管街道-39号', '妙妙花园童话国际旅游度假区店坐落于上海，配备花园以及免费WiFi，还为驱车前来的客人提供免费私人停车位，距离乐园有不到8.8公里，距离新国际博览中心有18公里。这家住宿提供家庭间和露台。这家旅馆提供儿童游乐区和24小时前台。', '99', '/imgs/avatar/sid-14.jpeg', '/imgs/suppliers/sid-14.jpeg', '1');
INSERT INTO `suppliers` VALUES (15, '安达客栈', '111111', '18609672826', 'miaomiaohua@164.com', '黑空江省-绥化市-万宝山-省建-五公司农场-39号', '安达客栈，配备共用休息室，距离大学有19分钟步行路程，距离大学有2.1公里。这家住宿距离古地质矿产陈列馆约有2.2公里，距离蒙古博物院有2.8公里，距离青城公园有3.5公里。住宿提供24小时前台、班车服务、客房服务以及免费WiFi。', '102', '/imgs/avatar/sid-15.jpeg', '/imgs/suppliers/sid-15.jpeg', '1');
INSERT INTO `suppliers` VALUES (16, '大理宁院星空海景主题客栈', '111111', '13817115274', 'xingkong@164.com', '云南省-大理市-洱海-生态城-2号楼-39号', '大理宁院星空海景主题客栈位于洱海湖畔，配有带大型落地窗的客房以及面向苍山和洱海的阳台，提供大理火车站或大理机场的免费接载服务。', '103', '/imgs/avatar/sid-16.jpeg', '/imgs/suppliers/sid-16.jpeg', '1');
INSERT INTO `suppliers` VALUES (17, '杭州西湖太子湾越上云舍民宿', '111111', '13485880004', 'shagnyun@164.com', '浙江省-杭州市-西湖-太子湾-上云舍-39号', '丽江素舍（简舍别院）-与民宿主共享古城庭院位于丽江，距离南门桥有2分钟步行路程，提供共用休息室、免费WiFi、24小时前台和客房服务。这家住宿享有市景，配备庭院。', '104', '/imgs/avatar/sid-17.jpeg', '/imgs/suppliers/sid-17.jpeg', '1');
INSERT INTO `suppliers` VALUES (18, '丽江素舍(简舍别院)', '111111', '18609672436', 'lijiang@164.com', '浙江省-杭州市-西湖-文三西路-锋尚苑-6幢', '阳朔境谷客栈（阳朔境谷度假酒店）坐落在遇龙河入口处的一个小村庄内，提供远离城市喧嚣的宁静休闲之地，享有壮丽的山景和稻田景，提供免费WiFi、按摩服务、旅游咨询台和自行车出租服务。', '108', '/imgs/avatar/sid-18.jpeg', '/imgs/suppliers/sid-18.jpeg', '1');
INSERT INTO `suppliers` VALUES (19, '阳朔境谷客栈', '111111', '13609122436', 'yangshuo@164.com', '广西省-桂林市-阳朔县-枫木坪村-锋苑-3号', '杭州西湖太子湾越上云舍民宿坐落于杭州，配备免费WiFi、空调、餐厅和共用休息室，距离吴山广场有3.6公里，距离灵隐寺有4.1公里。内部提供私人停车位。', '109', '/imgs/avatar/sid-19.jpeg', '/imgs/suppliers/sid-19.jpeg', '1');
INSERT INTO `suppliers` VALUES (22, '【青岩】井巷·云居', '111111', '13699139436', 'qingyan@164.com', '安徽省-宣城市--安徽省宣城市宁国市西津街道大吴路', '1111111', '77', '', '/imgs/suppliers/c7c5e3d9-ef29-4302-99e7-26282c112888.jpeg', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `user_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `user_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户电话',
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户邮箱',
  `register_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户注册时间, 时间戳形式, 单位s',
  `vip_expire_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '用户会员到期时间, 时间戳形式, 单位s',
  `user_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'tpy', '11111', '17857615696', 'tpy@qq.com', '1667232000', '1700982565', '/imgs/avatar/b76391b2-9239-4620-b49c-71f09eea242a.jpeg');
INSERT INTO `users` VALUES (2, 'zhouyujing', '111111', '17811111112', 'zyj@qq.com', '1667232000', '0', '/imgs/avatar/uid-02.jpeg');
INSERT INTO `users` VALUES (3, 'sunzhe', '111111', '17811111113', 'sz@qq.com', '1667232000', '0', '/imgs/avatar/uid-03.jpeg');
INSERT INTO `users` VALUES (4, 'shenhui', '111111', '17811111114', 'sh@qq.com', '1667232000', '0', '/imgs/avatar/uid-04.jpeg');
INSERT INTO `users` VALUES (5, 'dengyongkang', '111111', '17811111115', 'dyk@qq.com', '1667232000', '0', '/imgs/avatar/uid-05.jpeg');
INSERT INTO `users` VALUES (6, 'yangtao', '111111', '17811111116', 'yt@qq.com', '1667232000', '0', '/imgs/avatar/uid-06.jpeg');
INSERT INTO `users` VALUES (8, '荣仙女', '11111111', '15516680261', '1429846771@qq.com', '1669367805', '1700903892', '/imgs/avatar/a5a9e760-5cf9-4f1d-a23c-df0734751463.jpg');
INSERT INTO `users` VALUES (9, 'ttpppyy', '111111', '15869669495', '', '1669448182', '0', '/imgs/avatar/08d819e2-53d0-4a12-a5d8-67487cc6852c.jpeg');

-- ----------------------------
-- Table structure for viporders
-- ----------------------------
DROP TABLE IF EXISTS `viporders`;
CREATE TABLE `viporders`  (
  `id` int(24) NOT NULL AUTO_INCREMENT COMMENT '会员订单ID',
  `order_id` int(24) NOT NULL COMMENT '会员订单号',
  `user_id` int(24) NOT NULL COMMENT '用户ID',
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '付款时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `viporders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of viporders
-- ----------------------------
INSERT INTO `viporders` VALUES (7, 2147483647, 8, '1669367853');
INSERT INTO `viporders` VALUES (8, 2147483647, 1, '1669446521');

SET FOREIGN_KEY_CHECKS = 1;
