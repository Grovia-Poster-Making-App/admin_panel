import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './MusicList.module.scss';

interface Music {
  id: string;
  title: string;
  artist: string;
  category: string;
  duration: string;
  fileSize: string;
  uploadDate: string;
  isActive: boolean;
}

const MusicList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  // Dummy music data
  const musicData: Music[] = useMemo(() => [
    {
      id: '1',
      title: 'Background Music 1',
      artist: 'Artist One',
      category: 'Background',
      duration: '3:45',
      fileSize: '2.5 MB',
      uploadDate: '2024-01-15',
      isActive: true
    },
    {
      id: '2',
      title: 'Celebration Theme',
      artist: 'Artist Two',
      category: 'Celebration',
      duration: '2:30',
      fileSize: '1.8 MB',
      uploadDate: '2024-01-14',
      isActive: true
    },
    {
      id: '3',
      title: 'Motivational Track',
      artist: 'Artist Three',
      category: 'Motivational',
      duration: '4:12',
      fileSize: '3.2 MB',
      uploadDate: '2024-01-13',
      isActive: false
    },
    {
      id: '4',
      title: 'Corporate Jingle',
      artist: 'Artist Four',
      category: 'Corporate',
      duration: '1:30',
      fileSize: '1.2 MB',
      uploadDate: '2024-01-12',
      isActive: true
    },
    {
      id: '5',
      title: 'Ambient Soundscape',
      artist: 'Artist Five',
      category: 'Ambient',
      duration: '5:20',
      fileSize: '4.1 MB',
      uploadDate: '2024-01-11',
      isActive: true
    },
    {
      id: '6',
      title: 'Jingle Bell Rock',
      artist: 'Artist Six',
      category: 'Jingle',
      duration: '2:15',
      fileSize: '1.7 MB',
      uploadDate: '2024-01-10',
      isActive: false
    }
  ], []);

  const categories = ['all', 'Background', 'Celebration', 'Motivational', 'Ambient', 'Corporate', 'Jingle'];

  const filteredMusic = useMemo(() => {
    return musicData.filter(music => {
      const matchesSearch = music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           music.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || music.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, musicData]);

  const handlePlayPause = (musicId: string) => {
    if (currentAudio === musicId) {
      setCurrentAudio(null);
    } else {
      setCurrentAudio(musicId);
    }
  };

  const handleView = (id: string) => {
    console.log("View music:", id);
    // Add view logic here
  };

  const handleEdit = (id: string) => {
    console.log("Edit music:", id);
    // Add edit logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete music:", id);
    // Add delete logic here
  };

  const handleAddMusic = () => {
    navigate('/music/add');
  };

  return (
    <section className={styles.musicSection}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Music</h2>
        </div>
        <div className={styles.actionSection}>
          <div className={styles.createButtonContainer}>
            <button 
              className={styles.createButton}
              onClick={handleAddMusic}
            >
              <span className={styles.buttonIcon}>+</span>
              Add Music
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search music..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
        
        <div className={styles.categoryFilter}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="all">All Categories</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Music Grid */}
      <div className={styles.musicGrid}>
        {filteredMusic.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎵</div>
            <h3>No music found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredMusic.map((music) => (
            <div key={music.id} className={styles.musicCard}>
              <div className={styles.musicPreview}>
                <div className={styles.musicIcon}>
                  🎵
                </div>
                <div className={styles.playOverlay}>
                  <button
                    onClick={() => handlePlayPause(music.id)}
                    className={styles.playButton}
                  >
                    <Icon 
                      icon={currentAudio === music.id ? "material-symbols:pause" : "material-symbols:play-arrow"} 
                    />
                  </button>
                </div>
              </div>
              
              <div className={styles.musicInfo}>
                <h3 className={styles.musicTitle}>{music.title}</h3>
                <div className={styles.musicMeta}>
                  <span className={styles.artist}>by {music.artist}</span>
                  <span className={styles.category}>{music.category}</span>
                </div>
                <div className={styles.musicDetails}>
                  <span className={styles.duration}>⏱️ {music.duration}</span>
                  <span className={styles.fileSize}>📁 {music.fileSize}</span>
                </div>
                <div className={styles.uploadInfo}>
                  <span className={styles.uploadLabel}>Uploaded:</span>
                  <span className={styles.uploadDate}>{music.uploadDate}</span>
                </div>
                <div className={styles.statusInfo}>
                  <span className={`${styles.status} ${music.isActive ? styles.active : styles.inactive}`}>
                    {music.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className={styles.musicActions}>
                <button
                  className={`${styles.actionButton} ${styles.viewButton}`}
                  onClick={() => handleView(music.id)}
                  title="View Music"
                >
                  👁️
                </button>
                <button
                  className={`${styles.actionButton} ${styles.editButton}`}
                  onClick={() => handleEdit(music.id)}
                  title="Edit Music"
                >
                  ✏️
                </button>
                <button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => handleDelete(music.id)}
                  title="Delete Music"
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

export default MusicList;
