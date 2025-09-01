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
  "Welcome",
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
    preview: "https://thumbs.dreamstime.com/b/welcome-banner-shiny-colorful-confetti-vector-paper-illustration-welcome-banner-colorful-confetti-100006906.jpg"
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

  const handleCreateTemplate = () => {
    console.log("Create new template");
    // Add create template logic here
  };

  return (
    <section className={classes.templatesSection}>
      {/* Top Bar */}
      <div className={classes.topBar}>
        <div className={classes.titleSection}>
          <h2 className={classes.title}>Templates</h2>
        </div>
        <div className={classes.actionSection}>
          <button 
            className={classes.createButton}
            onClick={handleCreateTemplate}
          >
            <span className={classes.buttonIcon}>+</span>
            Create Template
          </button>
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
