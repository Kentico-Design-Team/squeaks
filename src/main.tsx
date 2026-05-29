import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./app.css";
import { Layout } from "./layout";
import Home from "./pages/home";
import Contacts from "./pages/contacts";
import ListingFullWidth from "./pages/listing-full-width";
import ListingSecondary from "./pages/listing-secondary";
import ContentHubPage from "./pages/content-hub";
import OverviewPage from "./pages/overview";
import Pages from "./pages/pages";
import Emails from "./pages/emails";
import ActivityTypes from "./pages/activity-types";
import ActivityTypeGeneral from "./pages/activity-type-general";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="listing-full-width" element={<ListingFullWidth />} />
          <Route path="listing-secondary" element={<ListingSecondary />} />
          <Route path="listing-secondary/:itemId" element={<ListingSecondary />} />
          <Route
            path="listing-secondary/:itemId/:tab"
            element={<ListingSecondary />}
          />
          <Route path="content-hub" element={<ContentHubPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="pages" element={<Pages />} />
          <Route path="pages/:pageId/:tab" element={<Pages />} />
          <Route path="emails" element={<Emails />} />
          <Route path="emails/:pageId/:tab" element={<Emails />} />
          <Route path="activity-types" element={<ActivityTypes />} />
          <Route path="activity-types/click" element={<ActivityTypeGeneral />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
