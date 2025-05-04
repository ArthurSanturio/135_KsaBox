"use client"

import styles from './simulador.module.css';
import { useState } from 'react';
import { MdHome, MdBusiness, MdHotel } from "react-icons/md";
import Image from 'next/image';

const SIM_TYPES = [
  'Casa',
  'Escritório',
  'Quarto',
];

const CASA_MODELOS = [
  {
    grupo: 'Modelos Externos – Ksabox Ouro',
    cor: 'ouro',
    modelos: [
      { nome: 'Modelo 1', internos: ['Interno A', 'Interno B', 'Interno C', 'Interno D', 'Interno E', 'Interno F'] }, //ALTERADO
      { nome: 'Modelo 2', internos: ['Interno G', 'Interno H', 'Interno I', 'Interno J', 'Interno K', 'Interno L'] }, //ALTERADO
      { nome: 'Modelo 3', internos: ['Interno M', 'Interno N', 'Interno O', 'Interno P', 'Interno Q', 'Interno R'] }, //ALTERADO
    ],
  },
  {
    grupo: 'Modelos Externos – Ksabox Prata',
    cor: 'prata',
    modelos: [
      { nome: 'Modelo 4', internos: ['Interno S', 'Interno T', 'Interno U', 'Interno V', 'Interno W', 'Interno X'] }, //ALTERADO
      { nome: 'Modelo 5', internos: ['Interno Y', 'Interno Z', 'Interno AA', 'Interno AB', 'Interno AC', 'Interno AD'] }, //ALTERADO
      { nome: 'Modelo 6', internos: ['Interno AE', 'Interno AF', 'Interno AG', 'Interno AH', 'Interno AI', 'Interno AJ'] }, //ALTERADO
    ],
  },
];

const STYLE_OPTIONS = [
  'Varanda', 'Apexo', 'Portal', 'Inclinado', 'Inspiro', 'Quba',
  'Toldo', 'Ofiko', 'Ecke', 'Slope', 'Edge',
  'L-Shape', 'Caravana', 'Casa', 'Pod',
];

const SIM_TYPE_ICONS: Record<string, React.ReactNode> = {
  Casa: <MdHome size={40} color="#FFA000" />,
  Escritório: <MdBusiness size={40} color="#1976D2" />,
  Quarto: <MdHotel size={40} color="#8E24AA" />,
};

