import { Table} from 'antd'
import React from 'react'
import {EditOutlined,DeleteOutlined} from "@ant-design/icons"
import moment from 'moment'

const TransactionTable = (props) => {

    const columns1 = [
        {
          title:"Date",
          dataIndex : "Date",
          render : (text) => <span>{moment(text).format('D MMM YYYY')}</span>
        },
        {
          title:"Amount",
          dataIndex : "Amount",
          render : (text) => <span>{text.toLocaleString('en-IN')}</span>
        },
    
        {
          title:"Type",
          dataIndex : "Type",
        },
    
        {
          title:"Category",
          dataIndex : "Category",
        },
        
        {
          title:"Reference",
          dataIndex : "Reference",
        },
        {
          title:"Description",
          dataIndex : "Description",
        },
        {
            title:"Action",
            render : (text,record)=>(
                <div>
                    <EditOutlined onClick={()=>props.handleEdit(record)} style={{fontSize:20}}/>
                    <DeleteOutlined onClick={()=>props.handleDelete(record)} className='mx-2' style={{fontSize:20}}/>
                </div>
            )
        }
    ]
    


    const columns2 = [
      {
        title:"Date",
        dataIndex : "Date",
        render : (text) => <span>{moment(text).format('D MMM YYYY')}</span>
      },
      {
        title:"Amount",
        dataIndex : "Amount",
        render : (text) => <span>{text.toLocaleString('en-IN')}</span>
      },
  
      {
        title:"Type",
        dataIndex : "Type",
      },
  
      {
        title:"Category",
        dataIndex : "Category",
      },
      
      {
        title:"Reference",
        dataIndex : "Reference",
      },
      {
        title:"Description",
        dataIndex : "Description",
      }
  ]


  return (
    <Table columns={props.all ? columns1 : columns2} dataSource={props.transactionArray} rowKey={(record) => record._id} style={{backgroundColor:'#f5f4eb',borderRadius:'10px'}}/>
  )
}

export default TransactionTable