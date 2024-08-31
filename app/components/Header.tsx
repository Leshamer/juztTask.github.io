import React from 'react';
import Link from 'next/link';

export default function HeaderInfo () {
    return(
        <header>
            <div className='leftPart'></div>
            <div className="headerTitle">
                <h1>Тачки.Ваши</h1>
                <h2>Размещение объявлений о продаже машин</h2>
            </div>
            <nav className="navigation">
                <ul className="navigationItems">
                <Link href="/"><li>Главная страница</li></Link>
                <Link href="/add-car"><li>Разместить объявление</li></Link>
                </ul>
            </nav>
        </header>
    );
}