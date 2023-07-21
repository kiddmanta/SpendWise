import { Select } from 'antd'
import React from 'react'
const DateFilter = (props) => {
  return (
    <>
        <div className='d-flex justify-content-start date-filter'>
          <div className='filter-name-div'>
            Filter:
          </div>
          <div className='dropdown-filter'>
            <Select className='dropdown' onSelect={(value)=>props.setTime(value)} defaultValue='30'>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            
          </div>
          
        </div>
    </>
  )
}

export default DateFilter