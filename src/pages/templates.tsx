import React, { useState, useMemo } from "react";
import classes from "./Templates.module.scss";

// Template interface
interface Template {
  id: string;
  title: string;
  category: string;
  downloads: number;
  expiresAt: string;
  preview: string;
}

// Categories for dropdown filter
const categories = [
  "Banner 1",
  "Banner 2", 
  "Stories",
  "Special Events",
  "Buttons",
  "Motivational Dose",
  "Rank Promotions",
  "Leader's Offers",
  "Achievements",
  "Income Promotions",
  "Bonanza Promotions",
  "Greetings",
  "Thank You Post",
  "Schedule",
  "Meetings (With Photo)",
  "Meetings (Without Photo)",
  "Custom Meetings",
  "Capping"
];

// Dummy data
const dummyTemplates: Template[] = [
  {
    id: "1",
    title: "Welcome Banner",
    category: "Welcome",
    downloads: 120,
    expiresAt: "01-10-2025",
    preview: "https://previews.123rf.com/images/maxborovkov/maxborovkov1711/maxborovkov171100062/89114649-white-welcome-banner-with-colorful-paper-serpentine-vector-illustration.jpg"
  },
  {
    id: "2", 
    title: "Motivation Story",
    category: "Motivational Dose",
    downloads: 85,
    expiresAt: "15-09-2025",
    preview: "https://img.freepik.com/premium-psd/best-motivation-success_1286238-15019.jpg"
  },
  {
    id: "3",
    title: "Special Event Flyer", 
    category: "Special Events",
    downloads: 200,
    expiresAt: "20-11-2025",
    preview: "https://media.licdn.com/dms/image/v2/C4E1BAQGZsxrbRvG49A/company-background_10000/company-background_10000/0/1584613572227/australasian_special_events_cover?e=2147483647&v=beta&t=rp-49jD4BXDkuE9VPqkrUREFnQcc6n0JRQQC-7ni3-c"
  },
  {
    id: "4",
    title: "Leadership Offer",
    category: "Leader's Offers", 
    downloads: 65,
    expiresAt: "05-12-2025",
    preview: "https://media.licdn.com/dms/image/v2/D4D12AQF9bz_lQkqTig/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1707828106708?e=2147483647&v=beta&t=eFMLcpdmuHUXDwitkUhyVRmCn3b1d07W_YM9AGkc4X0"
  },
  {
    id: "5",
    title: "Achievement Badge",
    category: "Achievements",
    downloads: 150,
    expiresAt: "10-11-2025", 
    preview: "https://images.squarespace-cdn.com/content/v1/656bf2e501bf733c04fad6f5/1b0e841b-7fee-4306-b758-4ee303cb4e2d/Personal+Achievements.jpg"
  },
  {
    id: "6",
    title: "Income Promotion",
    category: "Income Promotions",
    downloads: 95,
    expiresAt: "25-10-2025",
    preview: "https://static.vecteezy.com/system/resources/previews/010/307/866/non_2x/bonus-word-with-flying-gold-dollar-coins-and-gift-box-on-confetti-background-win-prize-celebration-promo-banner-loyalty-program-or-casino-winning-concept-earn-and-money-income-illustration-vector.jpg"
  }
];

