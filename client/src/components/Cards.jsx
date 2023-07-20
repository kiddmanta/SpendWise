import { BiCategoryAlt } from "react-icons/bi"
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { MdOutlineDescription } from 'react-icons/md'
import moment from 'moment'

const Cards = ({ transaction }) => {

  return (
    <>
      <div className="inner-card">
        <div className="d-flex justify-content-between upper-half">
        <h4 className="inner-card-title" style={{color : transaction.Type === 'Income' ? 'green' : 'red'}}>₹{transaction.Amount.toLocaleString('en-IN')}</h4>
          <p className="date-tag">{moment(transaction.Date).format('D MMM YYYY')}</p>
        </div>

        <div className='bottom-half d-flex '>
          <div className="inner-card-content-1 inner-card-content"><BiCategoryAlt fontSize={22} /> {transaction.Category}</div>
          <div className="inner-card-content-2 inner-card-content"><HiOutlineCurrencyRupee className='mx-1' fontSize={22} />{transaction.Type}</div>
          <div className="inner-card-content-3 inner-card-content"><MdOutlineDescription className='mx-1' fontSize={20} />{transaction.Description.substring(0, 20)}{transaction.Description.length > 20 && '......'}</div>
        </div>
      </div>
    </>
  )
}

export default Cards