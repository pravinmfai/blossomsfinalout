import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Typography,
  Toolbar,
  CircularProgress,
} from '@mui/material';
import sareeImg from "../assest/saree.png";
import TuneIcon from '@mui/icons-material/Tune';
import Grid from '@mui/material/Grid2';
import '../styles/orderList.css';  
import CircleIcon from '@mui/icons-material/Circle';


const orderFilters = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Pending',
    label: 'Confirmed',
  },
  {
    value: 'Shipped',
    label: 'On the way',
  },
    {
      value: 'Delivered',
      label: 'Delivered',
    },
];

const OrdersListing = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true); 

  



  useEffect(() => {
    const userId = localStorage.getItem("userId");
    
    const fetchUserEmail = async () => {
      try {
        if (userId) {
          const userResponse = await fetch(`http://localhost:5000/api/auth/getuser/${userId}`);
          const userData = await userResponse.json();
          setUserEmail(userData.email); // Assuming the email is in userData.email
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []); // Empty dependency array ensures it runs once on component mount

  // Fetch the orders when the user email is available
  useEffect(() => {
    const fetchOrders = async () => {
      if (userEmail) {
        try {
          const ordersResponse = await fetch('https://backend-blssm-1.onrender.com/api/allorders');
          const ordersData = await ordersResponse.json();

          // Filter orders based on the user's email
          const userOrders = ordersData.filter(order => order.secondaryInfo.customerEmail === userEmail);
          setFilteredOrders(userOrders);
          setOrdersData(userOrders);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setLoading(false); 
        }
      }
    };

    fetchOrders();
  }, [userEmail]); 

  const handleFilterClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    const filtered = filteredOrders.filter(order =>
      order.primaryInfo.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

 const applyFilters = () => {
  console.log(statusFilter)
  const filtered = ordersData.filter(order => {
    // If the search term is empty and the status filter is "All", return true for all orders
    if (statusFilter === 'All' || statusFilter === "") {
      return true;
    }

    // Check if status filter is not 'All' and matches shippingStatus
    const statusMatch = statusFilter === 'All' || order.primaryInfo.shippingStatus === statusFilter;

    // Check if the product name matches the search term
    const nameMatch = order.primaryInfo.productName.toLowerCase().includes(searchTerm.toLowerCase());

    // Both conditions should be true to include the order in the filtered list

    console.log(searchTerm,statusFilter,statusMatch,nameMatch)
    return statusMatch && nameMatch;
  });

  setFilteredOrders(filtered);
  handleClose();
};

  return (
    <div className="container">
     
        <Toolbar className="app-bar">
          <Button
            onClick={handleFilterClick}
            value={statusFilter}
         
            startIcon={<TuneIcon style={{ fontSize: 25 }} />}
            className="filter-button"
          />
          <TextField
            variant="outlined"
            label="Search"
            placeholder='Search “Blue Saree”'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ marginLeft: '20px', flexGrow: 0.9 }}
            className='searchbar-orders'
          />
          <Button variant="contained" onClick={handleSearch} className="search-button"   style={{ marginLeft: '20px',flexGrow: .1}}>
            Search
          </Button>
        </Toolbar>
    

        <Grid container spacing={2} className="grid-container">
        {loading ? ( // Display loading indicator while fetching data
          <Grid item xs={12} className="grid-item">
            <Card className="card" style={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                <CircularProgress /> 
                <Typography variant="h6">Loading orders...</Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <Grid item xs={12} key={order._id} className="grid-item">
              <Card className="card">
                <CardContent className='order-content'>
                  <div className='order-img-content'>

                    {/* <img src={sareeImg} alt={order.primaryInfo.productName} className="card-image" /> */}
                    <img src= {`https://backend-blssm-1.onrender.com/${order.primaryInfo.imageUrl}`}  alt={order.primaryInfo.productName} className="card-image" />
                    <div className="details">
                      <div className='order-text-container'>
                        <Typography variant="h6">{order.primaryInfo.productName}</Typography>
                        <Typography color="textSecondary">Quantity: {order.primaryInfo.quantity}</Typography>
                      </div>
                      <CardContent className="price-content">
                        <Typography variant="h5" className="price">₹{order.primaryInfo.price}</Typography>
                      </CardContent>
                    </div>
                  </div>
                </CardContent>
                <CardContent className="status-content">
                  {order.primaryInfo.shippingStatus === 'Pending' && (
                    <>
                      <Typography variant="h5" className='main-order-status'>
                        <CircleIcon style={{ color: "#57E56D", marginRight: ".5rem" }} />
                        Confirmed
                      </Typography>
                      <Typography variant="body2">Your product will be shipped soon, thanks for your patience.</Typography>
                    </>
                  )}
                  {order.primaryInfo.shippingStatus === 'Shipped' && (
                    <>
                      <Typography variant="h5" className='main-order-status'>
                        <CircleIcon style={{ color: "green", marginRight: ".5rem" }} />
                        {order.primaryInfo.shippingStatus}
                      </Typography>
                      <Typography variant="h6" style={{ color: "#404040" }}>
                        Your order is in transit, will be delivered within a week.
                      </Typography>
                    </>
                  )}
                  {order.primaryInfo.shippingStatus === 'Delivered' && (
                    <>
                      <Typography variant="h5" className='main-order-status'>
                        <CircleIcon style={{ color: "blue", marginRight: ".5rem" }} />
                        {order.primaryInfo.shippingStatus}
                      </Typography>
                      <Typography variant="body2">Your product has been delivered.</Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} className="grid-item">
            <Card className="card" style={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                <Typography variant="h5" className="no-orders-message">
                  No orders found, Please try adjusting your search or filter criteria.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose} className="dialog">
        <DialogTitle className='filter-title'>Filter Orders</DialogTitle>
        <DialogContent className='dialog-content'>
          <div className='spacer'></div>
          <TextField
          id="order-filter"
          select
          label=""
          fullWidth
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          defaultValue=""
          slotProps={{
            select: {
              native: true,
            },
          }}
          helperText="Please select the filter to apply"
         
        >
          {orderFilters.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={applyFilters} color="primary">Apply</Button>
          <Button onClick={handleClose} color="error">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrdersListing;
