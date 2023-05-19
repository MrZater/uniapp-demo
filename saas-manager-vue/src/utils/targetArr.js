import store from '@/store'
let title = store.getters.title
// 综合报表数据
export let synthreportDataArr = [{
  label: 'DAU', // label
  checked: true, // 是否选中
  width: '120', // 宽度
  prop: 'dau', // 属性
  align: 'center', // 对齐方式
  default: true, // 是否为默认
  type: title, // 分组种类
  desc: '每天打开应用的独立用户数',
  sortable: false
},
{
  label: 'ARPDAU',
  checked: true,
  width: '120',
  prop: 'arpu',
  align: 'center',
  default: true,
  type: title,
  desc: 'ARPDAU = 收益 / DAU',
  sortable: false
}, {
  label: 'ARPDEU',
  checked: false,
  width: '120',
  prop: 'arpDeu',
  align: 'center',
  default: false,
  type: title,
  desc: 'ARPDEU = 收益 / DEU',
  sortable: false
},
{
  label: '新用户',
  checked: false,
  width: '120',
  prop: 'newLogin',
  align: 'center',
  default: false,
  type: title,
  desc: '首次使用应用的用户数',
  sortable: false
},
{
  label: '新用户占比',
  checked: false,
  width: '120',
  prop: 'newUserRate',
  align: 'center',
  default: false,
  type: title,
  desc: '首次使用应用的用户占比，计算公式：新增用户/DAU',
  sortable: false
},
{
  label: 'DEU',
  checked: false,
  width: '120',
  prop: 'deu',
  align: 'center',
  default: false,
  type: title,
  desc: '每天观看过广告的独立用户数',
  sortable: false
},
{
  label: '渗透率',
  checked: true,
  width: '120',
  prop: 'permeability',
  align: 'center',
  default: true,
  type: title,
  desc: '每天观看过广告的用户占比，渗透率=DEU/DAU',
  sortable: false
},
{
  label: '展示/DEU',
  checked: false,
  width: '120',
  prop: 'aipu',
  align: 'center',
  default: false,
  type: title,
  desc: '观看过广告的用户人均展示次数',
  sortable: false
},
{
  label: '预估收益',
  checked: true,
  width: '150',
  prop: 'income',
  align: 'center',
  default: true,
  type: title,
  desc: `预估收益=SUM(代码位人工填写的eCPM价格*${title}统计的展示/1000)`,
  sortable: true
},
{
  label: '展示/DAU',
  checked: true,
  width: '120',
  prop: 'aipau',
  align: 'center',
  default: true,
  type: title,
  desc: '人均展示次数',
  sortable: false
},
{
  label: '预估eCPM',
  checked: true,
  width: '150',
  prop: 'estimatedRevenueEcpm',
  align: 'center',
  default: true,
  type: title,
  desc: `（预估收益/${title}统计的展示）*1000`,
  sortable: true
},
{
  label: '流量请求',
  checked: true,
  width: '150',
  prop: 'request',
  align: 'center',
  default: true,
  type: title,
  desc: `应用向${title}发送请求的次数，一次流量请求可能触发多次广告请求`,
  sortable: true
},
{
  label: '流量填充率',
  checked: false,
  width: '120',
  prop: 'requestFilledRate',
  align: 'center',
  default: false,
  type: title,
  desc: `应用向${title}发送请求后，响应成功的占比`,
  sortable: false
},
{
  label: '展示',
  checked: true,
  width: '150',
  prop: 'impress',
  align: 'center',
  default: true,
  type: title,
  desc: `${title}统计的广告曝光次数，由于统计口径差异、网络丢包等因素，${title}统计的展示数据与广告平台展示数据可能存在差异`,
  sortable: true
},
{
  label: '展示率',
  checked: false,
  width: '120',
  prop: 'impressRate',
  align: 'center',
  default: false,
  type: title,
  desc: `${title}收到来自广告平台的广告返回后，展示成功的占比。公式为 展示率 = (展示/填充)`,
  sortable: false
},
{
  label: '点击',
  checked: false,
  width: '120',
  prop: 'click',
  align: 'center',
  default: false,
  type: title,
  desc: `${title}统计的广告点击数，由于部分广告平台不提供点击回调，${title}统计的点击数据与广告平台点击数据可能存在差异`,
  sortable: false
},
{
  label: '点击率',
  checked: false,
  width: '120',
  prop: 'clickRate',
  align: 'center',
  default: false,
  type: title,
  desc: `${title}统计的点击率，点击率=点击数/展示数`,
  sortable: false
},
{
  label: '广告请求',
  checked: false,
  width: '120',
  prop: 'advRequest',
  align: 'center',
  default: false,
  type: title,
  desc: `汇总行表示流量请求，即应用向${title}发起请求的次数；其他行表示广告请求，即${title}向广告平台发起请求的次数`,
  sortable: false
},
{
  label: '广告填充率',
  checked: false,
  width: '120',
  prop: 'advRequestFilledRate',
  align: 'center',
  default: false,
  type: title,
  desc: `汇总行表示流量填充率，即应用向${title}发送请求后返回成功的占比；其余行表示广告填充率，即${title}向广告平台发送请求后返回成功的占比`,
  sortable: false
},
{
  label: '展示Gap',
  checked: false,
  width: '120',
  prop: 'impressionGap',
  align: 'center',
  default: false,
  type: 'GAP',
  desc: `${title}统计展示与广告平台统计展示的差异，公式为 展示Gap=(展示-展示API)/展示API`,
  sortable: false
},
{
  label: '点击Gap',
  checked: false,
  width: '120',
  prop: 'clickGap',
  align: 'center',
  default: false,
  type: 'GAP',
  desc: `${title}统计点击与广告平台统计点击的差异，公式为 点击Gap=(点击-点击API)/点击API`,
  sortable: false
},
{
  label: '收益',
  checked: true,
  width: '120',
  prop: 'unitRevenue',
  align: 'center',
  default: true,
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的收益`,
  sortable: false
},
{
  label: '展示API',
  checked: false,
  width: '120',
  prop: 'unitImpression',
  align: 'center',
  default: false,
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的展示`,
  sortable: false
},
{
  label: 'eCPM API',
  checked: true,
  width: '120',
  prop: 'unitEcpm',
  align: 'center',
  default: true,
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的收益和展示API计算出eCPM API，公式：（收益/展示API）*1000`,
  sortable: false
},
{
  label: '点击API',
  checked: false,
  width: '120',
  prop: 'unitClick',
  align: 'center',
  default: false,
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的点击`,
  sortable: false
},
{
  label: '点击率API',
  checked: false,
  width: '120',
  prop: 'unitCtr',
  align: 'center',
  default: false,
  type: 'API',
  desc: '点击API/展示API',
  sortable: false
},
{
  label: '请求API',
  checked: false,
  width: '120',
  prop: 'unitRequest',
  align: 'center',
  default: false,
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的广告请求数，部分平台不提供此数据`,
  sortable: false
},
{
  label: '填充API',
  checked: false,
  width: '120',
  prop: 'unitFilledRate',
  align: 'center',
  default: false,
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的填充率，部分平台不提供此数据`,
  sortable: false
},
{
  label: '竞价',
  checked: false,
  width: '120',
  prop: 'askPriceRequest',
  align: 'center',
  default: false,
  type: title,
  desc: `${title}服务端向竞价广告源发起的竞价次数；`,
  sortable: false
},
{
  label: '竞价响应率',
  checked: false,
  width: '120',
  prop: 'askPriceFilledRate',
  align: 'center',
  default: false,
  type: title,
  desc: `竞价广告源竞价响应率 = 竞价响应次数 / 竞价次数 * 100%`,
  sortable: false
},
{
  label: '竞价响应eCPM',
  checked: false,
  width: '150',
  prop: 'askPrice',
  align: 'center',
  default: false,
  type: title,
  desc: `竞价广告源在竞价响应时返回的平均eCPM`,
  sortable: false
},
{
  label: '竞价成功率',
  checked: false,
  width: '140',
  prop: 'bidSuccessRate',
  align: 'center',
  default: false,
  type: title,
  desc: `-`,
  sortable: false
}
]