const Templates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [templates, setTemplates] = useState<Template[]>(dummyTemplates);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchTerm, selectedCategory]);

  // Handle template actions
  const handleView = (id: string) => {
    console.log("View template:", id);
    // Add view logic here
  };

  const handleEdit = (id: string) => {
    console.log("Edit template:", id);
    // Add edit logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete template:", id);
    // Add delete logic here
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const handleCreateTemplate = (category?: string) => {
    if (category) {
      console.log("Create template for category:", category);
      
      // Define routing for each category
      const categoryRoutes: { [key: string]: string } = {
        "Banner 1": `/create-template/banner?category=${encodeURIComponent(category)}`,
        "Banner 2": `/create-template/banner?category=${encodeURIComponent(category)}`,
        "Stories": `/create-template/stories?category=${encodeURIComponent(category)}`,
        "Special Events": `/create-template/special-events?category=${encodeURIComponent(category)}`,
        "Buttons": `/create-template/buttons?category=${encodeURIComponent(category)}`,
        "Motivational Dose": `/create-template/motivational-dose?category=${encodeURIComponent(category)}`,
        "Rank Promotions": `/create-template/rank-promotions?category=${encodeURIComponent(category)}`,
        "Leader's Offers": `/create-template/leaders-offers?category=${encodeURIComponent(category)}`,
        "Achievements": `/create-template/achievements?category=${encodeURIComponent(category)}`,
        "Income Promotions": `/create-template/income-promotions?category=${encodeURIComponent(category)}`,
        "Bonanza Promotions": `/create-template/bonanza-promotions?category=${encodeURIComponent(category)}`,
        "Greetings": `/create-template/greetings?category=${encodeURIComponent(category)}`,
        "Thank You Post": `/create-template/thank-you-post?category=${encodeURIComponent(category)}`,
        "Schedule": `/create-template/schedule?category=${encodeURIComponent(category)}`,
        "Meetings (With Photo)": `/create-template/meetings-with-photo?category=${encodeURIComponent(category)}`,
        "Meetings (Without Photo)": `/create-template/meetings-without-photo?category=${encodeURIComponent(category)}`,
        "Custom Meetings": `/create-template/custom-meetings?category=${encodeURIComponent(category)}`,
        "Capping": `/create-template/capping?category=${encodeURIComponent(category)}`
      };

      // Navigate to the appropriate create template page
      const route = categoryRoutes[category];
      if (route) {
        window.location.href = route;
      } else {
        console.warn("No route defined for category:", category);
        // Fallback to a generic create template page
        window.location.href = `/create-template/generic?category=${encodeURIComponent(category)}`;
      }
    }
    setShowCreateDropdown(false);
  };

  const toggleCreateDropdown = () => {
    setShowCreateDropdown(!showCreateDropdown);
  };

  return (
    <section className={classes.templatesSection}>
      {/* Top Bar */}
      <div className={classes.topBar}>
        <div className={classes.titleSection}>
          <h2 className={classes.title}>Templates</h2>
        </div>
        <div className={classes.actionSection}>
          <div className={classes.createButtonContainer}>
            <button 
              className={classes.createButton}
              onClick={toggleCreateDropdown}
            >
              <span className={classes.buttonIcon}>+</span>
              Create Template
            </button>
            
            {showCreateDropdown && (
              <div className={classes.createDropdown}>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={classes.dropdownItem}
                    onClick={() => handleCreateTemplate(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={classes.filtersSection}>
        <div className={classes.searchContainer}>
          <div className={classes.searchInputWrapper}>
            <span className={classes.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={classes.searchInput}
            />
          </div>
        </div>
        
        <div className={classes.categoryFilter}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={classes.categorySelect}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className={classes.templatesGrid}>
        {filteredTemplates.length === 0 ? (
          <div className={classes.emptyState}>
            <div className={classes.emptyIcon}>📄</div>
            <h3>No templates found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div key={template.id} className={classes.templateCard}>
              <div className={classes.templatePreview}>
                <img 
                  src={template.preview} 
                  alt={template.title}
                  className={classes.previewImage}
                />
              </div>
              
              <div className={classes.templateInfo}>
                <h3 className={classes.templateTitle}>{template.title}</h3>
                <div className={classes.templateMeta}>
                  <span className={classes.category}>{template.category}</span>
                  <span className={classes.downloads}>
                    📥 {template.downloads} downloads
                  </span>
                </div>
                <div className={classes.expiryInfo}>
                  <span className={classes.expiryLabel}>Expires:</span>
                  <span className={classes.expiryDate}>{template.expiresAt}</span>
                </div>
              </div>

              <div className={classes.templateActions}>
                <button
                  className={`${classes.actionButton} ${classes.viewButton}`}
                  onClick={() => handleView(template.id)}
                  title="View Template"
                >
                  👁️
                </button>
                <button
                  className={`${classes.actionButton} ${classes.editButton}`}
                  onClick={() => handleEdit(template.id)}
                  title="Edit Template"
                >
                  ✏️
                </button>
                <button
                  className={`${classes.actionButton} ${classes.deleteButton}`}
                  onClick={() => handleDelete(template.id)}
                  title="Delete Template"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Templates;
