import CustomerList from "./CustomerList";
import useFetch from "./useFetch";

const ViewCustomers = () => {
 const { error , isPending, data: customers } = useFetch('http://localhost:8000/customers')

  return (
    <div className="viewCustomer">
      { error && <div>{ error }</div> }
      { isPending && <div className='text-center'>Loading...</div> }
      { customers && <CustomerList customers={customers} /> }
    </div>
  );
}
 
export default ViewCustomers;