export default function Simulador() {
  const [simType, setSimType] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedModelo, setSelectedModelo] = useState<{ nome: string; internos: string[] } | null>(null);
  const [etapaInterna, setEtapaInterna] = useState(false);
  const [selectedInterno, setSelectedInterno] = useState<string | null>(null);

  // Nova função para pegar o caminho do SVG do modelo externo
  function getModeloSvgPath(modeloNome: string) {
    const modeloNum = modeloNome.match(/\d+/)?.[0] || '1';
    return `/models/modelo${modeloNum}.svg`;
  }

  // Nova função para pegar o caminho do SVG do modelo interno
  function getInternoSvgPath(modeloNome: string, internoNome: string) {
    const modeloNum = modeloNome.match(/\d+/)?.[0] || '1';
    // Internos são A, B, C... ou G, H, I...
    // Pega só a última parte do nome do interno (ex: Interno A -> A)
    const internoId = internoNome.split(' ').pop();
    return `/models/modelo${modeloNum}/interno${internoId}.svg`;
  }

  return (
    <div className={styles.container}>
      {/* Menu lateral */}
      <aside className={styles.sidebar}>
        {!simType && (
          <>
            <h2 className={styles.sidebarTitle}>Escolha o tipo de simulação:</h2>
            <div className={styles.styleGridColumn}>
              {SIM_TYPES.map((type) => (
                <div
                  key={type}
                  className={styles.styleItem}
                  onClick={() => { setSimType(type); setSelectedStyle(null); setSelectedModelo(null); setEtapaInterna(false); setSelectedInterno(null); }}
                  style={{fontWeight: 600, fontSize: '1.2rem'}}
                >
                  <div className={styles.iconPlaceholder} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none'}}>
                    {SIM_TYPE_ICONS[type]}
                  </div>
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {simType === 'Casa' && !etapaInterna && (
          <>
            <h2 className={styles.sidebarTitle}>Modelos de casa</h2>
            {CASA_MODELOS.map((grupo) => (
              <div key={grupo.grupo} style={{marginBottom: 24, padding: 12}}>
                <div style={{fontWeight: 600, margin: '12px 0 8px', color: grupo.cor === 'ouro' ? '#bfa13a' : '#aaa', fontSize: '1.1rem'}}>
                  {grupo.grupo}
                </div>
                <div className={styles.styleGrid}>
                  {grupo.modelos.map((modelo) => (
                    <div
                      key={modelo.nome}
                      className={styles.styleItemDif + (selectedModelo && selectedModelo.nome === modelo.nome ? ' ' + styles.selectedStyle : '')}
                      onClick={() => { setSelectedModelo(modelo); }}
                      style={{fontWeight: 600, cursor: 'pointer'}}
                    >
                      <div className={styles.iconPlaceholder}></div>
                      <span>{modelo.nome}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.sidebarNav}>
              <button className={styles.prevBtn} onClick={() => setSimType(null)}>Voltar</button>
              <button
                className={styles.nextBtn}
                onClick={() => {
                  setEtapaInterna(true);
                  if (selectedModelo) setSelectedInterno(selectedModelo.internos[0]);
                }}
                disabled={!selectedModelo}
              >Continuar</button>
            </div>
          </>
        )}
        {simType === 'Casa' && etapaInterna && selectedModelo && (
          <>
            <h2 className={styles.sidebarTitle}>Modelos internos de {selectedModelo.nome}</h2>
            <div className={styles.styleGrid}>
              {selectedModelo.internos.map((interno: string) => (
                <div
                  key={interno}
                  className={styles.styleItem + (selectedInterno === interno ? ' ' + styles.selectedStyle : '')}
                  onClick={() => setSelectedInterno(interno)}
                >
                  <div className={styles.iconPlaceholder}></div>
                  <span>{interno}</span>
                </div>
              ))}
            </div>
            <div className={styles.sidebarNav}>
              <button className={styles.prevBtn} onClick={() => setSimType(null)}>Voltar</button>
              <button
                className={styles.nextBtn}
                onClick={() => {/* avançar para próxima etapa */}}
                disabled={!selectedStyle}
              >Continuar</button>
            </div>
          </>
        )}
        {simType && simType !== 'Casa' && (
          <>
            <h2 className={styles.sidebarTitle}>Modelos de {simType.toLowerCase()}</h2>
            <div className={styles.styleGrid}>
              {STYLE_OPTIONS.map((name) => (
                <div
                  key={name}
                  className={styles.styleItem + (selectedStyle === name ? ' ' + styles.selectedStyle : '')}
                  onClick={() => setSelectedStyle(name)}
                >
                  <div className={styles.iconPlaceholder}></div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
            <div className={styles.sidebarNav}>
              <button className={styles.prevBtn} onClick={() => setSimType(null)}>Voltar</button>
              <button
                className={styles.nextBtn}
                onClick={() => {/* avançar para próxima etapa */}}
                disabled={!selectedStyle}
              >Continuar</button>
            </div>
          </>
        )}
      </aside>

      {/* Painel central */}
      <main className={styles.mainPanel}>
        <div className={styles.visualization}>
          {simType === 'Casa' && !etapaInterna && selectedModelo ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <div className={styles.imageBox}>
                <Image
                  src={getModeloSvgPath(selectedModelo.nome)}
                  alt={selectedModelo.nome}
                  style={{maxWidth: '100%', maxHeight: '100%', borderRadius: 10, objectFit: 'contain'}}
                  width={800}
                  height={600}
                />
              </div>
              <div style={{display: 'flex', gap: 16, marginTop: 8}}>
                <button
                  className={styles.prevBtn}
                  onClick={() => setSelectedModelo(null)}
                >Voltar</button>
                <button
                  className={styles.nextBtn}
                  onClick={() => {
                    setEtapaInterna(true);
                    if (selectedModelo) setSelectedInterno(selectedModelo.internos[0]);
                  }}
                >Avançar</button>
              </div>
            </div>
          ) : simType === 'Casa' && etapaInterna && selectedModelo && selectedInterno ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
              <div className={styles.imageBox}>
                <Image
                  src={getInternoSvgPath(selectedModelo.nome, selectedInterno)}
                  alt={selectedInterno}
                  style={{maxWidth: '100%', maxHeight: '100%', borderRadius: 10, objectFit: 'contain'}}
                  width={800}
                  height={600}
                />
              </div>
              <div style={{fontWeight: 500, color: '#333', marginBottom: 8}}>{selectedInterno}</div>
              <div style={{display: 'flex', gap: 16, marginTop: 8}}>
                <button
                  className={styles.prevBtn}
                  onClick={() => setSelectedInterno(null)}
                >Voltar</button>
                <button
                  className={styles.nextBtn}
                  onClick={() => {/* avançar para próxima etapa final */}}
                >Avançar</button>
              </div>
            </div>
          ) : selectedStyle ? (
            <div className={styles.mock3d}>
              <div className={styles.mockRoom}></div>
              <div className={styles.mockDims}>
                <span className={styles.dimVertical}>2,5 m</span>
                <span className={styles.dimHorizontal}>4 m</span>
                <span className={styles.dimDepth}>3 m</span>
              </div>
            </div>
          ) : (
            <div style={{color: '#888', fontSize: '1.2rem'}}>Selecione um modelo para visualizar</div>
          )}
        </div>
      </main>
    </div>
  );
}