// 聚合管理
export let aggregateDataArr = [
  //  固定顺序
  {
    label: '流量请求', // label
    checked: true, // 是否选中
    width: '120px', // 宽度
    prop: 'advRequest', // 属性
    align: 'center', // 对齐方式
    default: true, // 是否为默认
    type: title, // 分组种类
    desc: `汇总行表示流量请求，即应用向${title}发起请求的次数；其他行表示广告请求，即${title}向广告平台发起请求的次数`

  },
  {
    label: '填充率',
    checked: true,
    width: '100px',
    prop: 'advRequestFilledRate',
    align: 'center',
    default: true,
    type: title,
    desc: `汇总行表示流量填充率，即应用向${title}发送请求后返回成功的占比；其余行表示广告填充率，即${title}向广告平台发送请求后返回成功的占比`
  },
  {
    label: '填充耗时',
    checked: true,
    width: '120px',
    prop: 'advResponseTime',
    align: 'center',
    default: true,
    type: title,
    desc: `${title} SDK向广告源发送请求到填充成功的平均耗时`
  },
  {
    label: '展示',
    checked: true,
    width: '100px',
    prop: 'impress',
    align: 'center',
    default: true,
    type: title,
    desc: `${title}统计的广告曝光次数，由于统计口径差异、网络丢包等因素，${title}统计的展示数据与广告平台展示数据可能存在差异`
  },
  {
    label: '展示率',
    checked: true,
    width: '100px',
    prop: 'impressRate',
    align: 'center',
    default: true,
    type: title,
    desc: `${title}收到来自广告平台的广告返回后，展示成功的占比。公式为 展示率 = (展示/填充)`
  },
  {
    label: '预估收益',
    checked: true,
    width: '120px',
    prop: 'income',
    align: 'center',
    default: true,
    type: title,
    desc: `预估收益=SUM(代码位人工填写的eCPM价格*${title}统计的展示/1000)`
  },
  {
    label: '收益',
    checked: true,
    width: '100px',
    prop: 'unitRevenue',
    align: 'center',
    default: true,
    type: 'API',
    desc: `${title}通过Reporting API向广告平台拉取到的收益`
  },
  {
    label: 'eCPM',
    checked: true,
    width: '100px',
    prop: 'unitEcpm',
    align: 'center',
    default: true,
    type: 'API',
    desc: `${title}通过Reporting API向广告平台拉取到的收益和展示API计算出eCPM API，公式：（收益/展示API）*1000`
  },
  // 非固定顺序
  {
    label: '点击',
    checked: false,
    width: '100px',
    prop: 'click',
    align: 'center',
    default: false,
    type: title,
    desc: `${title}统计的广告点击数，由于部分广告平台不提供点击回调，${title}统计的点击数据与广告平台点击数据可能存在差异`
  },
  {
    label: '点击率',
    checked: false,
    width: '100px',
    prop: 'clickRate',
    align: 'center',
    default: false,
    type: title,
    desc: `${title}统计的点击率，点击率=点击数/展示数`
  },
  {
    label: '请求API',
    checked: false,
    width: '100px',
    prop: 'unitRequest',
    align: 'center',
    default: false,
    type: 'API',
    desc: `${title}通过Reporting API向广告平台拉取到的广告请求数，部分平台不提供此数据`
  },
  {
    label: '填充率API',
    checked: false,
    width: '120px',
    prop: 'unitFilledRate',
    align: 'center',
    default: false,
    type: 'API',
    desc: `${title}通过Reporting API向广告平台拉取到的填充率，部分平台不提供此数据`
  },
  {
    label: '展示API',
    checked: false,
    width: '100px',
    prop: 'unitImpression',
    align: 'center',
    default: false,
    type: 'API',
    desc: `${title}通过Reporting API向广告平台拉取到的展示`
  },
  {
    label: '点击API',
    checked: false,
    width: '100px',
    prop: 'unitClick',
    align: 'center',
    default: false,
    type: 'API',
    desc: `${title}通过Reporting API向广告平台拉取到的点击`
  },
  {
    label: '点击率API',
    checked: false,
    width: '120px',
    prop: 'unitCtr',
    align: 'center',
    default: false,
    type: 'API',
    desc: '点击API/展示API'
  },
  {
    label: '点击Gap',
    checked: false,
    width: '120px',
    prop: 'clickGap',
    align: 'center',
    default: false,
    type: 'GAP',
    desc: `${title}统计点击与广告平台统计点击的差异，公式为 点击Gap=(点击-点击API)/点击API`
  },
  {
    label: '展示Gap',
    checked: false,
    width: '120px',
    prop: 'impressionGap',
    align: 'center',
    default: false,
    type: 'GAP',
    desc: `${title}统计展示与广告平台统计展示的差异，公式为 展示Gap=(展示-展示API)/展示API`
  },
  {
    label: '展示占比',
    checked: false,
    width: '120px',
    prop: 'display',
    align: 'center',
    default: false,
    type: title,
    desc: '-'
  },
  {
    label: '预估收益占比',
    checked: false,
    width: '150px',
    prop: 'revenuePercentage',
    align: 'center',
    default: false,
    type: title,
    desc: '-'
  },
  {
    label: '竞价',
    checked: false,
    width: '120',
    prop: 'askPriceRequest',
    align: 'center',
    default: false,
    type: title,
    desc: `${title}服务端向竞价广告源发起的竞价次数；`
  },
  {
    label: '竞价响应率',
    checked: false,
    width: '120',
    prop: 'askPriceFilledRate',
    align: 'center',
    default: false,
    type: title,
    desc: `竞价广告源竞价响应率 = 竞价响应次数 / 竞价次数 * 100%`
  },
  {
    label: '竞价响应eCPM',
    checked: false,
    width: '150',
    prop: 'askPrice',
    align: 'center',
    default: false,
    type: title,
    desc: `竞价广告源在竞价响应时返回的平均eCPM`
  },
  {
    label: '竞价成功率',
    checked: false,
    width: '140',
    prop: 'bidSuccessRate',
    align: 'center',
    default: false,
    type: title,
    desc: `-`
  },
  {
    label: '展请率',
    checked: false,
    width: '140',
    prop: 'impressRequestRate',
    align: 'center',
    default: false,
    type: title,
    desc: `展示 / 流量请求`,
    sortable: false
  }
]
// 广告位数据
export let placeDataArr = [{
  prop: 'unitRevenue',
  checked: true,
  label: '收益',
  align: 'center',
  width: '100',
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的收益`,
  default: true
},
{
  prop: 'unitEcpm',
  checked: true,
  label: 'eCPM',
  align: 'center',
  width: '120',
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的收益和展示API计算出eCPM API，公式：（收益/展示API）*1000`,
  default: true
},
{
  prop: 'income',
  checked: true,
  label: '预估收益',
  align: 'center',
  width: '140',
  type: title,
  desc: `预估收益=SUM(代码位人工填写的eCPM价格*${title}统计的展示/1000)`,
  default: true
},
{
  prop: 'estimatedRevenueEcpm',
  checked: false,
  label: '预估eCPM',
  align: 'center',
  width: '140',
  type: title,
  desc: `（预估收益/${title}统计的展示）*1000`,
  default: false
},

{
  prop: 'dau',
  checked: false,
  label: 'DAU',
  align: 'center',
  width: '120',
  type: title,
  desc: '每天打开应用的独立用户数',
  default: false
},
{
  prop: 'arpu',
  checked: false,
  label: 'ARPDAU',
  align: 'center',
  width: '140',
  type: title,
  desc: 'ARPDAU = 收益 / DAU',
  default: false
},
{
  prop: 'arpDeu',
  checked: false,
  label: 'ARPDEU',
  width: '140',
  align: 'center',
  default: false,
  type: title,
  desc: 'ARPDEU = 收益 / DEU'
},
{
  prop: 'deu',
  checked: true,
  label: 'DEU',
  align: 'center',
  width: '120',
  type: title,
  desc: '每天观看过广告的独立用户数',
  default: true
},
{
  prop: 'permeability',
  checked: true,
  label: '渗透率',
  align: 'center',
  width: '120',
  type: title,
  desc: '每天观看过广告的用户占比，渗透率=DEU/DAU',
  default: true
},

{
  prop: 'request',
  checked: true,
  label: '流量请求',
  align: 'center',
  width: '140',
  type: title,
  desc: `应用向${title}发送请求的次数，一次流量请求可能触发多次广告请求`,
  default: true
},
{
  prop: 'requestFilledRate',
  checked: true,
  label: '流量填充率',
  align: 'center',
  width: '140',
  type: title,
  desc: `应用向${title}发送请求后，响应成功的占比`,
  default: true
},
{
  prop: 'impressRate',
  checked: true,
  label: '展示率',
  align: 'center',
  width: '140',
  type: title,
  desc: `${title}收到来自广告平台的广告返回后，展示成功的占比。公式为 展示率 = (展示/填充)`,
  default: true
},
{
  prop: 'aipu',
  checked: true,
  label: '展示/DEU',
  align: 'center',
  width: '140',
  type: title,
  desc: '观看过广告的用户人均展示次数',
  default: true
},
{
  prop: 'aipau',
  checked: false,
  label: '展示/DAU',
  align: 'center',
  width: '140',
  type: title,
  desc: '人均展示次数',
  default: false
},

{
  prop: 'advRequest',
  checked: false,
  label: '广告请求',
  align: 'center',
  width: '140',
  type: title,
  desc: `${title}向广告平台发送请求的次数。一次流量请求可能触发多次广告请求`,
  default: false
},
{
  prop: 'advRequestFilledRate',
  checked: false,
  label: '广告填充率',
  align: 'center',
  width: '140',
  type: title,
  desc: `${title}向广告平台发送请求后，返回成功的占比`,
  default: false
},
{
  prop: 'impress',
  checked: false,
  label: '展示',
  align: 'center',
  width: '120',
  type: title,
  desc: `${title}统计的广告曝光次数，由于统计口径差异、网络丢包等因素，${title}统计的展示数据与广告平台展示数据可能存在差异`,
  default: false
},
{
  prop: 'click',
  checked: false,
  label: '点击',
  align: 'center',
  width: '120',
  type: title,
  desc: `${title}统计的广告点击数，由于部分广告平台不提供点击回调，${title}统计的点击数据与广告平台点击数据可能存在差异`,
  default: false
},
{
  prop: 'clickRate',
  checked: false,
  label: '点击率',
  align: 'center',
  width: '120',
  type: title,
  desc: `${title}统计的点击率，点击率=点击数/展示数`,
  default: false
},
{
  prop: 'unitRequest',
  checked: false,
  label: '请求API',
  align: 'center',
  width: '120',
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的广告请求数，部分平台不提供此数据`,
  default: false
},
{
  prop: 'unitImpression',
  checked: false,
  label: '展示API',
  align: 'center',
  width: '120',
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的展示`,
  default: false
},
{
  prop: 'unitClick',
  checked: false,
  label: '点击API',
  align: 'center',
  width: '120',
  type: 'API',
  desc: `${title}通过Reporting API向广告平台拉取到的点击`,
  default: false
},
{
  prop: 'unitCtr',
  checked: false,
  label: '点击率API',
  align: 'center',
  width: '140',
  type: 'API',
  desc: '点击API/展示API',
  default: false
},
{
  prop: 'impressionGap',
  checked: false,
  label: '展示Gap',
  align: 'center',
  width: '140',
  type: 'GAP',
  desc: `${title}统计展示与广告平台统计展示的差异，公式为 展示Gap=(展示-展示API)/展示API`,
  default: false
},
{
  prop: 'clickGap',
  checked: false,
  label: '点击Gap',
  align: 'center',
  width: '140',
  type: 'GAP',
  desc: `${title}统计点击与广告平台统计点击的差异，公式为 点击Gap=(点击-点击API)/点击API`,
  default: false

}
]