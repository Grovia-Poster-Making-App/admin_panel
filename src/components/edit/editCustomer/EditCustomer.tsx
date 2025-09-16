import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EditCustomer.scss";
import { IcustomersTable } from "../../../interfaces/Itable";
import { customersService } from "../../../api/services/customers.service";

interface UserImage {
  imageUrl: string;
  isApprovalPending: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  _id: string;
  approvedAt?: string;
  rejectedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
}

const EditCustomer: React.FC<{ customer?: IcustomersTable }> = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: props.customer?.userName || '',
    phoneNumber: props.customer?.phoneNumber || '',
    email: props.customer?.email || '',
    address: props.customer?.location || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userImages, setUserImages] = useState<UserImage[]>([]);
  const [profileImage, setProfileImage] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<string | null>(null);

  useEffect(() => {
    if (props.customer?.ID) {
      fetchUserImages();
    }
  }, [props.customer?.ID]);

  const fetchUserImages = async () => {
    if (!props.customer?.ID) return;
    
    try {
      const result = await customersService.getCustomer(props.customer.ID.toString());
      if (result.success && result.data?.user?.images) {
        const images = result.data.user.images;
        setUserImages(images);
        
        if (images.length > 0 && images[0].imageUrl) {
          setProfileImage(images[0].imageUrl);
        }
      }
    } catch (err) {
      console.error('Error fetching user images:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleImageApproval = async (imageId: string, action: 'approve' | 'reject', reason?: string) => {
    if (!props.customer?.ID) return;
    
    try {
      setImageLoading(imageId);
      
      const updatedImages: UserImage[] = userImages.map(img => {
        if (img._id === imageId) {
          return {
            ...img,
            approvalStatus: action === 'approve' ? 'approved' as const : 'rejected' as const,
            isApprovalPending: false,
            approvedAt: action === 'approve' ? new Date().toISOString() : undefined,
            rejectedAt: action === 'reject' ? new Date().toISOString() : undefined,
            rejectionReason: action === 'reject' ? reason : undefined
          };
        }
        return img;
      });
      
      const updateData = {
        images: updatedImages
      };
      
      const result = await customersService.updateCustomer(props.customer.ID.toString(), updateData);
      
      if (result.success) {
        setUserImages(updatedImages);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(result.message || 'Failed to update image status');
      }
    } catch (err) {
      console.error('Error updating image status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update image status');
    } finally {
      setImageLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!props.customer?.ID) return;

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const updateData = {
        name: formData.userName,
        whatsappNumber: formData.phoneNumber,
      };

      const result = await customersService.updateCustomer(props.customer.ID.toString(), updateData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/customers');
        }, 2000);
      } else {
        throw new Error(result.message || 'Failed to update customer');
      }
    } catch (err) {
      console.error('Error updating customer:', err);
      setError(err instanceof Error ? err.message : 'Failed to update customer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-customer">
      {/* Header */}
      <div className="edit-customer__header">
        <Link to="/customers" className="edit-customer__back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Customers
        </Link>
        <h1 className="edit-customer__title">Edit Customer</h1>
      </div>

      {/* Main Content Grid */}
      <div className="edit-customer__main-grid">
        {/* Profile Card */}
        <div className="edit-customer__card edit-customer__profile-card">
          <div className="edit-customer__profile-content">
            <img 
              src={profileImage || props.customer?.avatar || '/default-avatar.png'} 
              alt="Customer Avatar" 
              className="edit-customer__profile-avatar"
            />
            <h2 className="edit-customer__profile-name">{props.customer?.userName}</h2>
            
            <div className="edit-customer__profile-info">
              <div className="edit-customer__info-item">
                <svg className="edit-customer__info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                </svg>
                {props.customer?.phoneNumber}
              </div>
              <div className="edit-customer__info-item">
                <svg className="edit-customer__info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                </svg>
                {props.customer?.email}
              </div>
              <div className="edit-customer__info-item">
                <svg className="edit-customer__info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                </svg>
                {props.customer?.location}
              </div>
            </div>

            <div className="edit-customer__stats-grid">
              <div className="edit-customer__stat-item">
                <span className="edit-customer__stat-number">{userImages.length}</span>
                <span className="edit-customer__stat-label">Total Images</span>
              </div>
              <div className="edit-customer__stat-item">
                <span className="edit-customer__stat-number">
                  {userImages.filter(img => img.approvalStatus === 'approved').length}
                </span>
                <span className="edit-customer__stat-label">Approved</span>
              </div>
              <div className="edit-customer__stat-item">
                <span className="edit-customer__stat-number">
                  {userImages.filter(img => img.approvalStatus === 'pending').length}
                </span>
                <span className="edit-customer__stat-label">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form Card */}
        <div className="edit-customer__card">
          <div className="edit-customer__card-header">
            <h3 className="edit-customer__card-title">Customer Information</h3>
            <p className="edit-customer__card-subtitle">Update customer details below</p>
          </div>
          <div className="edit-customer__card-content">
            {success && (
              <div className="edit-customer__alert edit-customer__alert--success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
                Customer updated successfully! Redirecting...
              </div>
            )}

            {error && (
              <div className="edit-customer__alert edit-customer__alert--error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1L9,7V9L11,11V22H13V18H17V22H19V11L21,9Z"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="edit-customer__form-grid">
              <div className="edit-customer__form-group">
                <label className="edit-customer__form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="userName"
                  className="edit-customer__form-input" 
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="edit-customer__form-group">
                <label className="edit-customer__form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  id="phoneNumber"
                  className="edit-customer__form-input" 
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="edit-customer__form-group">
                <label className="edit-customer__form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  className="edit-customer__form-input" 
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                />
                <p className="edit-customer__form-note">Email cannot be modified</p>
              </div>

              <div className="edit-customer__form-group">
                <label className="edit-customer__form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                  </svg>
                  Address
                </label>
                <input 
                  type="text" 
                  id="address"
                  className="edit-customer__form-input" 
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled
                />
                <p className="edit-customer__form-note">Address cannot be modified</p>
              </div>

              <div className="edit-customer__form-actions">
                <button type="submit" className="edit-customer__btn edit-customer__btn--primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="edit-customer__loading">
                        <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
                <Link to="/customers" className="edit-customer__btn edit-customer__btn--secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                  </svg>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="edit-customer__card edit-customer__image-gallery">
        <div className="edit-customer__card-header">
          <div className="edit-customer__gallery-header">
            <div>
              <h3 className="edit-customer__card-title">Image Management</h3>
              <p className="edit-customer__card-subtitle">Review and approve customer images</p>
            </div>
            <button className="edit-customer__refresh-btn" onClick={fetchUserImages}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
              </svg>
              Refresh
            </button>
          </div>
        </div>
        <div className="edit-customer__card-content">
          {userImages.length > 0 ? (
            <div className="edit-customer__image-grid">
              {userImages.map((image, index) => (
                <div key={image._id} className="edit-customer__image-card">
                  <div className="edit-customer__image-container">
                    <img src={image.imageUrl} alt={`User ${index + 1}`} className="edit-customer__image-preview" />
                    <span className={`edit-customer__status-badge edit-customer__status-badge--${image.approvalStatus}`}>
                      {image.approvalStatus}
                    </span>
                  </div>
                  <div className="edit-customer__image-actions">
                    {image.approvalStatus === 'pending' && (
                      <div className="edit-customer__action-buttons">
                        <button
                          className="edit-customer__action-btn edit-customer__action-btn--approve"
                          onClick={() => handleImageApproval(image._id, 'approve')}
                          disabled={imageLoading === image._id}
                        >
                          {imageLoading === image._id ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="edit-customer__loading">
                              <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                            </svg>
                          )}
                          Approve
                        </button>
                        <button
                          className="edit-customer__action-btn edit-customer__action-btn--reject"
                          onClick={() => {
                            const reason = prompt('Reason for rejection (optional):');
                            if (reason !== null) {
                              handleImageApproval(image._id, 'reject', reason);
                            }
                          }}
                          disabled={imageLoading === image._id}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                          </svg>
                          Reject
                        </button>
                      </div>
                    )}
                    <div className="edit-customer__image-date">
                      Uploaded: {new Date(image.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="edit-customer__empty-state">
              <svg className="edit-customer__empty-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19M19,19H5V5H19V19Z"/>
              </svg>
              <h4>No Images Found</h4>
              <p>This customer hasn't uploaded any images yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;