/**
 * Created by PanJiaChen on 16/11/18.
 */
/**
 * 协议类型
 * @param {*} protocol
 */
export function protocol(type) {
  if (!type) {
    return '';
  } else if (type === 0) {
    return 'SSH';
  } else if (type === 0) {
    return '远程桌面';
  }
}
/**
 * 系统类型
 * @param {*} systemType
 */
export function systemType(type) {
  if (!type) {
    return '';
  } else if (type === 0) {
    return 'Linus';
  } else if (type === 0) {
    return 'windows';
  }
}
/**
 * 是否启用
 * 是否在线
 * @param {*} enable
 */
export function enable(type) {
  if (!type) {
    return '';
  } else if (type === 1) {
    return '否';
  } else if (type === 0) {
    return '是';
  }
}
/**
 * 文件大小转换
 * @param {*} time
 * @param {*} cFormat
 */
export function conver(limit) {
  if (!limit) return '';
  let size = '';
  if (limit < 1 * 1024) {
    // 如果小于1KB转化成B
    size = limit.toFixed(2) + 'B';
  } else if (limit < 1 * 1024 * 1024) {
    // 如果小于1MB转化成KB
    size = (limit / 1024).toFixed(2) + 'KB';
  } else if (limit < 1 * 1024 * 1024 * 1024) {
    // 如果小于1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    // 其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }

  const sizestr = size + '';
  const len = sizestr.indexOf('.');
  const dec = sizestr.substr(len + 1, 2);
  if (dec === '00') {
    // 当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}',
  );
}
/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}
/**
 * @param {*} el
 */
export function $(el) {
  console.log(document.querySelector(el));
  return document.querySelector(el);
}

/**
 * 处理url
 */
export function _getHashQueryAll() {
  const queryString = window.location.href.split('?')[1];
  if (queryString) {
    const queryArr = queryString.split('&');
    const queryJson = {};
    for (let i = 0; i < queryArr.length; i++) {
      const name = queryArr[i].split('=')[0];
      const value = queryArr[i].split('=')[1];
      queryJson[name] = value;
    }
    return queryJson;
  } else {
    return {};
  }
}
/**
 * 处理url
 */
export function replaceSearchParams(json) {
  const queryJson = _getHashQueryAll();
  Object.assign(queryJson, json);
  return queryJson;
}
