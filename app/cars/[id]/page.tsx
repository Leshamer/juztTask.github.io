import { use } from 'react';
import axios from 'axios';
import styles from './СarInfo.module.scss';

interface Car {
    id: number;
    image: string;
    brand: string;
    model: string;
    color: string;
    price: number;
    year: number;
    engineType: string;
    transmission: string;
    range: number;
    about: string;
}

async function fetchCar(id: string) {
    try {
        const response = await axios.get(`http://localhost:3000/api/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке данных о машине:', error);
        return null;
    }
}

export default function CarDetails({ params }: { params: { id: string } }) {
    const { id } = params;

    const car = use(fetchCar(id));

    if (!car) {
        return <div>Машина не найдена</div>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.image}>
                    <img src={car.image} alt={`${car.brand} ${car.model}`} className={styles.image} />
                </div>
                <h2>{car.brand} {car.model}</h2>
                <p><span>Цена:</span> {car.price}</p>
                <p><span>Год:</span> {car.year}</p>
                <p><span>Цвет:</span> {car.color}</p>
                {car.engineType === "Бензиновый" || car.engineType === "Дизельный" ? (
                    <div className={styles.techInfo}>
                        <h3>Техническая информация</h3>
                        <p><span>Тип Двигателя:</span> {car.engineType}</p>
                        <p><span>Трансмиссия:</span> {car.transmission}</p>
                        <p><span>Запас Хода:</span> {car.range}км</p>
                    </div>
                ) : car.engineType === 'Электрический' ? (
                    <div className={styles.techInfo}>
                        <h3>Техническая информация</h3>
                        <p><span>Тип Двигателя:</span> {car.engineType}</p>
                        <p><span>Трансмиссия:</span> {car.transmission}</p>
                        <p><span>Запас Хода:</span> {car.range}км</p>
                    </div>
                ) : null}
                <div className={styles.about}>
                    <h3>О Машине</h3>
                    <p>{car.about}</p>
                </div>
            </div>
        </div>
    );
}
