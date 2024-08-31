import { NextResponse } from "next/server";
import { cars } from "./cars";
import fs from "fs";
import path from "path";

type ResponseData = {
    message: string
}

const carsFilePath = path.join(process.cwd(), "app/api/cars/cars.ts");

function saveCarsData(updatedCars: typeof cars) {
    const content = `export const cars = ${JSON.stringify(updatedCars, null, 2)};`;
    fs.writeFileSync(carsFilePath, content, "utf-8");
}

export async function GET(req: Request,) {
    const { searchParams } = new URL(req.url)

    const sortBy = searchParams.get('sortBy'); 
    const order = searchParams.get('order'); 
    const brand = searchParams.get('brand');
    const color = searchParams.get('color');

    let currentCars = [...cars]; 

    if (brand) {
        currentCars = currentCars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
    }

    if (color) {
        currentCars = currentCars.filter(car => car.color.toLowerCase() === color.toLowerCase());
    }

    if (sortBy) {
        currentCars.sort((a, b) => {
            const valueA = a[sortBy as keyof typeof a] ?? 0;  
            const valueB = b[sortBy as keyof typeof b] ?? 0;

            if (order === 'desc') {
                return valueA > valueB ? -1 : 1;
            } else {
                return valueA < valueB ? -1 : 1;
            }
        });
    }

    return NextResponse.json(currentCars);
}

export async function POST(req: Request) {
    const formData = await req.formData();
    
    const brand = formData.get("brand") as string;
    const model = formData.get("model") as string;
    const year = formData.get("year") as string;
    const color = formData.get("color") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("image") as File;
    const engineType = formData.get("engineType") as string;
    const transmission = formData.get("transmission") as string;
    const range = formData.get("range") as string;
    const about = formData.get("about") as string;


    if (imageFile) {
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        const imagePath = path.join(process.cwd(), "public", imageFile.name);
        fs.writeFileSync(imagePath, imageBuffer);
    }

    const newCar = {
        id: cars.length + 1,
        brand,
        model,
        year: parseInt(year),
        color,
        price: parseFloat(price),
        image: `/${imageFile.name}`,
        engineType,
        transmission,
        range: parseFloat(range),
        about
    };

    const updatedCars = [...cars, newCar];
    saveCarsData(updatedCars);

    return NextResponse.json({ message: "Car added successfully", car: newCar });
}