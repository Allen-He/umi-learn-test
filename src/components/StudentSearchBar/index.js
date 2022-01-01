import React, { Component } from 'react'
import { Row, Col, Input, Radio, Button } from 'antd'

/** 性别筛选-单选框组-配置数组 */
const options = [
  { label: '不限', value: -1 },
  { label: '男', value: 0 },
  { label: '女', value: 1 },
];

export default class StudentSearchBar extends Component {
  constructor(props) {
    super(props);
    const def = {
      key: "",
      sex: -1
    };
    this.state = Object.assign({}, def, {
      key: props.keyword,
      sex: props.sex
    });
  }

  handleRadioChange = e => {
    this.setState({
      sex: +e.target.value
    })
  }

  handleSearch = () => {
    //抛出事件
    if (this.props.onSearch) {
      this.props.onSearch(this.state);
    }
  }

  render() {
    return (
      <Row justify="start" gutter={12}>
        <Col>
          <Input placeholder="筛选：关键词" value={this.state.key} allowClear
            onChange={e => this.setState({ key: e.target.value })}
          />
        </Col>
        <Col>
          <Radio.Group
            options={options}
            onChange={this.handleRadioChange}
            value={this.state.sex}
            optionType="button"
          />
        </Col>
        <Col>
          <Button type="primary" onClick={this.handleSearch}>查询</Button>
        </Col>
      </Row>
    )
  }
}
