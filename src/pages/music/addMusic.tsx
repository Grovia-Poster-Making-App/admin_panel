import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './AddMusic.module.scss';

interface MusicFormData {
  title: string;
  artist: string;
  category: string;
  musicFile: File | null;
  coverImage: File | null;
}

interface FormErrors {
  title?: string;
  artist?: string;
  category?: string;
  musicFile?: string;
}

const AddMusic: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MusicFormData>({
    title: '',
    artist: '',
    category: '',
    musicFile: null,
    coverImage: null
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [musicPreview, setMusicPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const musicInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Background',
    'Celebration',
    'Motivational',
    'Ambient',
    'Corporate',
    'Jingle'
  ];

  const handleInputChange = (field: keyof MusicFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleMusicUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setFormData(prev => ({ ...prev, musicFile: file }));
        setMusicPreview(URL.createObjectURL(file));
        if (errors.musicFile) {
          setErrors(prev => ({ ...prev, musicFile: undefined }));
        }
      } else {
        setErrors(prev => ({ ...prev, musicFile: 'Please select a valid audio file' }));
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, coverImage: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.artist.trim()) {
      newErrors.artist = 'Artist is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.musicFile) {
      newErrors.musicFile = 'Music file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically upload the music file and save the data
      console.log('Music data:', formData);
      alert('Music uploaded successfully!');
      navigate('/music');
    }
  };

  const handleCancel = () => {
    navigate('/music');
  };

  return (
    <div className={styles.addMusic}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('addMusic')}</h2>
        <button onClick={handleCancel} className={styles.backButton}>
          <Icon icon="material-symbols:arrow-back" />
          {t('back')}
        </button>
      </div>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t('title')} *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', e.target.value)}
                placeholder={t('enterTitle')}
                className={styles.input}
              />
              {errors.title && <span className={styles.errorText}>{errors.title}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{t('artist')} *</label>
              <input
                type="text"
                value={formData.artist}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('artist', e.target.value)}
                placeholder={t('enterArtist')}
                className={styles.input}
              />
              {errors.artist && <span className={styles.errorText}>{errors.artist}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('category')} *</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`${styles.select} ${errors.category ? styles.error : ''}`}
            >
              <option value="">{t('selectCategory')}</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span className={styles.errorText}>{errors.category}</span>}
          </div>

          <div className={styles.uploadSection}>
            <div className={styles.uploadGroup}>
              <label className={styles.label}>{t('musicFile')} *</label>
              <div className={styles.uploadArea}>
                <input
                  ref={musicInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleMusicUpload}
                  className={styles.fileInput}
                />
                <div 
                  className={styles.uploadBox}
                  onClick={() => musicInputRef.current?.click()}
                >
                  <Icon icon="material-symbols:upload" className={styles.uploadIcon} />
                  <p className={styles.uploadText}>
                    {formData.musicFile ? formData.musicFile.name : t('clickToUploadMusic')}
                  </p>
                </div>
                {musicPreview && (
                  <div className={styles.preview}>
                    <audio controls className={styles.audioPreview}>
                      <source src={musicPreview} />
                    </audio>
                  </div>
                )}
                {errors.musicFile && <span className={styles.errorText}>{errors.musicFile}</span>}
              </div>
            </div>

            <div className={styles.uploadGroup}>
              <label className={styles.label}>{t('coverImage')} ({t('optional')})</label>
              <div className={styles.uploadArea}>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                />
                <div 
                  className={styles.uploadBox}
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Icon icon="material-symbols:image" className={styles.uploadIcon} />
                  <p className={styles.uploadText}>
                    {formData.coverImage ? formData.coverImage.name : t('clickToUploadImage')}
                  </p>
                </div>
                {imagePreview && (
                  <div className={styles.preview}>
                    <img src={imagePreview} alt="Cover preview" className={styles.imagePreview} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
              {t('cancel')}
            </button>
            <button type="submit" className={styles.submitButton}>
              <Icon icon="material-symbols:save" />
              {t('saveMusic')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMusic;