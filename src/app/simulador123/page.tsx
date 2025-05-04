"use client";

import { useState } from "react";
import styles from "../page.module.css";
import dynamic from "next/dynamic";

// Importação dinâmica do componente 3D para evitar erros de SSR
const HouseViewer = dynamic(
  () => import("../components/HouseViewer"),
  { ssr: false }
);

export default function SimuladorPage() {

  const [dimensions, setDimensions] = useState({
    length: 6,
    width: 4,
    height: 2.8
  });

  const [selectedMaterial, setSelectedMaterial] = useState("madeira");
  const [selectedShape, setSelectedShape] = useState<'cubo' | 'retangulo'>('retangulo');
  const [area, setArea] = useState(24); // valor inicial exemplo
  const [step, setStep] = useState(1);
  const [wallOpacity, setWallOpacity] = useState(1); // 1 = opaco, 0 = totalmente transparente

  const handleDimensionChange = (dimension: keyof typeof dimensions, value: number) => {
    setDimensions(prev => ({
      ...prev,
      [dimension]: value
    }));
  };

  // Atualiza as dimensões automaticamente ao mudar área ou forma
  const updateDimensionsByArea = (newArea: number, shape: 'cubo' | 'retangulo') => {
    if (shape === 'cubo') {
      const lado = Math.sqrt(newArea);
      setDimensions(prev => ({ ...prev, length: lado, width: lado }));
    } else {
      // proporção padrão: comprimento = largura * 1.5
      const largura = Math.sqrt(newArea / 1.5);
      const comprimento = largura * 1.5;
      setDimensions(prev => ({ ...prev, length: comprimento, width: largura }));
    }
  };

  // Atualiza dimensões ao trocar área ou forma
  const handleAreaChange = (value: number) => {
    setArea(value);
    updateDimensionsByArea(value, selectedShape);
  };
  const handleShapeChange = (shape: 'cubo' | 'retangulo') => {
    setSelectedShape(shape);
    updateDimensionsByArea(area, shape);
  };

  return (
    <div className={styles.simulatorPage}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Simulador de Casa Modular</h1>
          <p>Configure sua casa dos sonhos em poucos passos</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.simulatorContainer}>
          <div className={styles.configurator}>
            <div className={styles.viewerSection}>
              {step === 1 ? (
                <>
                  <div className={styles.viewer}>
                    <HouseViewer 
                      dimensions={dimensions}
                      material={selectedMaterial}
                      shape={selectedShape}
                    />
                  </div>
                  <button onClick={() => setStep(2)}>Confirmar</button>
                </>
              ) : (
                <>
                  <div className={styles.viewer}>
                    <HouseViewer 
                      dimensions={dimensions}
                      material={selectedMaterial}
                      shape={selectedShape}
                    />
                  </div>
                  <div>
                    <label>Translucidez das paredes</label>
                    <input
                      type="range"
                      min={0.1}
                      max={1}
                      step={0.01}
                      value={wallOpacity}
                      onChange={e => setWallOpacity(Number(e.target.value))}
                    />
                  </div>
                </>
              )}
            </div>

            <div className={styles.optionsSection}>
              <div className={styles.optionsContainer}>
                <div className={styles.optionGroup}>
                  <h3>Dimensões Básicas</h3>
                  <div className={styles.optionFields}>
                    <div className={styles.field}>
                      <label>Área a ser ocupada (m²)</label>
                      <input
                        type="number"
                        min="9"
                        max="96"
                        step="1"
                        value={area}
                        onChange={e => handleAreaChange(parseFloat(e.target.value))}
                      />
                    </div>
                    <div className={styles.field}>
                      <label>Andares</label>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="floors"
                            checked={dimensions.height === 2.8}
                            onChange={() => handleDimensionChange('height', 2.8)}
                          />
                          1 andar
                        </label>
                        <label style={{ marginLeft: '1rem' }}>
                          <input
                            type="radio"
                            name="floors"
                            checked={dimensions.height === 5.6}
                            onChange={() => handleDimensionChange('height', 5.6)}
                          />
                          2 andares
                        </label>
                      </div>
                    </div>

                    <div className={styles.optionGroup}>
                    <h3>Forma Geométrica</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        type="button"
                        className={selectedShape === 'cubo' ? styles.selected : ''}
                        onClick={() => handleShapeChange('cubo')}
                      >
                        Cubo
                      </button>
                      <button
                        type="button"
                        className={selectedShape === 'retangulo' ? styles.selected : ''}
                        onClick={() => handleShapeChange('retangulo')}
                      >
                        Retângulo
                      </button>
                    </div>
                </div>
                  </div>
                </div>

                <div className={styles.optionGroup}>
                  <h3>Acabamento Externo</h3>
                  <div className={styles.materialSelector}>
                    <div 
                      className={`${styles.materialOption} ${selectedMaterial === 'madeira' ? styles.selected : ''}`}
                      onClick={() => setSelectedMaterial('madeira')}
                    >
                      <div className={styles.materialPreview} style={{ backgroundColor: '#8B4513' }} />
                      <span>Madeira</span>
                    </div>
                    <div 
                      className={`${styles.materialOption} ${selectedMaterial === 'metal' ? styles.selected : ''}`}
                      onClick={() => setSelectedMaterial('metal')}
                    >
                      <div className={styles.materialPreview} style={{ backgroundColor: '#B8B8B8' }} />
                      <span>Metal</span>
                    </div>
                    <div 
                      className={`${styles.materialOption} ${selectedMaterial === 'vidro' ? styles.selected : ''}`}
                      onClick={() => setSelectedMaterial('vidro')}
                    >
                      <div className={styles.materialPreview} style={{ backgroundColor: '#FFFFFF', border: '1px solid #eee' }} />
                      <span>Vidro</span>
                    </div>
                    <div 
                      className={`${styles.materialOption} ${selectedMaterial === 'tijolo' ? styles.selected : ''}`}
                      onClick={() => setSelectedMaterial('tijolo')}
                    >
                      <div className={styles.materialPreview} style={{ backgroundColor: '#b97a56', backgroundImage: 'url(/texture/tijolo/Bricks059_8K-JPG_Color.jpg)', backgroundSize: 'cover', border: '1px solid #eee' }} />
                      <span>Tijolo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 