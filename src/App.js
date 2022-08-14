import React, { useState, useEffect } from 'react'
import './App.css'
import Title from './components/Title';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';
import Form from './components/Form';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};
const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";
  const [counter, setCounter] = useState(() => {
    return jsonLocalStorage.getItem("counter");
  })
  // localStorage의 불필요한 호출을 줄이기 위해 useState 안에 함수를 넣어줌. 한번만 호출되게 하기 위해
  //localStorage로 가져온 값이 string값으로 가져와지기 떄문에 number로 바꿔야 counter값이 제대로 잘 더해진다.
  const [mainCat, setMainCat] = useState(CAT1);
  const [favorites, setFavorites] = useState(() => {
    return jsonLocalStorage.getItem("favorites") || []
  })
  const alreadyFavorite = favorites.includes(mainCat)

  const setInitialCat = async () => {
    const newCat = await fetchCat('First cat');
    setMainCat(newCat);
  }

  useEffect(() => {
    setInitialCat()
  }, [])
  const updateMainCat = async (value) => {
    const newCat = await fetchCat(value)

    setMainCat(newCat)

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    })
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat]
    setFavorites(nextFavorites)
    jsonLocalStorage.setItem('favorites', nextFavorites)
  }
  const counterTitle = counter === null ? '' : `${counter}번째 `
  return (
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  )
}

export default App;
