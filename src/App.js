import React, {useState} from 'react';
import Form from './components/Form';

function App() {
    const jsonLocalStorage = {
        setItem: (key, value) => {
            localStorage.setItem(key, JSON.stringify(value));
        },
        getItem: (key) => {
            return JSON.parse(localStorage.getItem(key));
        },
    };
    const Title = (props) => {
        return (
            <div>
                <h1>{props.children}</h1>
            </div>
        )
    }

    // const Form = ({ updateMainCat }) => {
    //     const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    //     const [value, setValue] = useState('')
    //     const [errorMessage, setErrorMessage] = useState('')
    //
    //     const handleInputChange = (e) => {
    //         const userValue = e.target.value;
    //         setErrorMessage('')
    //         if (includesHangul(userValue)) {
    //             setErrorMessage('한글은 입력할 수 없습니다.')
    //         }
    //         setValue(userValue.toUpperCase())
    //     }
    //     const handleFormSubmit = (e) => {
    //         e.preventDefault();
    //         setErrorMessage('')
    //
    //         if (value === '') {
    //             setErrorMessage('빈 값으로 만들 수 없습니다.')
    //             return
    //         }
    //         updateMainCat();
    //     }
    //
    //     return (
    //         <form onSubmit={handleFormSubmit}>
    //             <input type="text" name="name" placeholder="영어 대사를 입력해주세요" value={value} onChange={handleInputChange} />
    //             <button type="submit">생성</button>
    //             <p style={{ color: 'red' }}>{errorMessage}</p>
    //         </form>
    //     )
    // }

    function CatItem(props) {
        return (
            <li>
                <img src={props.img} style={{ width: "150px" }} />
            </li>
        )
    }
    function Favorites({ favorites }) {

        return (
            <ul className="favorites">
                {favorites.map((cat) => (
                    <CatItem key={cat} img={cat} />
                ))}
            </ul>
        )
    }
    const MainCard = ({ img, onHeartClick }) => {

        return (
            <div className="main-card">
                <img src={img} alt="고양이" width="400" />
                <button onClick={onHeartClick}>🤍</button>
            </div>
        )
    }
    const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
    const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
    const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";
    const [counter, setCounter] = useState(jsonLocalStorage.getItem("counter"));
    //localStorage로 가져온 값이 string값으로 가져와지기 떄문에 number로 바꿔야 counter값이 제대로 잘 더해진다.
    const [mainCat, setMainCat] = useState(CAT1);
    const [favorites, setFavorites] = useState(jsonLocalStorage.getItem("favorites") || [])

    const updateMainCat = () => {
        setMainCat(CAT2)
        const nextCounter = counter + 1
        setCounter(nextCounter)
        jsonLocalStorage.setItem("counter", nextCounter)
    }
    function handleHeartClick() {
        const nextFavorites = [...favorites, mainCat]
        setFavorites(nextFavorites)
        jsonLocalStorage.setItem('favorites', nextFavorites)
    }
  return (
    <div className="App">
        <Title>{counter}번째 고양이 가라사대</Title>
        <Form updateMainCat={updateMainCat} />
        <MainCard img={mainCat} onHeartClick={handleHeartClick} />
        <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
