"use client";
import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './СarCard.module.scss';
import Link from 'next/link';

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

type SortOrder = 'asc' | 'desc' | 'original';

export default function СarCard() {
    const [originalCars, setOriginalCars] = useState<Car[]>([]); 
    const [cars, setCars] = useState<Car[]>([]);
    const [sortOrderYear, setSortOrderYear] = useState<SortOrder>('original');
    const [sortOrderPrice, setSortOrderPrice] = useState<SortOrder>('original');
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [availableBrands, setAvailableBrands] = useState<string[]>([]);
    const [availableColors, setAvailableColors] = useState<string[]>([]);


    useEffect(() => {
        async function fetchCars() {
            const response = await axios.get('api/cars');
            const brands: string[] = Array.from(new Set(response.data.map((car: Car) => car.brand)));
            const colors: string[] = Array.from(new Set(response.data.map((car: Car) => car.color)));
            setAvailableBrands(brands);
            setAvailableColors(colors);
            setOriginalCars(response.data);
            setCars(response.data);
        }
        fetchCars();
    }, []);

    useEffect(() => {
        applyFiltersAndSort();
    }, [selectedBrand, selectedColor, sortOrderYear, sortOrderPrice]);

    const applyFiltersAndSort = () => {
        let filteredCars = [...originalCars];

        if (selectedBrand) {
            filteredCars = filteredCars.filter(car => car.brand === selectedBrand);
        }

        if (selectedColor) {
            filteredCars = filteredCars.filter(car => car.color === selectedColor);
        }

        if (sortOrderYear !== 'original') {
            filteredCars.sort((a, b) => sortOrderYear === 'asc' ? a.year - b.year : b.year - a.year);
        }

        if (sortOrderPrice !== 'original') {
            filteredCars.sort((a, b) => sortOrderPrice === 'asc' ? a.price - b.price : b.price - a.price);
        }

        setCars(filteredCars);
    };

    const handleSortYear = () => {
        if (sortOrderYear === 'original') {
            setSortOrderYear('asc');
        } else if (sortOrderYear === 'asc') {
            setSortOrderYear('desc');
        } else {
            setSortOrderYear('original');
        }
    };

    const handleSortPrice = () => {
        if (sortOrderPrice === 'original') {
            setSortOrderPrice('asc');
        } else if (sortOrderPrice === 'asc') {
            setSortOrderPrice('desc');
        } else {
            setSortOrderPrice('original');
        }
    };


    return(
        <div className={styles.allContent}>
            <div className={styles.filters}>
                <h2>Фильтры</h2>
                <div>
                    <label htmlFor="year">По году выпуска:</label>
                    <button id="year" name="year" onClick={handleSortYear}>
                        {sortOrderYear === 'original' ? 'Сортировка' : sortOrderYear === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
                <div>
                    <label htmlFor="price">По цене:</label>
                    <button id="price" name="price" onClick={handleSortPrice}>
                        {sortOrderPrice === 'original' ? 'Сортировка' : sortOrderPrice === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
                <div>
                    <p>Фильтр по бренду: </p>
                    <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                        <option value="">Все бренды</option>
                        {availableBrands.map(brand => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Фильтр по цвету: </p>
                    <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                        <option value="">Все цвета</option>
                        {availableColors.map(color => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.wrapper}>
                {cars.map(car => (
                    <div key={car.id} className={styles.card}>
                        <div className={styles.image}>
                            <img src={car.image} alt={`${car.brand} ${car.model}`} className={styles.image} />
                        </div>
                        <h2>{car.brand} {car.model}</h2>
                        <p><span>Год:</span> {car.year}</p>
                        <p><span>Цена:</span> {car.price}</p>
                        <Link href={`/cars/${car.id}`} target="_blank" rel="noopener noreferrer">
                            Подробнее...
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}