import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets.js"; //=> local products
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Create Context 
export const ShopContext = createContext();
// give value to context using Provider
const ShopContextProvider = (props) => {

    // We can change variable value that effect on entire page (creation of global variable)
    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // console.log('backendUrl ', backendUrl);
    // console.log(import.meta.env);  // This should list all available environment variables
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    // state variable for product
    const [products, setProducts] = useState([]);
    // state variable for category
    const [categories, setCategories] = useState([]);
    // state variable for token
    const [token, setToken] = useState('');
    //state for Id
    const [userId, setUserId] = useState('');
    //user data state
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        cartData: {},
        review: null
    });
    //All user data
    const [allUserData, setAllUserData] = useState([]);

    // Now login page will not open on click or reload of page if token is available
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            getUserCart(localStorage.getItem('token'));
        }
    }, [])


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please Select a color');
            return;
        }

        // structuredClone => It will create copy of cardItem
        let cartData = structuredClone(cartItems);

        // check if itemId already exist
        if (cartData[itemId]) {
            // check itemId && size exist then add +1
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            // itemId && size not exist then do entry with value 1
            else {
                cartData[itemId][size] = 1;
            }
        }
        // If have new itemId then add +1 into cart 
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) //for item id
        {
            for (const item in cartItems[items]) //for item size
            {
                try {
                    // if current itemId and size is greater than 0
                    if (cartItems[items][item] > 0) {
                        // add number of cartItems in totalCount
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log("Error occured : " + error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        // this quantity variable value come from Cart.jsx input and set into cartItems
        cartData[itemId][size] = quantity;
        // cartItems direct reflect to  cart value (Navbar.jsx)
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    // when refresh cartData not show (solve)
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            // console.log(response);
            if (response.data) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) //for item id
        {
            let itemInfo = products.find((product) => product._id === items);
            // Check if itemInfo is found
            if (!itemInfo) {
                console.error(`Product with id ${items} not found.`);
                continue; // Skip this product if it's not found
            }
            for (const item in cartItems[items]) //for item count
            {
                try {
                    // if current itemId and size is greater than 0
                    if (cartItems[items][item] > 0 && itemInfo.price) {
                        // add price of cartItems in totalAmount
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log("Error occured : " + error);
                }
            }
        }
        return totalAmount;
    }

    // Fetch products using axios

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            // console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    const getCategoryData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/category/list`);
            // console.log(response.data);
            if (response.data.success) {
                setCategories(response.data.Category)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getCategoryData();
    }, []);

    // Initialize token and userId from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("id");

        if (storedToken) setToken(storedToken);
        if (storedUserId) setUserId(storedUserId);
    }, []); // Runs only once when the component mounts

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                const storedUserId = localStorage.getItem("id"); // Ensure this is the actual user ID, not a token

                if (!storedToken || !storedUserId) return;

                const response = await axios.get(`${backendUrl}/api/user/fetchuser/${storedUserId}`, {
                    headers: { token: storedToken },
                });

                setUserData(response.data.user);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        };

        fetchUser(); // Fetch user details when component mounts
    }, []);


    const fetchAllUser = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/fetchalluser`);
            // console.log(response.data);
            setAllUserData(response.data.user)
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchAllUser();
    }, []);


    // We can access the any variable of value obj using the context API
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, setCartItems,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl, token, setToken, categories, setUserId, userId, userData, setUserData, allUserData
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

// Step 1 : Create Context
// Step 2 : Give value to provider
// Step 3 : access value globally with the help of useContext
// Step 4 : wrap the Main.jsx by Provider Component 
