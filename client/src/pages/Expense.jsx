import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { DatePicker, message } from 'antd'
import TransactionTable from '../components/TransactionTable'
import axios from 'axios'
import DateFilter from '../components/DateFilter'


const { RangePicker } = DatePicker;

const Expense = () => {

  const [transaction,setTransaction] = useState([]);
  const [time,setTime] = useState('30');
  const [selectedDate,setSelectedDate] = useState([])


  

  useEffect(()=>{
    const getAllTransaction = async ()=>{
      try{
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.post("http://localhost:8080/api/v1/transactions/get-type-transactions",{userID : user.userID,Type:"Expense",time,selectedDate,withCredentials:true});
        setTransaction(response.data);
        console.log(response.data);
      }
      catch(err){
        console.log(err);
        message.error("Issue while fetching the Transaction");
      }
    }
    getAllTransaction();
  },[time,selectedDate])

  return (
    <>
        <Layout>
            <h1 className='text-center m-5' style={{textShadow: '0.5px 0 3px gray'}}>Expenses</h1>
            <DateFilter
            
              setTime={setTime}
            />
            {time === 'custom' && <div className='range-picker-div'><RangePicker className='range-picker' values={selectedDate} onChange={(values) => setSelectedDate(values)}/></div>}
            <div  className="table-body">
              <TransactionTable
                all={false}
                transactionArray={transaction}
              />
            </div>
        </Layout>
    </>
  )
}

export default Expense