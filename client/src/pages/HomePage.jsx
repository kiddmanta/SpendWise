import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Select, Spin, message } from 'antd'
import axios from 'axios';
import Cards from '../components/Cards';
import AddModal from "../components/AddModal"
import PieChart from '../components/PieChart';
import InEx from '../components/InEx';
import { AiFillPlusCircle } from 'react-icons/ai'
import { DatePicker } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;

const HomePage = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [modalKey, setModalKey] = useState(Date.now())
  const [time, setTime] = useState('365');
  const [recentTransactions, setRecentTransaction] = useState([]);
  const [sortedTransactions, setSortedTransaction] = useState([]);
  const initialStartDate = moment().subtract(time, 'days');
  const initialEndDate = moment();
  const [selectedDate, setSelectedDate] = useState([
    initialStartDate, initialEndDate
  ]);




  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const response = await axios.post("http://localhost:8080/api/v1/transactions/get-transactions", { userID: user.userID, time, selectedDate, withCredentials: true });
        setAllTransaction(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
        message.error("Issue while fetching the Transaction");
      }
    };

    fetchTransactions();
  }, [time, selectedDate]);

  useEffect(() => {
    setSortedTransaction(allTransaction.sort((a, b) => new Date(b.Date) - new Date(a.Date)));
    setRecentTransaction(allTransaction.slice(0, 5));

  }, [allTransaction, showModal]);

  useEffect(() => {
    setModalKey(Date.now());
  }, [showModal]);

  const handleCancel = () => {
    setShowModal(false);
  }

  const handleFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      await axios.post('http://localhost:8080/api/v1/transactions/add-transaction', { ...values, userID: user.userID, withCredentials: true });
      setLoading(false);
      message.success("Transaction added Successfully");
      const response = await axios.post("http://localhost:8080/api/v1/transactions/get-transactions", { userID: user.userID, time, selectedDate, withCredentials: true });
      setAllTransaction(response.data);
      setShowModal(false);
    }
    catch (err) {
      setLoading(false);
      message.error("Transaction not added, try again later.")
    }

  }

  return (
    <>

      <Layout>
        <div className='d-flex justify-content-between my-2 heading-class'>
          <div className='mx-5 my-4' >
            <h1 className='dashboard-text' style={{ textShadow: '0.5px 0 4px gray' }}>Dashboard</h1>
          </div>
          <div className='mx-5 my-4'>
            <div className='d-flex add-button'>
              <p style={{ width: '5rem', fontWeight: '500', textShadow: '0.5px 0 0.5px gray' }} className='m-2 text-center'>Add new Transaction</p>
              <button style={{ background: 'none', border: 'none' }}><AiFillPlusCircle size={60} color='#3F2E3E' onClick={() => setShowModal(true)} /></button>
            </div>

          </div>
        </div>

        <div className='d-flex justify-content-around content-box-homepage'>
          <div className='recent-transaction'>
            <h2 className='m-5 text-center' style={{ textShadow: '0.5px 0 2px gray' }}>Recent Transactions</h2>
            {recentTransactions.length !== 0 ? recentTransactions.map((transaction) => (
              <Cards key={transaction._id} transaction={transaction} />
            )) : <h4 className='text-center no-transaction'>No Transactions in the selected dates.</h4>}
          </div>
          <div className='analytics'>
            <div className='d-flex heading-analytics-div'>
              <div className='analytics-heading'>
                <h2 className='my-5 text-center analytics-h' style={{ textShadow: '0.5px 0 2px gray' }}>Analytics</h2>
              </div>

              <div className='analytics-filter'>
                <p className='filter-name'>Filter</p>
                <Select className='analytics-filter-ac' onChange={(value) => setTime(value)} defaultValue='365'>
                  <Select.Option value="7">Last 1 Week</Select.Option>
                  <Select.Option value="30">Last 1 Month</Select.Option>
                  <Select.Option value="365">Last 1 Year</Select.Option>
                  <Select.Option value="custom">Custom</Select.Option>
                </Select>
                {time === 'custom' && <div><RangePicker onChange={(value) => setSelectedDate(value)} />
                </div>}
              </div>
            </div>

            <div className='in-ex'>
              <InEx
                allTransactions={allTransaction}
              />
            </div>
            <h2 className='m-5 text-center' style={{ textShadow: '0.5px 0 2px gray' }}>Spend Analysis</h2>
            <PieChart
              allTransaction={allTransaction}
            />


          </div>
        </div>




      </Layout>
      <AddModal
        key={modalKey}
        title="Add Transaction"
        showModal={showModal}
        handleCancel={handleCancel}
        handleFinish={handleFinish}
        editable={null}
      />
    </>
  )
}

export default HomePage