"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddCar() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState<number | undefined>(undefined);
    const [color, setColor] = useState("");
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [engineType, setEngineType] = useState("");
    const [transmission, setTransmission] = useState("");
    const [range, setRange] = useState("");
    const [about, setAbout] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("year", year?.toString() || "");
        formData.append("color", color);
        formData.append("price", price?.toString() || "");
        if (imageFile) {
            formData.append("image", imageFile);
        }
        formData.append("engineType", engineType);
        formData.append("transmission", transmission);
        formData.append("range", range?.toString() || "");
        formData.append("about", about);

        try {
            const response = await axios.post("/api/cars", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Car added successfully:", response.data);
            router.push("/"); 
        } catch (error) {
            console.error("Ошибка при добавлении автомобиля:", error);
        }
    };

    return(
       <main className="addCarWrapper">
            <div className="formContent">
                <h1>Добавьте Своё Объявление</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="brand">Бренд:</label>
                    <input
                        type="text"
                        id="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                        <label htmlFor="model">Модель:</label>
                        <input
                            type="text"
                            id="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                    <label htmlFor="year">Год выпуска:</label>
                    <input
                        type="number"
                        id="year"
                        value={year || ""}
                        onChange={(e) => setYear(Number(e.target.value))}
                        required
                    />
                    </div>
                    <div>
                        <label htmlFor="color">Цвет:</label>
                        <input
                            type="text"
                            id="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Цена:</label>
                        <input
                            type="number"
                            id="price"
                            value={price || ""}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="engineType">Тип Двигателя:</label>
                        <select
                            id="engineType"
                            value={engineType}
                            onChange={(e) => setEngineType(e.target.value)}
                            required
                        >
                            <option value="">Выберите тип двигателя</option>
                            <option value="diesel">Дизельный</option>
                            <option value="electric">Электрический</option>
                            <option value="gasoline">Бензиновый</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="transmission">Трансмиссия</label>
                        <select
                            id="transmission"
                            value={transmission}
                            onChange={(e) => setTransmission(e.target.value)}
                            required
                        >
                            <option value="">Выберите тип Трансмиссии</option>
                            <option value="Auto">Автоматическая</option>
                            <option value="manual">Ручная</option>
                            <option value="robotized">Роботизированная</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="range">Запас Хода:</label>
                        <input
                            type="text"
                            id="range"
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="about">О Машине:</label>
                        <textarea
                            id="about"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Изображение:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                            required
                        />
                    </div>
                    <button type="submit">Добавить автомобиль</button>
                </form>
            </div>
        </main>
    );
}
