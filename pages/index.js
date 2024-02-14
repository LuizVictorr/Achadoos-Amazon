// pages/index.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebase from '../services/firebase';
import styles from '../styles/index.module.css';
import { FaFacebook, FaInstagram, FaYoutube, FaPinterest, FaTiktok } from 'react-icons/fa'
import Head from 'next/head';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = firebase.database();
        const ref = db.ref('products');

        const snapshot = await ref.once('value');
        const data = snapshot.val();

        const productList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const itemsPerPage = 40;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reinicia para a primeira página ao alterar o termo de pesquisa
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reinicia para a primeira página ao alterar a categoria
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <div>Carregando...</div>;

  const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Head>
        <title>Dinâmico Tech</title>
        <meta
          name="Melhores Produtos"
          content="Produtos elegantes para facilitar sua vida."
        />
        <link rel="icon" href="/dinamico-tech.png" />
      </Head>
      
    <div className={styles.container}>
      <div className={styles.box}>
      <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
      <div className={styles.bannerOverlay}></div>
      <img src="/dinamico-tech.png" alt="Oferta Especial" />
        <h2>Melhores Produtos</h2>
        <p>Produtos elegantes para facilitar sua vida</p>
      </div>
    </div>
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.categorySelect}
        >
          <option value="">Categorias</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul className={styles.productGrid}>
        {currentProducts.map((product) => (
          <li className={styles.productItem} key={product.id}>
            <Link href={`/product/${product.id}`}>
              <img src={product.photo} alt={product.name} />
              <p>{product.name}</p>
              <strong>{product.category}</strong>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
          <button onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
          <span className={styles.pageIndicator}>
            {currentPage} / {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>&gt;</button>
        </div>
      </div>
      </div>
      <footer className={styles.footer}>
      <div className={styles.socialMedia}>
        <a href="https://www.facebook.com/profile.php?id=61555694101933" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/dinamicotech/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.youtube.com/channel/UCYdSeDHJocMbMAfkj7k3oYA" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
        <a href="https://br.pinterest.com/DinamicoTech/" target="_blank" rel="noopener noreferrer">
        <FaPinterest />
        </a>
        <a href="https://www.tiktok.com/@dinamico_tech" target="_blank" rel="noopener noreferrer">
        <FaTiktok />
        </a>
      </div>
      <div className={styles.footerText}>
        <p>Dinâmico Tech © 2024. Todos os direitos reservados.</p>
        <p>
          <a href="/termosUso">Termos de Uso</a> |{' '}
          <a href="/politicasPrivacidade">Políticas de Privacidade</a>
        </p>
      </div>
    </footer>
    </div>
  );
};

export default HomePage;
