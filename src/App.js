import { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

const App = ()=>{
  const useStyles = makeStyles((theme) => ({
    textField:{
      margin:"10px 0",
      width:"30%",
      height:"50px"
    },
    app:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column"
    },
    button:{
      margin:"10px 0",
    },
    heading:{
      textShadow:"1px 1px #ff0000",
    },
table:{
  width:"650px",
  backgroundColor: "#B8DFD8",
}
  }));
  const [products,setProducts]=useState([]);
  const[name,setName] = useState("");
  const[quantity,setQuantity] = useState("");
  const[price,setPrice] = useState("");
  const[image,setImage] = useState("");
  const[isValid,setIsValid] = useState(false);
  const classes = useStyles();

const addProductHandler = () =>{
  const oldProducts = [...products];
  const newProduct = {
    name,
    quantity,
    price,
    image,
    id:Math.floor(Math.random()*1000)
  }
  const newProducts = oldProducts.concat(newProduct);
if(name === ''||quantity ===''||price===''||image===''){
  alert("fields cannot be blank!");
  setIsValid(true);
}else{
  const newProducts = oldProducts.concat(newProduct);
  setIsValid(false);
}

  setProducts(newProducts);

  localStorage.setItem("products",JSON.stringify(newProducts));

  setName("");
  setQuantity("");
  setPrice("");
  setImage("");
};
const deleteProductHandler = (id) =>{
  const oldProducts = [...products];
  const newProducts = oldProducts.filter((product)=>product.id!==id);
  setProducts(newProducts);

  
  localStorage.setItem("products",JSON.stringify(newProducts));
  const localStorageProducts = JSON.parse(localStorage.getItem("products"));
}

useEffect(()=>{
const localStorageProducts = JSON.parse(localStorage.getItem("products"));
setProducts(localStorageProducts)
},[setProducts]);

  return(
    <div className={classes.app}>
      <h1 className={classes.heading}>Product form</h1>
      
      <TextField id="outlined-basic" label="Product Name" variant="outlined" className={classes.textField} onChange = {(e)=>setName(e.target.value)} value = {name} error = {isValid}/>
      <TextField id="outlined-basic" label="Product Quantity" variant="outlined" className={classes.textField} onChange = {(e)=>setQuantity(e.target.value)} value = {quantity} error = {isValid}/>
      <TextField id="outlined-basic" label="Product Price" variant="outlined" className={classes.textField} onChange = {(e)=>setPrice(e.target.value)} value = {price} error = {isValid}/>
      <input type='file' onChange = {(e)=>setImage(e.target.value)} value = {image}/>
      <Button variant="contained" color="secondary" className={classes.button} onClick = {addProductHandler} >
        Add to local Storage
      </Button>
      
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Product Name</strong></TableCell>
            <TableCell align="center"><strong>Product Quantity</strong></TableCell>
            <TableCell align="center"><strong>Product Price</strong></TableCell>
            <TableCell align="center"><strong>Image</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {products.map((product,index)=>(
         <TableRow key ={index}  onClick = {()=>deleteProductHandler(product.id)}>
        <TableCell align="center">{product.name}</TableCell>
        <TableCell align="center">{product.quantity}</TableCell>
        <TableCell align="center">{product.price}</TableCell>
        <TableCell align="center">{product.image}</TableCell>
        <TableCell align="center"><button><DeleteIcon/></button></TableCell>
        </TableRow>
         ))}
        </TableBody>
        
        
      </Table>
    </div>
  );
}
export default App;