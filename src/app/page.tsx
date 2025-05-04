"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.page} id="top">
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image 
            src="/ksabox-logo.svg" 
            alt="KsaBox" 
            width={180} 
            height={40}
            priority
          />
        </div>
        <nav className={styles.nav}>
          <a href="#top">INÍCIO</a>
          <a href="/portfolio">PORTFÓLIO</a>
          <a href="#footer">CONTATO</a>
          <a href="/simulador" className={styles.commercial}>SIMULAR</a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Simule e visualize sua casa, escritório ou quarto modular</h1>
            <p className={styles.heroSubtitle}>
              Descubra como é fácil criar e personalizar sua unidade modular! Escolha entre <strong>casa</strong>, <strong>escritório</strong> ou <strong>quarto</strong> e veja uma prévia visual do seu projeto em tempo real, do seu jeito.
            </p>
          </div>
        </section>

        <section className={styles.configuratorDemo}>
          <div className={styles.videoDemoWrapper}>
            <p className={styles.videoDemoText}>
              Assista uma demonstração de como é visualizar e personalizar sua unidade modular na KsaBox:
            </p>
            <video className={styles.videoDemo} controls poster="/video-poster.png" width="800">
              <source src="/demo-video.mp4" type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>
        </section>

        {/* Seção: Dores comuns */}
        <section className={styles.familiarSection}>
          <h2>Você já passou por isso?</h2>
          <div className={styles.familiarCards}>
            <div className={styles.familiarCard}>
              &quot;Quero uma <strong>casa modular</strong>, mas não consigo visualizar como ela ficará antes de fechar negócio.&quot;
            </div>
            <div className={styles.familiarCard}>
              &quot;Preciso de um <strong>escritório modular</strong> personalizado, mas não sei como adaptar cada detalhe ao meu espaço.&quot;
            </div>
            <div className={styles.familiarCard}>
              &quot;Gostaria de um <strong>quarto modular</strong> extra, mas fico inseguro(a) sobre as opções e o preço final.&quot;
            </div>
          </div>
        </section>

        {/* Seção: Solução modular */}
        <section className={styles.solutionSection}>
          <h2>Como a KsaBox resolve para você?</h2>
          <div className={styles.solutionGrid}>
            <div className={styles.solutionItem}>
              <Image src="/solution1.svg" alt="Visualização 3D" width={220} height={160} />
              <h3>Visualização 3D em tempo real para casas modulares</h3>
              <p>
                Veja sua <strong>casa modular</strong> ganhando forma na tela, com todos os detalhes e acabamentos escolhidos por você.
              </p>
            </div>
            <div className={styles.solutionItem}>
              <Image src="/solution2.svg" alt="Personalização fácil" width={220} height={160} />
              <h3>Personalização total para escritórios modulares</h3>
              <p>
                Escolha dimensões, layout, acabamentos, portas, janelas e muito mais para seu <strong>escritório modular</strong>. Tudo de forma simples e intuitiva.
              </p>
            </div>
            <div className={styles.solutionItem}>
              <Image src="/solution3.svg" alt="Orçamento instantâneo" width={220} height={160} />
              <h3>Orçamento instantâneo para quartos modulares</h3>
              <p>
                Veja o preço atualizado conforme personaliza seu <strong>quarto modular</strong>, sem surpresas e com total transparência.
              </p>
            </div>
          </div>
        </section>

        {/* Seção: Como funciona */}
        <section className={styles.getStartedSection}>
          <h2>Como funciona para casas, escritórios e quartos modulares?</h2>
          <ul className={styles.getStartedList}>
            <li>
              <span className={styles.greenDot}></span>
              <div>
                <strong>1. Escolha o tipo de unidade</strong>
                <p>Selecione se deseja simular uma <strong>casa</strong>, <strong>escritório</strong> ou <strong>quarto modular</strong> e comece a personalizar.</p>
              </div>
            </li>
            <li>
              <span className={styles.greenDot}></span>
              <div>
                <strong>2. Personalize cada detalhe</strong>
                <p>Defina medidas, layout, acabamentos, portas, janelas e muito mais para o seu projeto.</p>
              </div>
            </li>
            <li>
              <span className={styles.greenDot}></span>
              <div>
                <strong>3. Visualize em 3D</strong>
                <p>Acompanhe em tempo real como ficará sua unidade modular, de todos os ângulos.</p>
              </div>
            </li>
            <li>
              <span className={styles.greenDot}></span>
              <div>
                <strong>4. Receba o orçamento na hora</strong>
                <p>Veja o valor atualizado conforme faz suas escolhas, sem surpresas.</p>
              </div>
            </li>
            <li>
              <span className={styles.greenDot}></span>
              <div>
                <strong>5. Salve ou envie seu projeto</strong>
                <p>Pronto! Salve sua simulação ou envie para nossa equipe para dar andamento ao seu pedido.</p>
              </div>
            </li>
          </ul>
          <div className={styles.getStartedButtonWrapper}>
            <a href="#simulador" className={styles.getStartedButton}>Comece sua simulação ➔</a>
          </div>
        </section>

        {/* Seção: Dúvida rápida */}
        <section className={styles.quickQuestionSection}>
          <h2>Ficou com dúvida?</h2>
          <a href="#footer" className={styles.contactButton}>Fale com a equipe KsaBox ➔</a>
        </section>

        {/* Seção: FAQ */}
        <section className={styles.faqSection}>
          <h2>Perguntas frequentes sobre casas, escritórios e quartos modulares</h2>
          <div className={styles.faqList}>
            <details>
              <summary>Posso simular qualquer tipo de unidade modular?</summary>
              <p>Sim! Você pode simular <strong>casas</strong>, <strong>escritórios</strong> e <strong>quartos modulares</strong>, escolhendo cada detalhe.</p>
            </details>
            <details>
              <summary>Consigo ver o preço enquanto personalizo?</summary>
              <p>Sim, o orçamento é atualizado automaticamente conforme você faz suas escolhas para casa, escritório ou quarto modular.</p>
            </details>
            <details>
              <summary>É possível salvar ou compartilhar meu projeto?</summary>
              <p>Sim! Você pode salvar sua simulação ou enviar para nossa equipe para receber atendimento personalizado, seja para casa, escritório ou quarto modular.</p>
            </details>
            <details>
              <summary>Como funciona a visualização 3D?</summary>
              <p>Você acompanha em tempo real como ficará sua unidade modular (casa, escritório ou quarto), podendo girar, ampliar e ver todos os detalhes.</p>
            </details>
            <details>
              <summary>Preciso pagar para simular?</summary>
              <p>Não! A simulação é gratuita e sem compromisso para qualquer tipo de unidade modular.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="footer">
        <div className={styles.footerContent}>
          <span>© KsaBox 2025</span>
          <div className={styles.footerSocials}>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram size={24} color="#E4405F" />
            </a>
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebookF size={24} color="#1877F3" />
            </a>
            <a href="#" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <FaWhatsapp size={24} color="#25D366" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
