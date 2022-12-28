
import styles from "./hero.module.css"
import React, { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Hero(){

    const slide1 = <div className={styles.card}>
        <div className={styles.heroContent}>
            <h1>
                Launching<br/>this February
            </h1>
        </div>
        <div className={styles.herographics}>
            <img src="/hero/phones.png" alt="" />
        </div>
    </div>

    return(
        <section className={styles.hero}>
            <Swiper
            spaceBetween={50}
            slidesPerView={1}
            modules={[Pagination]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{ clickable: true }}
            className={styles.carousel}
            >
                <SwiperSlide>{slide1}</SwiperSlide>
                <SwiperSlide>{slide1}</SwiperSlide>
                <SwiperSlide>{slide1}</SwiperSlide>
                <SwiperSlide>{slide1}</SwiperSlide>
            </Swiper>
        </section>
    );
};