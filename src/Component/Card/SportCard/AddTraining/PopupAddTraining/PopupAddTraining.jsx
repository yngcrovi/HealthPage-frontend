import { useState } from 'react';
import styles from './PopupAddTraining.module.css'
import stylesPopup from './PopupAdditInfoTraining/PopupAdditInfoTraining.module.css'
import CloseIcon from '@mui/icons-material/Close';

export default function PopupAddTraining(obj) {
    const [quantityExercise, setQuantityxercise] = useState([1])
    const [loadType, setLoadType] = useState('')
    const [partOfBody, setPartOfBody] = useState([])
    const [partOfMuscle, setPartOfMuscle] = useState([])
    const [exercise, setExercise] = useState([])
    const [approachNumber, setApproachNumber] = useState([[1]])
    const [typeWeight, setTypeWeight] = useState(['kg'])
    
    //Проследить, чтобы при отправке на бэк не было лишних типа веса, так как при нажатии плюс автоматически 
    //Добавляется тип веса кг
    //В селект полях после создания бэка замапить объекты
    //Спросить по поводу [0], [i] при изменении свойств css
    //Сделать изменение стилей наподобие селектаЛТ

    let styleSelectLT = document.getElementsByClassName(`${styles.selectLT}`)[0]


    const closePopup = () => {
        document.getElementsByClassName(`${styles.popup}`)[0].style.display = 'none';
        setQuantityxercise([1])
        setLoadType('')
        setPartOfBody([])
        setPartOfMuscle([])
        setExercise([])
        approachNumber([[1]])
        setTypeWeight(['kg'])
    }

    const sendTraining = () => {
        let weight = []
        let ap = [[]]
        var error = false
        for (let i = 0; i < quantityExercise.length; i++) {
            if(typeof partOfBody[i] === 'undefined'){
                document.getElementById(`${'pob' + `${i}`}`).style.border = '2px solid red';
                error = true
            }
            if(typeof exercise[i] === 'undefined'){
                document.getElementById(`${'exercise' + `${i}`}`).style.border = '2px solid red';
                error = true
            }  
            //не равно нулл, исправить
            if(typeof partOfMuscle[i] === 'undefined' && document.getElementById(`${'pom' + `${i}`}`) != null){
                document.getElementById(`${'pom' + `${i}`}`).style.border = '2px solid red';
                error = true
            }
            if(document.getElementById('weight' + `${i+1}`).value != ''){
                weight[i] = document.getElementById('weight' + `${i+1}`).value;
            }else{
                document.getElementById('weight' + `${i+1}`).style.border = '2px solid red';
                error = true
            }
        }
        for (let i = 0; i < approachNumber.length; i++) {
            for (let j = 0; j < approachNumber[i].length; j++) {
                if(document.getElementById('ap' + `${i+1}` + `${j+1}`).value != ''){
                    if (j == 0){
                        ap = [...ap, []];
                    }
                    ap[i][j] = document.getElementById('ap' + `${i+1}` + `${j+1}`).value;
                }else{
                    document.getElementById('ap' + `${i+1}` + `${j+1}`).style.border = '2px solid red';
                    error = true  
                } 
            }   
        }
        if(error){
            return
        }
        //part_of_muscle поменять
        obj.setBody({
            'load_type': loadType,
            'exercise': exercise,
            'weight': weight,
            'type_weight': typeWeight,
            'number_of_repetitions': ap,
        })
        console.log(error)
        document.getElementsByClassName(`${styles.popup}`)[0].style.display = 'none';
        document.getElementsByClassName(`${stylesPopup.popup}`)[0].style.display = 'block';

    }

    return (
        <>
        <div className={styles.popup}>
            <div className={styles.body}>
            <CloseIcon 
                className={styles.closePopup}
                onClick={closePopup}
            />
                <div className={styles.divLT}>
                    <select
                        className={styles.selectLT}
                        onChange={(event) => {
                            setLoadType(event.target.value)
                            styleSelectLT.style.color = 'black'
                            styleSelectLT.style.border = '2px solid black';
                        }}
                    >
                        <option selected hidden>Тип нагрузки...</option>
                        <option className={styles.variantSelect} value='Силовая'>Силовые</option>
                        <option className={styles.variantSelect} value={20}>Кардио</option>
                    </select>
                </div>
                {loadType !== '' &&
                    quantityExercise.map((el, i) => 
                    <>
                    <p className={styles.numberExercise}>{i+1}.</p>
                    <select
                        className={styles.selectPOB}
                        id = {'pob' + `${i}`}
                        onChange={(event) => {
                            var helpArr = [...partOfBody]
                            helpArr[i] = event.target.value
                            setPartOfBody(helpArr)
                            document.getElementsByClassName(`${styles.selectPOB}`)[i].style.color = 'black';
                            document.getElementById(`${'pob' + `${i}`}`).style.border = '2px solid black';
                    }}
                    >
                        <option selected hidden>Часть тела...</option>
                        <option className={styles.variantSelect} value='Спина'>Спина</option>
                        <option className={styles.variantSelect} value='Грудь'>Грудь</option>
                    </select>
                    {
                        ['Грудь', 'Плечи', 'Руки'].includes(partOfBody[i]) &&
                        <>
                        <select
                            className={styles.selectPOM}
                            id = {'pom' + `${i}`}
                            onChange={(event) => {
                                var helpArr = [...partOfMuscle]
                                helpArr[i] = event.target.value
                                setPartOfMuscle(helpArr)
                                //Окрашивается неверно, что при выборе пом, что после после подсвечивания ошибки - исправить
                                document.getElementsByClassName(`${styles.selectPOM}`)[partOfMuscle.length].style.color = 'black';
                                document.getElementById(`${'pom' + `${i}`}`).style.border = '2px solid black';
                        }}
                        >
                            <option selected hidden>Часть мышцы...</option>
                            <option className={styles.variantSelect} value='Верхний сегмент'>Верхний сегмент</option>
                            <option className={styles.variantSelect} value='Средний сегмент'>Средний сегмент</option>
                        </select>
                        </>
                    }
                    {
                        partOfBody[i] !== '' &&
                        <>
                        <div>
                            <select
                                className={styles.selectExercise}
                                id = {'exercise' + `${i}`}
                                onChange={(event) => {
                                    var helpArr = [...exercise]
                                    helpArr[i] = event.target.value
                                    setExercise(helpArr)
                                    document.getElementsByClassName(`${styles.selectExercise}`)[i].style.color = 'black';
                                    document.getElementById(`${'exercise' + `${i}`}`).style.border = '2px solid black';
                            }}
                            >
                                <option selected hidden>Назавние упражнения...</option>
                                <option className={styles.variantSelect} value='Подтягивания'>Подтягивания</option>
                                <option className={styles.variantSelect} value='Отжимания'>Отжимания</option>
                            </select>
                        </div>
                        </> 
                    }
                    {
                        <>
                        <div className={styles.divWeight}>
                        <input 
                            className={styles.inputWeight} 
                            id={'weight' + `${i+1}`}
                            type='number'
                            onChange={() => {
                                document.getElementById('weight' + `${i+1}`).style.border = '2px solid black';
                            }}
                        />
                        <select
                            className={styles.selectTW}
                            onChange={(event) => {
                                var helpArr = [...typeWeight]
                                helpArr[i] = event.target.value
                                setTypeWeight(helpArr)
                            }}
                        >
                            <option value='kg'>kg</option>
                            <option value='ibs'>ibs</option>
                        </select>
                        </div>
                        </>
                    }
                    {
                        <>
                        <p className={styles.textAN}>Введите количество повторений:</p>
                        <div className={styles.divAN}>
                        {approachNumber[i].map((el, j) => 
                            <>
                            <input 
                                className={styles.inputAN} 
                                type='number'
                                id={'ap' + `${i+1}` + `${j+1}`}
                                onChange={() => {
                                    document.getElementById('ap' + `${i+1}` + `${j+1}`).style.border = '2px solid black';
                                }}
                            />
                            </>
                        )}
                        <button className={styles.addAN} onClick={() => {
                            var helpArr = [...approachNumber]
                            helpArr[i][helpArr[i].length] = 1
                            setApproachNumber(helpArr)
                        }}>+</button>
                        {approachNumber[i].length > 1 &&
                            <button className={styles.delAN} onClick={() => {
                                var helpArr = [...approachNumber]
                                helpArr[i].pop()
                                setApproachNumber(helpArr)
                            }}>-</button>
                        }
                        </div>
                        </>
                    }
                    {
                        i + 1 == quantityExercise.length &&
                        <>
                        <button className={styles.buttonAddExercise} onClick={() => {
                            setQuantityxercise([...quantityExercise, 1])
                            setApproachNumber([...approachNumber, [1]])
                            setTypeWeight([...typeWeight, 'kg'])
                            if (!partOfMuscle[i]){
                                var helpArr = [...partOfMuscle]
                                helpArr[i] = ''
                                setPartOfMuscle(helpArr)
                            }
                        }}>+</button>
                    {
                        i > 0 &&
                        <>
                        <button className={styles.buttonDelExercise} onClick={() => {
                            var helpArr = [...quantityExercise]
                            helpArr.pop()
                            setQuantityxercise(helpArr)
                            helpArr = [...approachNumber]
                            helpArr.pop()
                            setApproachNumber(helpArr)
                            helpArr = [...typeWeight]
                            helpArr.pop()
                            setTypeWeight(helpArr)
                        }}>-</button>
                        </>
                    }
                    {
                        i >= 0 &&
                        <button className={styles.buttonSendTraining} onClick={sendTraining}>Добавить</button>
                    }
                        </>
                    }
                    </> 
                    )
                }
            </div>
        </div>
        </>
    )
}