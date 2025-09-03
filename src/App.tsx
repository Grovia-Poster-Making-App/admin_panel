import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import "./scss/App.scss";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Templates = React.lazy(() => import("./pages/templates"));
const Banner = React.lazy(() => import("./pages/createTemplates/banner"));
const Stories = React.lazy(() => import("./pages/createTemplates/stories"));
const SpecialEvents = React.lazy(() => import("./pages/createTemplates/specialEvents"));
const Buttons = React.lazy(() => import("./pages/createTemplates/buttons"));
const MotivationDose = React.lazy(() => import("./pages/createTemplates/motivationDose"));
const RankPromotions = React.lazy(() => import("./pages/createTemplates/rankPromotions"));
const LeadersOffers = React.lazy(() => import("./pages/createTemplates/leadersOffers"));
const Achievements = React.lazy(() => import("./pages/createTemplates/achievements"));
const IncomePromotions = React.lazy(() => import("./pages/createTemplates/incomePromotions"));
const BonanzaPromotions = React.lazy(() => import("./pages/createTemplates/bonanzaPromotions"));
const Greetings = React.lazy(() => import("./pages/createTemplates/greetings"));
const ThankYouPost = React.lazy(() => import("./pages/createTemplates/thankYouPost"));
const Schedule = React.lazy(() => import("./pages/createTemplates/schedule"));
const MeetingsWithPhoto = React.lazy(() => import("./pages/createTemplates/meetingsWithPhoto"));
const MeetingsWithoutPhoto = React.lazy(() => import("./pages/createTemplates/meetingsWithoutPhoto"));
const CustomMeetings = React.lazy(() => import("./pages/createTemplates/customMeetings"));
const Cappings = React.lazy(() => import("./pages/createTemplates/cappings"));
const Orders = React.lazy(() => import("./pages/orders/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const CustomerEdit = React.lazy(() => import("./pages/CustomerEdit"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductEdit = React.lazy(() => import("./pages/ProductEdit"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BlankPage = React.lazy(() => import("./pages/BlankPage"));
const Login = React.lazy(() => import("./pages/Login"));
const MusicList = React.lazy(() => import("./pages/music/musicList"));
const AddMusic = React.lazy(() => import("./pages/music/addMusic"));
const NotificationsList = React.lazy(() => import("./pages/notifications/notifications_list"));
const SendNotifications = React.lazy(() => import("./pages/notifications/send_notifications"));
const Wallet = React.lazy(() => import("./pages/wallets/Wallet"));
const Referrals = React.lazy(() => import("./pages/referrals/Referrals"));
const Support = React.lazy(() => import("./pages/support/Support"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/create-template/banner" element={<Banner />} />
              <Route path="/create-template/stories" element={<Stories />} />
              <Route path="/create-template/special-events" element={<SpecialEvents />} />
              <Route path="/create-template/buttons" element={<Buttons />} />
              <Route path="/create-template/motivational-dose" element={<MotivationDose />} />
              <Route path="/create-template/rank-promotions" element={<RankPromotions />} />
              <Route path="/create-template/leaders-offers" element={<LeadersOffers />} />
              <Route path="/create-template/achievements" element={<Achievements />} />
              <Route path="/create-template/income-promotions" element={<IncomePromotions />} />
              <Route path="/create-template/bonanza-promotions" element={<BonanzaPromotions />} />
              <Route path="/create-template/greetings" element={<Greetings />} />
              <Route path="/create-template/thank-you-post" element={<ThankYouPost />} />
              <Route path="/create-template/schedule" element={<Schedule />} />
              <Route path="/create-template/meetings-with-photo" element={<MeetingsWithPhoto />} />
              <Route path="/create-template/meetings-without-photo" element={<MeetingsWithoutPhoto />} />
              <Route path="/create-template/custom-meetings" element={<CustomMeetings />} />
              <Route path="/create-template/capping" element={<Cappings />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:customerId" element={<CustomerEdit />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductEdit />} />
              <Route path="/music" element={<MusicList />} />
              <Route path="/music/add" element={<AddMusic />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/notifications" element={<NotificationsList />} />
              <Route path="/notifications/send" element={<SendNotifications />} />
              <Route path="/refer-earn" element={<Referrals />} />
              <Route path="/support" element={<Support />} />
              <Route path="/analytics" element={<BlankPage />} />
              <Route path="/discount" element={<BlankPage />} />
              <Route path="/inventory" element={<BlankPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
