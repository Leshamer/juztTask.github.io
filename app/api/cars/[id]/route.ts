import { NextResponse } from 'next/server';
import { cars } from '../cars'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const carId = parseInt(id, 10);

    const car = cars.find(car => car.id === carId);

    if (car) {
        return NextResponse.json(car);
    } else {
        return NextResponse.json({ message: "Машина не найдена" }, { status: 404 });
    }
}
