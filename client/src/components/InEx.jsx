import React from 'react'
import { Card, Col, Row, Statistic } from 'antd';
import {PlusOutlined,MinusOutlined } from '@ant-design/icons'


const InEx = ({allTransactions}) => {


    const totalIncome = allTransactions
    .filter((transaction) => transaction.Type === 'Income')
    .reduce((acc, transaction) => acc + transaction.Amount, 0);

  const totalExpense = allTransactions
    .filter((transaction) => transaction.Type === 'Expense')
    .reduce((acc, transaction) => acc + transaction.Amount, 0);

  

  return (
    <Row gutter={16}>
    <Col span={12}>
      <Card >
        <Statistic
          title="Income"
          value={totalIncome}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<p><PlusOutlined /> ₹</p>}
        />
      </Card>
        </Col>
        <Col span={12}>
        <Card>
            <Statistic
            title="Expenxe"
            value={totalExpense}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<p><MinusOutlined /> ₹</p>}
            />
        </Card>
        </Col>
    </Row>
  )
}

export default InEx