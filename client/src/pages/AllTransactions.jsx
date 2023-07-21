
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { message, DatePicker } from 'antd';
import TransactionTable from '../components/TransactionTable';
import AddModal from '../components/AddModal';
import DeleteModal from '../components/DeleteModal';
import DateFilter from '../components/DateFilter';


const { RangePicker } = DatePicker;

const AllTransactions = () => {
  
  const [allTransaction,setAllTransaction] = useState([]);
  const [editable,setEditable] = useState(null);
  const [deleted,setDeleted] = useState(null);
  const [showModal,setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState(Date.now())
  const [time,setTime] = useState('30');
  const [showConfirmModal,setConfirmModal] = useState(false);
  const [selectedDate,setSelectedDate] = useState([])
  
  

  
  const handleEdit = (records)=>{
    setEditable(records);
    console.log(records);
    setShowModal(true);
  }

  const handleCancel = () => {
    setEditable(null);
    setShowModal(false);
    
  }

  const handleDelete = async ()=>{
    try{
      await axios.post('http://localhost:8080/api/v1/transactions/delete-transaction',{transactionID:deleted._id,withCredentials:true});
      setDeleted(null);
      setConfirmModal(false);
      message.success("Transaction Deleted Successfully");
    }
    catch(err){
      message.error("Transaction not Delted, try again later.")
    }
  }


  const handleConfimation = (record)=>{
    setDeleted(record);
    setConfirmModal(true);
  }
  
  useEffect(()=>{
    const getAllTransaction = async ()=>{
      try{
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.post("http://localhost:8080/api/v1/transactions/get-transactions",{userID : user.userID,time,selectedDate,withCredentials:true});
        setAllTransaction(response.data);
      }
      catch(err){
        console.log(err);
        message.error("Issue while fetching the Transaction");
      }
    }
    getAllTransaction();
  },[modalKey,deleted,time,selectedDate])
  
  useEffect(() => {
    setModalKey(Date.now()); 
  }, [editable]);

  const handleFinish =async (values)=>{
    try{
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post('http://localhost:8080/api/v1/transactions/edit-transaction',{transactionID:editable._id,
      payload:{
        ...values,
        userID:user.userID
      }
      ,withCredentials:true});
      setEditable(null);
      message.success("Transaction Updated Successfully");
      setShowModal(false);
    }
    catch(err){
      message.error("Transaction not Updated, try again later.")
    }
    
  }
  

  const handleDelteCancel = ()=>{
    setConfirmModal(false);
  }

  

  return (
    <>
        <Layout>
            <h1 className='text-center m-5' style={{textShadow: '0.5px 0 3px gray'}}>Transactions</h1>
            
            <DateFilter
            
              setTime={setTime}
            />
            {time === 'custom' && <div className='range-picker-div'><RangePicker className='range-picker' values={selectedDate} onChange={(values) => setSelectedDate(values)}/></div>}
            <div  className="table-body">
              <TransactionTable 
                all={true}
                transactionArray={allTransaction}
                handleEdit={handleEdit}
                handleDelete={handleConfimation}
              />
            </div>
            <AddModal 
              key={modalKey}
              title="Edit Transaction"
              showModal={showModal}
              handleCancel={handleCancel}
              editable={editable}
              handleFinish={handleFinish}
            />
            <DeleteModal
            
              showConfirmModal={showConfirmModal}
              handleDelete={handleDelete}
              handleDelteCancel={handleDelteCancel}
            />
        </Layout>
    </>
  )
}



export default AllTransactions