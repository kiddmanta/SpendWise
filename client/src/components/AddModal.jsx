import React from 'react'
import { Button, Form, Input, Modal, Select} from 'antd'
import TextArea from 'antd/es/input/TextArea'

const AddModal = (props) => {
 
  const handleCan = () => {
    props.handleCancel();
  };
  return (

    

    <>
        <Modal title={<h2 className='text-center m-3'>{props.title}</h2>} open={props.showModal} onCancel={handleCan} footer={false}>

          <div className='m-3'>
            <Form layout='vertical' onFinish={props.handleFinish} initialValues={props.editable}>
              <Form.Item label="Amount" name='Amount'>
                <Input placeholder="Enter Amount of the Transaction" />
              </Form.Item>
              <div className='d-flex'>
                <Form.Item className='income-expense' label="Type" name='Type'>
                  <Select placeholder="Income or Expense">
                    <Select.Option value='Income'>Income</Select.Option>
                    <Select.Option value='Expense'>Expense</Select.Option>
                  </Select>
                </Form.Item>
                <div className='ml-2 form-category'>
                  <Form.Item label="Category" name='Category' >
                    <Select placeholder="Choose Category" >
                      <Select.Option value='Salary'>Salary</Select.Option>
                      <Select.Option value='Bills'>Bills</Select.Option>
                      <Select.Option value='Medical'>Medical</Select.Option>
                      <Select.Option value='Food'>Food</Select.Option>
                      <Select.Option value='Shopping'>Shopping</Select.Option>
                      <Select.Option value='Fees'>Fees</Select.Option>
                      <Select.Option value='Rent'>Rent</Select.Option>
                      <Select.Option value='Other'>Other</Select.Option>
                    </Select>
                  </Form.Item>
                </div>

              </div>
              <div className='d-flex'>
                <Form.Item label="Date" name='Date' className='form-date'>
                  <Input type='date'/>
                </Form.Item>
                <div className='ml-2 form-category'>
                  <Form.Item label="Reference" name='Reference' style={{ width: 250 }}>
                    <Input placeholder="Enter Reference (optional)" />
                  </Form.Item>
                </div>
              </div>

              <Form.Item label="Description" name='Description'>
                <TextArea
                  placeholder="Provide Description"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <div className='d-flex justify-content-end'>
                <Button htmlType='submit' className='save-button'>Save</Button>
              </div>
            </Form>
          </div>
        </Modal>
    </>
  )
}

export default AddModal