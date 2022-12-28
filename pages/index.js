import Head from 'next/head'
import Image from 'next/image'
import { NextSeo } from 'next-seo';
import Hero from '../components/hero/hero';
import Category from '../components/category/category';

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
      </main>
    </>
  )
}
