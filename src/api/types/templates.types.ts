// Template related types
import { FilterOptions } from './common.types';

export interface Template {
  _id: string;
  templateType: TemplateType;
  category: string;
  headImageUrl?: string;
  titleBackgroundImageUrl?: string;
  templates: ITemplateItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ITemplateItem {
  imageUrl: string;
  // story fields
  price?: string;
  category?: string;
  profileImagePosition?: string;
  userDetailPosition?: string;
  expirationDate?: string;
  // banner fields
  url?: string;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  expiresAt?: string;
  isVisible?: boolean;
  offerType?: string;
  discount?: string;
  termsForOffer?: string;
  buttonText?: string;
  isBannerClickable?: boolean;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export type TemplateType = 'story' | 'banner';

export interface TemplateContent {
  headImage?: string;
  titleBackgroundImage?: string;
  templates: StoryTemplate[] | BannerTemplate[];
}

export interface StoryTemplate {
  id: string;
  image: string;
  imagePreview: string;
  price: string;
  category: string;
  profileImagePosition: 'left' | 'right';
  userDetailPosition: 'left' | 'right';
  expirationDate: string;
}

export interface BannerTemplate {
  id: string;
  image: string;
  imagePreview: string;
  url: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  expiresAt: string;
  isVisible: boolean;
  offerType: string;
  discount: string;
  termsForOffer: string;
  buttonText: string;
  isBannerClickable: boolean;
}

export interface TemplateSettings {
  isPublic: boolean;
  allowDownload: boolean;
  allowEdit: boolean;
  tags: string[];
  expiresAt?: string;
}

export interface TemplateMetadata {
  downloads: number;
  views: number;
  likes: number;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export type TemplateStatus = 'draft' | 'published' | 'archived' | 'deleted';

export interface CreateTemplateRequest {
  templateType: TemplateType;
  category: string;
  headImageUrl?: string;
  titleBackgroundImageUrl?: string;
  templates: ITemplateItem[];
}

export interface UpdateTemplateRequest extends Partial<CreateTemplateRequest> {
  id: string;
}

export interface TemplateFilters extends FilterOptions {
  templateType?: TemplateType;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TemplateUploadRequest {
  templateId: string;
  file: File;
  type: 'image' | 'document';
}
