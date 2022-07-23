import { useEffect, useState } from 'react';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { fetchItemsWithQuery } from '../../api/fetchItemsWithQuery';
import styles from './App.module.css';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bigImg, setBigImg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchItems(query, page);
    }
  }, [query, page]);

  const onOpenModal = bigImg => {
    setIsModalOpen(true);
    setBigImg(bigImg);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchItems = async (queryArg, pageArg) => {
    setIsLoading(true);

    await fetchItemsWithQuery(queryArg, pageArg)
      .then(res => setItems(prevItems => [...prevItems, ...res]))
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const queryFromInput = e.target.elements.query.value;

    if (queryFromInput !== query) {
      setPage(1);
      setQuery(queryFromInput);
      setItems([]);
    }

    e.target.reset();
  };

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handleSubmit} />
      {isModalOpen && (
        <Modal bigImg={bigImg} handleCloseModal={handleCloseModal} />
      )}
      {error && (
        <div>
          {error}
          <p>Sorry, try again.</p>
        </div>
      )}

      <ImageGallery items={items} onOpenModal={onOpenModal}>
        {isLoading && <Loader />}

        {items.length > 0 && <LoadMoreBtn onClick={loadMore} />}
      </ImageGallery>
    </div>
  );
};