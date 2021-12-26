import React from 'react'
import style from './index.css'

/**
 * props
 *  - current 当前的页码
 *  - total 总的数据量
 *  - limit 每页的数据量
 *  - panelNum 最多显示的页数项
 * event
 *  - onPageChange(tarPage)
 */
export default function Pager(props) {
  if(props.total === 0) {
    return null;
  }
  const pageNums = getPageNums(props);
  const min = getMinPagePanel(props);
  const max = getMaxPagePanel(min, pageNums, props);
  const panelList = [];
  for (let i = min; i <= max; i++) {
    panelList.push(
      <span
        key={i}
        className={props.current === i ? `${style.item} ${style.curPage}` : `${style.item}`}
        onClick={() => toPage(i, props)}
      >{i}</span>
    );
  }

  return (
    <>
      <span 
        className={props.current === 1 ? `${style.item} ${style.disabled}` : `${style.item}`}
        onClick={() => { toPage(1, props) }}
      >首页</span>
      <span
        className={props.current <= 1 ? `${style.item} ${style.disabled}` : `${style.item}`}
        onClick={() => { toPage(props.current - 1 <= 1 ? 1 : props.current - 1, props) }}
      >上一页</span>
      {/* 页码区域 */}
      {panelList}
      {/* 页码区域 */}
      <span
        className={props.current >= pageNums ? `${style.item} ${style.disabled}` : `${style.item}`}
        onClick={() => { toPage(props.current + 1 >= pageNums ? pageNums : props.current + 1, props) }}
      >下一页</span>
      <span
        className={props.current === pageNums ? `${style.item} ${style.disabled}` : `${style.item}`}
        onClick={() => { toPage(pageNums, props) }}
      >尾页</span>
      <div className={style.pageDesc}>
        <span>{props.current}</span>/<span>{pageNums}</span>
      </div>
    </>
  )
}


/** 获取需要展示的最大页数 */
function getMaxPagePanel(min, pageNums, props) {
  let max = min + props.panelNum - 1;
  if(max > pageNums) {
    max = pageNums;
  }
  return max;
}

/** 获取需要展示的最小页数 */
function getMinPagePanel(props) {
  let min = props.current - Math.floor(props.panelNum / 2);
  if(min < 1) {
    min = 1;
  }
  return min;
}


/** 跳转到指定页数 */
function toPage(tarPage, props) {
  if(props.current === tarPage) {
    return;
  }
  props.onPageChange && props.onPageChange(tarPage);
}

/** 获取当前数据需要的总页数 */
function getPageNums(props) {
  return Math.ceil(props.total / props.limit);
}
