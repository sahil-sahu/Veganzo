import Head from 'next/head'
import Image from 'next/image'
import { NextSeo } from 'next-seo';
import Hero from '../components/hero/hero';
import Category from '../components/category/category';
import Blog from '../components/blog/blog';
import Product from '../components/product/product';

import Header from '../components/header/header';

export default function Home() {
  return (
    <>
      <NextSeo
          title="Veganzo"
          description=""
        />
      <main>
        <Header></Header>
        <Hero></Hero>
        <Category></Category>
        <Blog></Blog>
        <Product></Product>
      </main>
    </>
  )
}
