import React, { useState, useMemo, useEffect, useCallback } from "react";
import classes from "./Templates.module.scss";
import { templatesService } from "../api/services/templates.service";

// Template interface
interface Template {
  id: string;
  title: string;
  subtitle: string;
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
  "Custom Meetings (With Pic)",
  "Custom Meetings (Without Pic)",
  "Capping"
];


const Templates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  // Fetch templates from API
  const fetchTemplates = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    const MIN_FETCH_INTERVAL = 5000; // 5 seconds minimum between fetches

    // Prevent duplicate calls
    if (isFetching && !forceRefresh) {
      console.log('Fetch already in progress, skipping...');
      return;
    }

    // If already fetched and not forcing refresh, skip
    if (hasFetched && !forceRefresh) {
      console.log('Templates already fetched, skipping...');
      return;
    }

    // Rate limiting - prevent too frequent requests
    if (!forceRefresh && (now - lastFetchTime) < MIN_FETCH_INTERVAL) {
      console.log('Rate limited: Too soon since last fetch, skipping...');
      return;
    }

    try {
      setIsFetching(true);
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching templates from API...');
      
      const result = await templatesService.getTemplates();
      
      if (result.success && result.data) {
        console.log('Templates fetched successfully:', result.data);
        console.log('API Template titles and subtitles:', result.data.map((t: any) => ({ id: t._id, title: t.title, subtitle: t.subtitle, category: t.category })));
        
        // Transform API templates to UI format
        const transformedApiTemplates = result.data.map((apiTemplate: any) => ({
          id: apiTemplate._id,
          title: apiTemplate.title || `${apiTemplate.category} Template`, // Fallback title if not provided
          subtitle: apiTemplate.subtitle || `${apiTemplate.category} subtitle`, // Fallback subtitle if not provided
          category: apiTemplate.category,
          downloads: Math.floor(Math.random() * 200) + 50, // Random downloads for demo
          expiresAt: new Date(apiTemplate.createdAt).toLocaleDateString('en-GB'),
          preview: apiTemplate.headImageUrl || apiTemplate.templates?.[0]?.imageUrl || "https://via.placeholder.com/300x200?text=No+Preview"
        }));

        // Set only API templates
        console.log('API templates with titles and subtitles:', transformedApiTemplates.map(t => ({ id: t.id, title: t.title, subtitle: t.subtitle, category: t.category })));
        setTemplates(transformedApiTemplates);
        setHasFetched(true);
        setLastFetchTime(now);
      } else {
        throw new Error('Failed to fetch templates');
      }
    } catch (err) {
      console.error('Error fetching templates:', err);
      
      // Handle specific error types
      if (err instanceof Error) {
        if (err.message.includes('429') || err.message.includes('Too many requests')) {
          setError('Rate limit exceeded. Please wait a few minutes before trying again.');
          // Set a longer delay for rate limit errors
          setLastFetchTime(now + 60000); // 1 minute delay
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to fetch templates');
      }
      
      // Keep empty array if API fails
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [isFetching, hasFetched, lastFetchTime]);

  // Fetch templates on component mount (only once)
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchTerm, selectedCategory]);

  // Handle template actions
  // const handleView = (id: string) => {
  //   console.log("View template:", id);
  //   // Add view logic here
  // };

  const handleEdit = (id: string) => {
    console.log("Edit template:", id);
    
    // Find the template to get its category
    const template = templates.find(t => t.id === id);
    if (!template) {
      console.error('Template not found for editing');
      return;
    }

    // Route to the appropriate edit page based on category
    const categoryRoutes: { [key: string]: string } = {
      "Banner 1": `/edit-template/banner?id=${encodeURIComponent(id)}`,
      "Banner 2": `/edit-template/banner?id=${encodeURIComponent(id)}`,
      "Stories": `/edit-template/stories?id=${encodeURIComponent(id)}`,
      "Special Events": `/edit-template/special-events?id=${encodeURIComponent(id)}`,
      "Buttons": `/edit-template/buttons?id=${encodeURIComponent(id)}`,
      "Motivational Dose": `/edit-template/motivational-dose?id=${encodeURIComponent(id)}`,
      "Rank Promotions": `/edit-template/rank-promotions?id=${encodeURIComponent(id)}`,
      "Leader's Offers": `/edit-template/leaders-offers?id=${encodeURIComponent(id)}`,
      "Achievements": `/edit-template/achievements?id=${encodeURIComponent(id)}`,
      "Income Promotions": `/edit-template/income-promotions?id=${encodeURIComponent(id)}`,
      "Bonanza Promotions": `/edit-template/bonanza-promotions?id=${encodeURIComponent(id)}`,
      "Greetings": `/edit-template/greetings?id=${encodeURIComponent(id)}`,
      "Thank You Post": `/edit-template/thank-you-post?id=${encodeURIComponent(id)}`,
      "Schedule": `/edit-template/schedule?id=${encodeURIComponent(id)}`,
      "Meetings (With Photo)": `/edit-template/meetings-with-photo?id=${encodeURIComponent(id)}`,
      "Meetings (Without Photo)": `/edit-template/meetings-without-photo?id=${encodeURIComponent(id)}`,
      "Custom Meetings (With Pic)": `/edit-template/custom-meetings-with-pic?id=${encodeURIComponent(id)}`,
      "Custom Meetings (Without Pic)": `/edit-template/custom-meetings-without-pic?id=${encodeURIComponent(id)}`,
      "Capping": `/edit-template/capping?id=${encodeURIComponent(id)}`
    };

    // Navigate to the appropriate edit template page
    const route = categoryRoutes[template.category];
    if (route) {
      window.location.href = route;
    } else {
      console.warn("No edit route defined for category:", template.category);
      // Fallback to a generic edit template page
      window.location.href = `/edit-template/generic?id=${encodeURIComponent(id)}&category=${encodeURIComponent(template.category)}`;
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Delete template:", id);
    try {
      // All templates are now API templates, call the delete API
      const result = await templatesService.deleteTemplate(id);
      
      if (result.success) {
        console.log('Template deleted successfully');
        // Refresh templates after deletion (force refresh)
        fetchTemplates(true);
      } else {
        throw new Error(result.message || 'Failed to delete template');
      }
    } catch (err) {
      console.error('Error deleting template:', err);
      // Show error but don't remove from UI until API confirms deletion
    }
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
        "Custom Meetings (With Pic)": `/create-template/custom-meetings-with-pic?category=${encodeURIComponent(category)}`,
        "Custom Meetings (Without Pic)": `/create-template/custom-meetings-without-pic?category=${encodeURIComponent(category)}`,
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
          <div className={classes.statusIndicators}>
            {isLoading && <span className={classes.loadingIndicator}>Loading...</span>}
            {error && <span className={classes.errorIndicator}>Error loading templates</span>}
            {!isLoading && !error && hasFetched && (
              <button 
                className={classes.refreshButton}
                onClick={() => fetchTemplates(true)}
                title="Refresh templates"
              >
                🔄 Refresh
              </button>
            )}
          </div>
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
        {isLoading ? (
          <div className={classes.loadingState}>
            <div className={classes.loadingSpinner}>⏳</div>
            <h3>Loading templates...</h3>
            <p>Please wait while we fetch your templates</p>
          </div>
        ) : error ? (
          <div className={classes.errorState}>
            <div className={classes.errorIcon}>❌</div>
            <h3>Error loading templates</h3>
            <p>{error}</p>
            <button 
              className={classes.retryButton}
              onClick={() => fetchTemplates(true)}
            >
              Retry
            </button>
          </div>
        ) : filteredTemplates.length === 0 ? (
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
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Preview";
                  }}
                />
              </div>
              
              <div className={classes.templateInfo}>
                <h3 className={classes.templateTitle}>{template.title}</h3>
                <p className={classes.templateSubtitle}>{template.subtitle}</p>
                <div className={classes.templateMeta}>
                  <span className={classes.category}>{template.category}</span>
                  {/* <span className={classes.downloads}>
                    📥 {template.downloads} downloads
                  </span> */}
                </div>
                <div className={classes.expiryInfo}>
                  <span className={classes.expiryLabel}>Created:</span>
                  <span className={classes.expiryDate}>{template.expiresAt}</span>
                </div>
              </div>

              <div className={classes.templateActions}>
                {/* <button
                  className={`${classes.actionButton} ${classes.viewButton}`}
                  onClick={() => handleView(template.id)}
                  title="View Template"
                >
                  👁️
                </button> */}
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
