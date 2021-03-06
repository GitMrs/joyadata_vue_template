export default [
  {
    url: '/zj/v1/report/task_download_files',
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: 'success',
        page: 0,
        pager: 10,
        total: 1,
        result: [
          {
            id: '548606440236535808',
            project: 'zj',
            createTime: 1610964434000,
            lastModificationTime: 1610964434000,
            name: '91110000710933809D_0034_1002_20210111231520',
            fileKey: '00c67a68ddd34ef78dddb5469559e7ce',
            fileType: 'zip',
            fileSize: 442368,
            indxCount: 352,
            dataReportSysCount: 3,
            taskId: '548606439095685120',
          },
        ],
      };
    },
  },
  {
    url: '/zj/v1/report/task_indxs/dict/',
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: 'success',
        result: {
          '548606441197031424': '医疗医药应急保障体系信息平台',
          '548606575003717632': '第三方服务机构管理应用',
          '548606522012880896': '国企改革在线督办应用',
        },
      };
    },
  },
  {
    url: '/zj/v1/report/task_indx_infos/',
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: 'success',
        page: 0,
        pager: 10,
        total: 352,
        result: [
          {
            id: '548606442828615680',
            project: 'zj',
            createTime: 1610964434000,
            lastModificationTime: 1610964435000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16663',
            indxNm: '公司代码',
            indexNotes: 'COMP_ID',
            indexDesc: '必填,公司唯一代码',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
          {
            id: '548606443503898624',
            project: 'zj',
            createTime: 1610964434000,
            lastModificationTime: 1610964435000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16664',
            indxNm: '公司名称',
            indexNotes: 'COMP_NAME',
            indexDesc: '必填,采购主体的法人机构名称 如：华润广东医药有限公司',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
          {
            id: '548606444204347392',
            project: 'zj',
            createTime: 1610964435000,
            lastModificationTime: 1610964435000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16665',
            indxNm: '仓库代码',
            indexNotes: 'WAREHOUSE_ID',
            indexDesc: '必填,仓库唯一代码',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
          {
            id: '548606444841881600',
            project: 'zj',
            createTime: 1610964435000,
            lastModificationTime: 1610964435000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16666',
            indxNm: '仓库名称',
            indexNotes: 'WAREHOUSE_NAME',
            indexDesc: '必填',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
          {
            id: '548606445433278464',
            project: 'zj',
            createTime: 1610964435000,
            lastModificationTime: 1610964435000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16667',
            indxNm: '仓库地址',
            indexNotes: 'WAREHOUSE_ADDRESS',
            indexDesc:
              '必填,仓库所在地址包含省市区县门牌号 如：广西南宁沿海经济走廊开发区建业路**号',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
          {
            id: '548606446020481024',
            project: 'zj',
            createTime: 1610964435000,
            lastModificationTime: 1610964435000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16668',
            indxNm: '仓库所在省',
            indexNotes: 'WAREHOUSE_PROVINCE',
            indexDesc: '非必填,仓库所在省 如：上海市',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
          {
            id: '548606446733512704',
            project: 'zj',
            createTime: 1610964435000,
            lastModificationTime: 1610964436000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16669',
            indxNm: '仓库所在市',
            indexNotes: 'WAREHOUSE_CITY',
            indexDesc: '非必填,仓库所在市 如：上海市',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
          {
            id: '548606447433961472',
            project: 'zj',
            createTime: 1610964435000,
            lastModificationTime: 1610964436000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16670',
            indxNm: '仓库所在区/县',
            indexNotes: 'WAREHOUSE_COUNTY',
            indexDesc: '非必填,仓库所在区/县 如：浦东新区',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
          {
            id: '548606449162014720',
            project: 'zj',
            createTime: 1610964436000,
            lastModificationTime: 1610964436000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16671',
            indxNm: '商品编码',
            indexNotes: 'PRODUCT_ID',
            indexDesc: '必填,企业内部药品编码 如：CC000014257',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
          {
            id: '548606449661136896',
            project: 'zj',
            createTime: 1610964436000,
            lastModificationTime: 1610964436000,
            infoResId: '3031271122',
            infoResName: '采购数据采集信息',
            indxId: '16672',
            indxNm: '通用名',
            indexNotes: 'GENERAL_PRODUCT_NAME',
            indexDesc: '必填,药品通用名称 如：布洛芬软胶囊',
            clectPrd: '每日',
            clectRange:
              '中国通用技术（集团）控股有限责任公司、华润(集团)有限公司、中国医药集团有限公司、上海市国有资产监督管理委员会',
            dataRange: '',
            isFile: '否',
            infoSysSource: '医疗医药应急保障体系信息平台',
            taskIndxId: '548606441197031424',
            taskId: '548606439095685120',
          },
        ],
      };
    },
  },
  {
    url: '/zj/v1/report/task_upload_files/',
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: 'success',
        page: 0,
        pager: 10,
        total: 1,
        result: [
          {
            id: '1',
            project: 'zj',
            createTime: 1611131723000,
            lastModificationTime: 1611131726000,
            taskId: '548606439095685120',
            name: '91110000710933809D_0034_1002_20210111231520',
            state: '未上报',
            mark: 0,
          },
        ],
      };
    },
  },
  {
    url: '/zj/v1/report/task_indx_datas/',
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: 'success',
        page: 0,
        pager: 10,
        total: 1,
        result: [
          {
            id: '548606442828615680',
            project: 'zj',
            createTime: 1611282174000,
            lastModificationTime: 1611283261000,
            taskId: '548606439095685120',
            corpCd: '1',
            corpNm: '1',
            infoResId: '1',
            indxId: '1',
            indxNm: '1',
            taskIndxId: '548606441197031424',
          },
        ],
      };
    },
  },
];
