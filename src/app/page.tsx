"use client";
import React, { useState } from "react";
import Navbar from "@/components/AuctionHubLanding/AuctionNavbar";
import HeroSection from "@/components/AuctionHubLanding/HeroSection";
import SportAuctionSection from "@/components/AuctionHubLanding/SportAuctionSection";
import ProductAuctionSection from "@/components/AuctionHubLanding/ProductAuctionSection";
import JobAuctionSection from "@/components/AuctionHubLanding/JobAuctionSection";
import ContactSection from "@/components/AuctionHubLanding/ContactSection";
import Footer from "@/components/AuctionHubLanding/Footer";
import SportLandingPage from "@/components/AuctionsLandingPages/SportLandingPage"
import ProductLandingPage from "@/components/AuctionsLandingPages/ProductLandingPage";
import JobLandingPage from "@/components/AuctionsLandingPages/JobLandingPage";

const AuctionLanding = () => {
  const [theme, setTheme] = useState("dark");
  const [currentPage, setCurrentPage] = useState("home"); // ✅ Track current page

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));
  const getThemeClasses = (darkClass: string, lightClass: string) =>
    theme === "dark" ? darkClass : lightClass;

  // Scroll helper for sections (only used on home page)
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Page navigation function
  const navigateToPage = (page: string) => {
    setCurrentPage(page);
  };

  // ✅ Conditional Rendering
  if (currentPage === "sports") {
    return (
      <SportLandingPage
        theme={theme}
        toggleTheme={toggleTheme}
        getThemeClasses={getThemeClasses}
        navigateToPage={navigateToPage}
      />
    );
  }

  if (currentPage === "products") {
    return (
      <ProductLandingPage
        theme={theme}
        toggleTheme={toggleTheme}
        getThemeClasses={getThemeClasses}
        navigateToPage={navigateToPage}
      />
    );
  }

  if (currentPage === "jobs") {
    return (
      <JobLandingPage
        theme={theme}
        toggleTheme={toggleTheme}
        getThemeClasses={getThemeClasses}
        navigateToPage={navigateToPage}
      />
    );
  }

  // ✅ Default Home Page
  return (
    <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
        navigateToPage={navigateToPage}
        getThemeClasses={getThemeClasses}
      />
      <HeroSection scrollToSection={scrollToSection} getThemeClasses={getThemeClasses} />
      <SportAuctionSection navigateToPage={navigateToPage} getThemeClasses={getThemeClasses} />
      <ProductAuctionSection navigateToPage={navigateToPage} getThemeClasses={getThemeClasses} />
      <JobAuctionSection navigateToPage={navigateToPage} getThemeClasses={getThemeClasses} />
      <ContactSection getThemeClasses={getThemeClasses} />
      <Footer getThemeClasses={getThemeClasses} />
    </div>
  );
};

export default AuctionLanding;
