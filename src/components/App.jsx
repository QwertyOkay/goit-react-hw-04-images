import { useState, useEffect } from 'react';
import { fetchData } from 'services/API';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import SearchBar from './SearchBar/SearchBar';
import { MyBtn } from './styled.module';

const App = () => {
  const [data, setData] = useState([]);
  const [submit, setSubmit] = useState('');
  const [isNewSearch, setIsNewSearch] = useState(true);
  const [isData, setIsData] = useState(false);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    setLoader(true);

    fetchData(page, submit)
      .then(({ data: { hits } }) => {
        return hits;
      })
      .then(data => {
        if (isNewSearch) {
          setData(data);
          return data;
        }
        setData(prev => [...prev, ...data]);
      })
      .then(data => checkData(data))
      .finally(() => {
        setLoader(false);
      })
      .catch(err => console.log(err));
  }, [page, submit, isNewSearch]);

  const handleSubmit = text => {
    setIsNewSearch(true);
    setSubmit(text);
    setPage(1);
  };

  const handleClick = () => {
    setIsNewSearch(false);
    setPage(prev => prev + 1);
  };

  const handleModalOpen = id => {
    const dataItmes = data.filter(item => item.id === id);

    if (!dataItmes || dataItmes.length === 0) {
      return;
    }

    const { largeImageURL, tags } = dataItmes[0];

    setModalData({ largeImageURL, tags });
  };

  const handleModalClose = e => {
    setModalData(null);
  };

  const checkData = data => {
    data.length >= 0 && data.length < 11 ? setIsData(false) : setIsData(true);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} inputText={submit} />
      <ImageGallery dataImage={data} handleId={handleModalOpen} />

      {loader && <Loader />}

      {isData && (
        <MyBtn type="button" onClick={handleClick}>
          Load more
        </MyBtn>
      )}

      {modalData !== null && (
        <Modal data={modalData} close={handleModalClose} />
      )}
    </div>
  );
};

export default App;
