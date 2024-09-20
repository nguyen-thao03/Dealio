import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import Store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToastContainer from "./components/Notification/ToastContainer";
import ScrollOnTop from "./ScrollOnTop";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const ActivationPage = React.lazy(() => import("./pages/ActivationPage"));
const SellerActivationPage = React.lazy(() =>
  import("./pages/SellerActivationPage")
);
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = React.lazy(() =>
  import("./pages/ProductDetailsPage")
);
const BestSellingPage = React.lazy(() => import("./pages/BestSellingPage"));
const EventsPage = React.lazy(() => import("./pages/EventsPage"));
const FAQPage = React.lazy(() => import("./pages/FAQPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const OrderSuccessPage = React.lazy(() => import("./pages/OrderSuccessPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const ShopCreatePage = React.lazy(() => import("./pages/ShopCreatePage"));
const ShopLoginPage = React.lazy(() => import("./pages/ShopLoginPage"));
const OrderDetailsPage = React.lazy(() => import("./pages/OrderDetailsPage"));
const TrackOrderPage = React.lazy(() => import("./pages/TrackOrderPage"));

const ShopDashboardPage = React.lazy(() =>
  import("./pages/Shop/ShopDashboardPage")
);
const ShopCreateProduct = React.lazy(() =>
  import("./pages/Shop/ShopCreateProduct")
);
const ShopAllProducts = React.lazy(() =>
  import("./pages/Shop/ShopAllProducts")
);
const ShopCreateEvents = React.lazy(() =>
  import("./pages/Shop/ShopCreateEvents")
);
const ShopAllEvents = React.lazy(() => import("./pages/Shop/ShopAllEvents"));
const ShopAllCoupouns = React.lazy(() =>
  import("./pages/Shop/ShopAllCoupouns")
);
const ShopPreviewPage = React.lazy(() =>
  import("./pages/Shop/ShopPreviewPage")
);
const ShopAllOrders = React.lazy(() => import("./pages/Shop/ShopAllOrders"));
const ShopOrderDetails = React.lazy(() =>
  import("./pages/Shop/ShopOrderDetails")
);
const ShopAllRefunds = React.lazy(() => import("./pages/Shop/ShopAllRefunds"));
const ShopSettingsPage = React.lazy(() =>
  import("./pages/Shop/ShopSettingsPage")
);

const ShopHomePage = React.lazy(() => import("./pages/Shop/ShopHomePage"));

const AdminDashboardPage = React.lazy(() =>
  import("./pages/AdminDashboardPage")
);
const AdminDashboardUsers = React.lazy(() =>
  import("./pages/AdminDashboardUsers")
);
const AdminDashboardSellers = React.lazy(() =>
  import("./pages/AdminDashboardSellers")
);
const AdminDashboardOrders = React.lazy(() =>
  import("./pages/AdminDashboardOrders")
);
const AdminDashboardProducts = React.lazy(() =>
  import("./pages/AdminDashboardProducts")
);
const AdminDashboardEvents = React.lazy(() =>
  import("./pages/AdminDashboardEvents")
);

import { loadSeller, loadUser } from "./redux/actions/userActions";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/productActions";
import { getAllEvents } from "./redux/actions/eventActions";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
      <ScrollOnTop>
        <Suspense fallback={<div>Loading...</div>}>
          {stripeApikey && (
            <Elements stripe={loadStripe(stripeApikey)}>
              <Routes>
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <PaymentPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Elements>
          )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route
              path="/seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            <Route path="/order/success" element={<OrderSuccessPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="/user/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/track/order/:id"
              element={
                <ProtectedRoute>
                  <TrackOrderPage />
                </ProtectedRoute>
              }
            />

            <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
            {/* shop Routes */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route
              path="/shop/:id"
              element={
                <SellerProtectedRoute>
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <SellerProtectedRoute>
                  <ShopSettingsPage />
                </SellerProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <SellerProtectedRoute>
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-create-product"
              element={
                <SellerProtectedRoute>
                  <ShopCreateProduct />
                </SellerProtectedRoute>
              }
            />

            <Route
              path="/dashboard-orders"
              element={
                <SellerProtectedRoute>
                  <ShopAllOrders />
                </SellerProtectedRoute>
              }
            />

            <Route
              path="/dashboard-refunds"
              element={
                <SellerProtectedRoute>
                  <ShopAllRefunds />
                </SellerProtectedRoute>
              }
            />

            <Route
              path="/order/:id"
              element={
                <SellerProtectedRoute>
                  <ShopOrderDetails />
                </SellerProtectedRoute>
              }
            />

            <Route
              path="/dashboard-products"
              element={
                <SellerProtectedRoute>
                  <ShopAllProducts />
                </SellerProtectedRoute>
              }
            />

            <Route
              path="/dashboard-create-event"
              element={
                <SellerProtectedRoute>
                  <ShopCreateEvents />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-events"
              element={
                <SellerProtectedRoute>
                  <ShopAllEvents />
                </SellerProtectedRoute>
              }
            />
            <Route path="/dashboard-coupouns"
              element={
                <SellerProtectedRoute>
                  <ShopAllCoupouns />
                </SellerProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-users"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardUsers />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-sellers"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardSellers />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-orders"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardOrders />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-products"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardProducts />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-events"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardEvents />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </ScrollOnTop>
      <ToastContainer />
    </BrowserRouter>
  );
};
export default App;