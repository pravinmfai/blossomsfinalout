import Header from "../components/Header";
import Footer from "../components/Footer";
import OrdersListing from "../components/userOrders";

function UserOrderListingPage(){
    return(
        <>
        <Header />
        <OrdersListing />
        <Footer />
        </>
    )
}

export default UserOrderListingPage;