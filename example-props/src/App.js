
import './App.css';
import ProductList from './component/ProductList';

function App() {
  let data= ["laptop", "điện thoại", "phụ kiện"]
  return (
    <ProductList list={data} />
  );
}

export default App;
