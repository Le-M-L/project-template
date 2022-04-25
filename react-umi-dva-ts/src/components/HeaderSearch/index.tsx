import React, {useState} from 'react'
import { AutoComplete, Input, Modal, Space } from 'antd';

export default function index() {
  return (
    <div>
        <AutoComplete />
        <Input.Search
          size="large"
          maxLength={40}
          enterButton
        />
    </div>
  )
}
