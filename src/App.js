import { useEffect, useState } from 'react';

/*
 "confirmed": {
    "value": 540643457,
    "detail": "https://covid19.mathdro.id/api/confirmed"
  },
  "recovered": {
    "value": 0,
    "detail": "https://covid19.mathdro.id/api/recovered"
  },
  "deaths": {
    "value": 6322412,
    "detail": "https://covid19.mathdro.id/api/deaths"
  },
  "dailySummary": "https://covid19.mathdro.id/api/daily",
  "dailyTimeSeries": {
    "pattern": "https://covid19.mathdro.id/api/daily/[dateString]",
    "example": "https://covid19.mathdro.id/api/daily/2-14-2020"
  },
  "image": "https://covid19.mathdro.id/api/og",
  "source": "https://github.com/mathdroid/covid19",
  "countries": "https://covid19.mathdro.id/api/countries",
  "countryDetail": {
    "pattern": "https://covid19.mathdro.id/api/countries/[country]",
    "example": "https://covid19.mathdro.id/api/countries/USA"
  },
  "lastUpdate": "2022-06-22T10:20:37.000Z"
*/
const App = () => {
  const [counterName, setCountryName] = useState('');
  const [searchedCountry, setSearchedCountry] = useState('Global');
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [deathCount, setDeathCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');
  const [imge, setImage] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDataFromApi = async () => {
      const request = await fetch('https://covid19.mathdro.id/api');
      const data = await request.json();
      setConfirmedCount(data.confirmed.value);
      setDeathCount(data.deaths.value);
      setImage(data.image);
      setLastUpdate(data.lastUpdate);
      setSource(data.source);
      setLoading(false);
    };
    getDataFromApi();
  }, []);

  const onClick = async (e) => {
    setLoading(true);
    const request = await fetch(
      'https://covid19.mathdro.id/api/countries/' + counterName
    );
    const data = await request.json();

    setLoading(false);
    if (request.status !== 200) {
      alert(data.error.message);
      return;
    }
    setSearchedCountry(counterName);
    setConfirmedCount(data.confirmed.value);
    setDeathCount(data.deaths.value);
    setLastUpdate(data.lastUpdate);
    setCountryName('');
  };

  const onPress = async (e) => {
    console.log('On press added !');
    console.log('On press added 2!');
  };

  const onDelete = async (e) => {
    console.log('On press added !');
    console.log('On press added 2!');
  };

  console.log('Hey from react');
  return (
    <div className='container'>
      {loading ? (
        <div className='d-flex justify-content-center'>
          <div
            style={{ width: '10rem', height: '10rem' }}
            className='spinner-border'
            role='status'
          >
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h1 className='text-center'>Covid-19 tracker</h1>
          <img
            src={imge}
            width='800rem'
            height='500rem'
            alt='covid19'
            className='rounded mx-auto d-block'
          ></img>
          <div className='input-group  mt-3'>
            <input
              type='text'
              value={counterName}
              onChange={(e) => setCountryName(e.target.value)}
              className='form-control'
              placeholder='Country name'
            />
            <button
              onClick={onClick}
              className='btn btn-outline-secondary'
              type='button'
            >
              Get data
            </button>

            <h3 className='text-center mt-3 w-100'>
              The total number of covid 19 cases for{' '}
              <span style={{ color: 'red' }}>{searchedCountry}</span> as follow
              :
            </h3>

            <div className='data mt-3'>
              <div className='text-center'>
                <h3>Confirmed count</h3>
                <h3>{confirmedCount}</h3>
              </div>
              <div className='text-center'>
                <h3>Deaths count</h3>
                <h3>{deathCount}</h3>
              </div>
            </div>

            <h4 className='text-center mt-3 w-100'>
              Last update : {lastUpdate}
            </h4>
            <h4 className='text-center mt-3 w-100'>
              <a href={source}>Source </a>{' '}
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
