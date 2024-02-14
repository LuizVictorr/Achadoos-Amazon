// pages/product/[productId].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from '../../services/firebase';
import styles from '../../styles/productId.module.css'
import { FaFacebook, FaInstagram, FaYoutube, FaPinterest, FaTiktok } from 'react-icons/fa'
import Head from "next/head"


const ProductDetailPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const db = firebase.database();
        const ref = db.ref(`products/${productId}`);
        const snapshot = await ref.once('value');
        const productData = snapshot.val();

        if (productData) {
          setProduct(productData);
        } else {
          console.error('Produto não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleBuyNow = () => {
    if (product && product.link) {
      window.open(product.link, '_blank');
    }
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Head>
        <title>Dinâmico Tech</title>
        <meta
          name="Melhores Produtos"
          content="Produtos elegantes para facilitar sua vida."
        />
        <link rel="icon" href="/dinamico-tech.png" />
      </Head>3
    <div className={styles.container}>
    <div className={styles.productDetailsContainer}>
      <h1>{product.name}</h1>
      <img src={product.photo} alt={product.name} width='200' height='100' />
      {product.link && (
        <div>
          <button className={styles.buyNowButton} onClick={handleBuyNow}>Comprar Agora</button>
        </div>
      )}
      <p>{product.description}</p>
      
      {product.video && (
        <div>
          <iframe
            width="400"
            height="315"
            src={product.video}
            title="Embedded Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        
      )}

<a className={styles.button} href='/'>Voltar</a>
      
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

export default ProductDetailPage;
