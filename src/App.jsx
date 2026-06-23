import { useState, useEffect } from "react";

// ─── DATOS DE LAS RECETAS DEL EXCEL ──────────────────────────────────────────
const INITIAL_RECIPES = [
  // ═══ CORPORAL ═══
  {
    id: 1, category: "corporal", name: "Crema DrenaShape", lastMade: "",
    comments: "Pendiente: Aceite de Girasol, Extracto de Fucus, Extracto Castaño de Indias, Extracto Equiceto (sin precio). Color verde menta. Pasión cosmética - Colombia.",
    ingredients: [
      { name: "Alcohol Cetílico (Guinama)", amount: "20", unit: "g" },
      { name: "Cera Lanette (Jabonarium)", amount: "20", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "200", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "20", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "1", unit: "g" },
      { name: "Sharomix (Jabonarium)", amount: "5", unit: "g" },
      { name: "Aceite Esencial de Canela Corteza (Jabonarium)", amount: "10", unit: "g" },
      { name: "Pimienta (Gran Velada)", amount: "10", unit: "g" },
      { name: "Color Verde Menta", amount: "0.2", unit: "g" },
      { name: "Extracto de Fucus Glicerado", amount: "100", unit: "g" },
      { name: "Extracto Castaño de Indias", amount: "50", unit: "g" },
      { name: "Extracto Equiceto", amount: "50", unit: "g" },
    ]
  },
  {
    id: 2, category: "corporal", name: "Mascarilla Santum Detox", lastMade: "",
    comments: "Café Mocka - Pereira (sin precio). Total 500g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "50", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "5", unit: "g" },
      { name: "Carboximetil Celulosa Sódica", amount: "1", unit: "g" },
      { name: "Nacar (Gran Velada)", amount: "3", unit: "g" },
      { name: "Sharomix (Jabonarium)", amount: "5", unit: "g" },
      { name: "Café Mocka - Pereira", amount: "6", unit: "g" },
      { name: "Extracto Hiedra Glicerinado (Guinama)", amount: "40", unit: "g" },
      { name: "Castaño de Indias (Guinama)", amount: "20", unit: "g" },
      { name: "Extracto Equiceto Fluido (Guinama)", amount: "20", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "20", unit: "g" },
      { name: "Agua", amount: "330", unit: "g" },
    ]
  },
  {
    id: 3, category: "corporal", name: "Concentrado Corposlim Lipolitico/Draining", lastMade: "",
    comments: "Cinnamal (Gran Velada) sin precio. Agua con valor inusual (revisar). Total 500g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "50", unit: "g" },
      { name: "Sharomix (Jabonarium)", amount: "5", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "Hiedra Glicerinado (Guinama)", amount: "25", unit: "g" },
      { name: "Extracto Equiceto Fluido (Guinama)", amount: "25", unit: "g" },
      { name: "Harpagofito Glicerinado (Guinama)", amount: "25", unit: "g" },
      { name: "Extracto Centella Asiática (Guinama)", amount: "25", unit: "g" },
      { name: "Esencia Luxury (Gran Velada)", amount: "3", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "50", unit: "g" },
      { name: "Cinnamal (Gran Velada)", amount: "2", unit: "g" },
      { name: "Agua", amount: "288", unit: "g" },
    ]
  },
  {
    id: 4, category: "corporal", name: "Crema Wellness", lastMade: "",
    comments: "Esencia Aromatica Higo y Esencia Jengibre-Naranja sin precio. Color Azul (0.1g). Total 500.6g.",
    ingredients: [
      { name: "Alcohol Cetílico (Guinama)", amount: "20", unit: "g" },
      { name: "Cera Lanette (Jabonarium)", amount: "20", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "150", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "20", unit: "g" },
      { name: "Sharomix (Jabonarium)", amount: "5", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "1", unit: "g" },
      { name: "Mimosa (Gran Velada)", amount: "1", unit: "g" },
      { name: "Esencia Aromática Higo (Gran Velada)", amount: "0.5", unit: "g" },
      { name: "Esencia Aromática Jengibre-Naranja (Gran Velada)", amount: "1", unit: "g" },
      { name: "Color Azul", amount: "0.1", unit: "g" },
      { name: "Agua", amount: "282", unit: "g" },
    ]
  },
  {
    id: 5, category: "corporal", name: "Concentrado Maderoterapia", lastMade: "",
    comments: "Mezcla de extractos drenantes y reafirmantes. Total 400g.",
    ingredients: [
      { name: "Castaño de Indias Glicerinado (Guinama)", amount: "100", unit: "g" },
      { name: "Extracto Equiceto Fluido (Guinama)", amount: "100", unit: "g" },
      { name: "Extracto Harpagofito Glicerinado (Guinama)", amount: "100", unit: "g" },
      { name: "Extracto Fucus Glicerinado (Guinama)", amount: "100", unit: "g" },
    ]
  },
  {
    id: 6, category: "corporal", name: "Gel Lipolitico y Drenante para Maderoterapia", lastMade: "",
    comments: "Usar el Concentrado de Maderoterapia como base. Total 860g.",
    ingredients: [
      { name: "Concentrado de Maderoterapia", amount: "40", unit: "g" },
      { name: "Esencia de Jengibre (Gran Velada)", amount: "20", unit: "g" },
      { name: "Gel Transparente (Henry Schein)", amount: "800", unit: "g" },
    ]
  },
  {
    id: 7, category: "corporal", name: "Concentrado Corposlim Firming", lastMade: "",
    comments: "Lemon Grass (Alexmo). Sugar Cream. Total 500g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "40", unit: "g" },
      { name: "Leucidal (Jabonarium)", amount: "5", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "Extracto Centella Asiática (Guinama)", amount: "50", unit: "g" },
      { name: "Hiedra Glicerinado (Guinama)", amount: "25", unit: "g" },
      { name: "Harpagofito Glicerinado (Guinama)", amount: "25", unit: "g" },
      { name: "Sugar Cream", amount: "4", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "50", unit: "g" },
      { name: "Lemon Gras (Alexmo)", amount: "1", unit: "g" },
      { name: "Agua", amount: "298", unit: "g" },
    ]
  },
  {
    id: 8, category: "corporal", name: "Moon Body (Exfoliante)", lastMade: "",
    comments: "Natragem - Colombia (sin precio). Ácido Láctico pendiente precio. Total 500g.",
    ingredients: [
      { name: "Azúcar Moreno", amount: "110", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "300", unit: "g" },
      { name: "Gelificante de Aceite (Guinama)", amount: "20", unit: "g" },
      { name: "Natragem S140 NP (Guinama)", amount: "10", unit: "g" },
      { name: "Musgo (Gran Velada)", amount: "20", unit: "g" },
      { name: "SCI Sodium Cocoyl (Gran Velada)", amount: "30", unit: "g" },
      { name: "Ácido Láctico", amount: "10", unit: "g" },
    ]
  },
  {
    id: 9, category: "corporal", name: "Crema Indiba", lastMade: "",
    comments: "Vainilla Hidro - Colombia. Mango Hidro - Colombia. Color Amarillo Huevo. Agua - Colombia. Total 500.1g.",
    ingredients: [
      { name: "Cera Lanette (Jabonarium)", amount: "20", unit: "g" },
      { name: "Alcohol Cetílico (Guinama)", amount: "20", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "250", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "20", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "1", unit: "g" },
      { name: "Sharomix (Jabonarium)", amount: "5", unit: "g" },
      { name: "Vainilla Hidro", amount: "12", unit: "g" },
      { name: "Mango Hidro", amount: "6", unit: "g" },
      { name: "Color Amarillo Huevo", amount: "0.1", unit: "g" },
      { name: "Agua", amount: "166", unit: "g" },
    ]
  },
  {
    id: 10, category: "corporal", name: "Corpo Novo (Exfoliante)", lastMade: "",
    comments: "Lemon Gras KDA (Alexmo). Total 500g.",
    ingredients: [
      { name: "Aceite de Almendras (Guinama)", amount: "300", unit: "g" },
      { name: "Gelificante Aceite", amount: "20", unit: "g" },
      { name: "Natragem S140 NP (Guinama)", amount: "25", unit: "g" },
      { name: "SCI Sodium Cocoyl (Gran Velada)", amount: "30", unit: "g" },
      { name: "Sugar Cream Esencia Aromática (Gran Velada)", amount: "6", unit: "g" },
      { name: "Lemon Gras KDA (Alexmo)", amount: "3", unit: "g" },
      { name: "Sal", amount: "116", unit: "g" },
    ]
  },
  {
    id: 11, category: "corporal", name: "Crema Base", lastMade: "",
    comments: "Fragancia Jengibre y Naranja (Gran Velada) sin precio. Total 500g.",
    ingredients: [
      { name: "Cera Lanette (Jabonarium)", amount: "20", unit: "g" },
      { name: "Alcohol Cetílico (Guinama)", amount: "20", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "150", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "10", unit: "g" },
      { name: "Goma Xantana (Gran Velada)", amount: "2", unit: "g" },
      { name: "Sharomix (Jabonarium)", amount: "5", unit: "g" },
      { name: "Jengibre y Naranja (Gran Velada)", amount: "1", unit: "g" },
      { name: "Agua", amount: "292", unit: "g" },
    ]
  },
  {
    id: 12, category: "corporal", name: "Crema Rosada", lastMade: "",
    comments: "Colorante Rosa Brillante - Colombia. Ozono 0.5g. Revoluciones: 2 min → 10s a vel.5 / 50s a vel.9 / 30s a vel.7 / 20s a vel.5 / 10s a vel.9. Total 502g.",
    ingredients: [
      { name: "Alcohol Cetílico (Guinama)", amount: "15", unit: "g" },
      { name: "Cera Lanette (Jabonarium)", amount: "25", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "100", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "20", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "1", unit: "g" },
      { name: "Sharomix (Jabonarium)", amount: "5", unit: "g" },
      { name: "Lemon Sorbet (Alexmo)", amount: "0.5", unit: "g" },
      { name: "Frutos del Bosque", amount: "2", unit: "g" },
      { name: "Nacar", amount: "2", unit: "g" },
      { name: "Colorante Rosa Brillante", amount: "1", unit: "g" },
      { name: "Agua", amount: "330", unit: "g" },
      { name: "Ozono", amount: "0.5", unit: "g" },
    ]
  },
  {
    id: 13, category: "corporal", name: "Crema Manos", lastMade: "",
    comments: "Aroma Melón (Qerlan) y Creamy Cassis PO (Alexmo) sin precio. Total 310g.",
    ingredients: [
      { name: "Cera Lanette", amount: "10", unit: "g" },
      { name: "Alcohol Cetílico (Guinama)", amount: "20", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "100", unit: "g" },
      { name: "Goma Xantana (Gran Velada)", amount: "1", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "20", unit: "g" },
      { name: "Sharomix (Jabonarium)", amount: "5", unit: "g" },
      { name: "Aroma de Melón (Qerlan)", amount: "4", unit: "g" },
      { name: "Creamy Cassis PO (Alexmo)", amount: "6", unit: "g" },
      { name: "Nacarante", amount: "1", unit: "g" },
      { name: "Agua", amount: "143", unit: "g" },
    ]
  },
  {
    id: 14, category: "corporal", name: "Protector Solar (Fórmula 1)", lastMade: "",
    comments: "Alta protección solar. Vitamina E Tocoferol. Total 502g.",
    ingredients: [
      { name: "Filtro Solar (Camassia)", amount: "83", unit: "g" },
      { name: "Alcohol Cetílico (Guinama)", amount: "20", unit: "g" },
      { name: "Cera Lanette (Jabonarium)", amount: "20", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "80", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "50", unit: "g" },
      { name: "Alginato (Camassia)", amount: "1", unit: "g" },
      { name: "Cosgard (Jabonarium)", amount: "5", unit: "g" },
      { name: "Vitamina E Tocoferol (Camassia)", amount: "2", unit: "g" },
      { name: "Agua", amount: "241", unit: "g" },
    ]
  },
  {
    id: 15, category: "corporal", name: "Protector Solar (Fórmula 2)", lastMade: "",
    comments: "Menor cantidad de filtro solar que la Fórmula 1. Total 500g.",
    ingredients: [
      { name: "Filtro Solar", amount: "30", unit: "g" },
      { name: "Alcohol Cetílico (Guinama)", amount: "20", unit: "g" },
      { name: "Cera Lanette (Jabonarium)", amount: "20", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "80", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "59", unit: "g" },
      { name: "Alginato (Camassia)", amount: "1", unit: "g" },
      { name: "Cosgard (Jabonarium)", amount: "5", unit: "g" },
      { name: "Agua", amount: "285", unit: "g" },
    ]
  },
  {
    id: 16, category: "corporal", name: "Serum Colágeno y Elastina Manicura", lastMade: "",
    comments: "Colágeno Marino descatalogado. Yogurt, Sharomix 705, Musgo y Agua de Rosas sin precio. Total 500g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "60", unit: "g" },
      { name: "Hidroxietilcelulosa (Guinama)", amount: "1", unit: "g" },
      { name: "Carboximetilcelulosa Sódica (Guinama)", amount: "1", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "Colágeno Marino (Gran Velada)", amount: "10", unit: "g" },
      { name: "Pantenol (Gran Velada)", amount: "5", unit: "g" },
      { name: "Yogurt (Gran Velada)", amount: "10", unit: "g" },
      { name: "Sharomix 705 (Gran Velada)", amount: "10", unit: "g" },
      { name: "Vanille Sub PO (Alexmo)", amount: "7", unit: "g" },
      { name: "Musgo (Gran Velada)", amount: "6", unit: "g" },
      { name: "Agua de Rosas (Guinama)", amount: "200", unit: "g" },
      { name: "Agua", amount: "188", unit: "g" },
    ]
  },
  {
    id: 17, category: "corporal", name: "Envoltura Air Legs", lastMade: "",
    comments: "Gel Anticelulitico Efecto Frío pendiente de precio. Total 500g.",
    ingredients: [
      { name: "Gel Transparente", amount: "400", unit: "g" },
      { name: "Extracto de Árnica Oleoso", amount: "50", unit: "g" },
      { name: "Gel Anticelulitico Efecto Frío", amount: "50", unit: "g" },
    ]
  },
  {
    id: 18, category: "corporal", name: "Líquido Vendas Frías", lastMade: "",
    comments: "Envoltura Plantas del Ártico pendiente de precio. Total 500g.",
    ingredients: [
      { name: "Envoltura Plantas del Ártico", amount: "200", unit: "g" },
      { name: "Agua", amount: "300", unit: "g" },
    ]
  },
  {
    id: 19, category: "corporal", name: "Crema Pedicura", lastMade: "",
    comments: "Fragancia Mango Mandarin sin precio. Colorante Amarillo Huevo - Colombia. Se sacaron 20 botes de venta. Total 1412g.",
    ingredients: [
      { name: "Manteca de Karité", amount: "425", unit: "g" },
      { name: "Manteca de Mango", amount: "425", unit: "g" },
      { name: "Vaselina", amount: "500", unit: "g" },
      { name: "Fragancia Mango Mandarin (Gran Velada)", amount: "50", unit: "g" },
      { name: "Nacarante", amount: "10", unit: "g" },
      { name: "Color Amarillo Huevo", amount: "2", unit: "g" },
    ]
  },
  {
    id: 20, category: "corporal", name: "Concentrado Detox Corporal", lastMade: "",
    comments: "Alcánfor, Esencia Champú Herbal y Agua sin precio. Vibrante Hidro - Pereira. Total 500g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "50", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "AE Pimienta", amount: "5", unit: "g" },
      { name: "Sharomix", amount: "5", unit: "g" },
      { name: "Extracto Equiceto Fluido (Guinama)", amount: "50", unit: "g" },
      { name: "Castaño de Indias (Guinama)", amount: "95", unit: "g" },
      { name: "Fucus Glicerinado (Guinama)", amount: "50", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "108", unit: "g" },
      { name: "Alcánfor", amount: "5", unit: "g" },
      { name: "Esencia Champú Herbal", amount: "10", unit: "g" },
      { name: "Vibrante Hidro - Pereira", amount: "10", unit: "g" },
      { name: "Agua", amount: "110", unit: "g" },
    ]
  },

  // ═══ FACIAL ═══
  {
    id: 21, category: "facial", name: "Carbón Activo (Mascarilla)", lastMade: "",
    comments: "Exfoliante con Sales de Epsom y partículas de celulosa. Nasha Pó (Alexmo). Total 500g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "50", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "4", unit: "g" },
      { name: "Caolín", amount: "100", unit: "g" },
      { name: "Piedra Pómez", amount: "50", unit: "g" },
      { name: "Sharomix", amount: "5", unit: "g" },
      { name: "Carbón Activo", amount: "20", unit: "g" },
      { name: "Lamesoft (Camassia)", amount: "25", unit: "g" },
      { name: "Sodium Cocoyl Glutamate", amount: "20", unit: "g" },
      { name: "Natragem", amount: "10", unit: "g" },
      { name: "Sales de Epsom", amount: "50", unit: "g" },
      { name: "Partículas Exfoliantes Celulosa 500 micras (Gran Velada)", amount: "10", unit: "g" },
      { name: "Nasha Pó (Alexmo)", amount: "4", unit: "g" },
      { name: "Agua", amount: "152", unit: "g" },
    ]
  },
  {
    id: 22, category: "facial", name: "Desmaquillante Facial", lastMade: "",
    comments: "Leucidal sin precio. Blossom to Go PO (Alexmo). Total 1000g.",
    ingredients: [
      { name: "Natragem", amount: "20", unit: "g" },
      { name: "Sodium Cocoyl Glutamate (Jabonarium)", amount: "10", unit: "g" },
      { name: "Coco Glucoside (Gran Velada)", amount: "10", unit: "g" },
      { name: "Betaína de Coco (Gran Velada)", amount: "20", unit: "g" },
      { name: "Extracto Aloe Vera (Gran Velada)", amount: "10", unit: "g" },
      { name: "Extracto de Pepino (Gran Velada)", amount: "10", unit: "g" },
      { name: "Leucidal", amount: "5", unit: "g" },
      { name: "Blossom To Go PO (Alexmo)", amount: "5", unit: "g" },
      { name: "Agua", amount: "910", unit: "g" },
    ]
  },
  {
    id: 23, category: "facial", name: "Mascarilla ATP", lastMade: "",
    comments: "Con leche de arroz, agua de rosas y polvo de frambuesa. Total 600g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "140", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "Urea (Guinama)", amount: "15", unit: "g" },
      { name: "Yogurt (Gran Velada)", amount: "16", unit: "g" },
      { name: "Pantenol (Gran Velada)", amount: "15", unit: "g" },
      { name: "Caolín (Guinama)", amount: "100", unit: "g" },
      { name: "Leucidal (Jabonarium)", amount: "6", unit: "g" },
      { name: "Leche de Arroz (Jabonarium)", amount: "10", unit: "g" },
      { name: "Agua de Rosas Natural (Guinama)", amount: "60", unit: "g" },
      { name: "Polvo de Frambuesa", amount: "10", unit: "g" },
      { name: "Agua", amount: "226", unit: "g" },
    ]
  },
  {
    id: 24, category: "facial", name: "Leche Limpiadora", lastMade: "2026-02-01",
    comments: "Fabricada el 01 de Febrero 2026. Varios activos sin precio (Lamesoft, Natragem, Menthol, Alcohol, Vainilla Hidrosoluble, Algodón, Cardamomo). Total 500g.",
    ingredients: [
      { name: "Alcohol Cetílico (Guinama)", amount: "10", unit: "g" },
      { name: "Cera Lanette (Jabonarium)", amount: "10", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "80", unit: "g" },
      { name: "Emulsionante Concentrado Guinama", amount: "60", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "20", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "Caolín (Guinama)", amount: "7", unit: "g" },
      { name: "Sharomix", amount: "10", unit: "g" },
      { name: "Lamesoft", amount: "14", unit: "g" },
      { name: "Natragem", amount: "22", unit: "g" },
      { name: "Menthol", amount: "2", unit: "g" },
      { name: "Alcohol", amount: "3", unit: "g" },
      { name: "Vainilla Hidrosoluble - Pereira", amount: "5", unit: "g" },
      { name: "Algodón Hidrosoluble - Pereira", amount: "1", unit: "g" },
      { name: "Cardamomo Gran Velada", amount: "2", unit: "g" },
      { name: "Agua", amount: "252", unit: "g" },
    ]
  },
  {
    id: 25, category: "facial", name: "Mascarilla Facial Santum", lastMade: "",
    comments: "Sucragel - Colombia. Cera Emulsionante Soft EQ G5 sin precio. Total 505g.",
    ingredients: [
      { name: "Aceite de Almendras (Guinama)", amount: "60", unit: "g" },
      { name: "Cera Lanette (Jabonarium)", amount: "30", unit: "g" },
      { name: "Alcohol Cetílico (Guinama)", amount: "20", unit: "g" },
      { name: "Emulsionante Ester Sucre (Camassia)", amount: "20", unit: "g" },
      { name: "Cera Emulsionante Soft EQ G5 (Camassia)", amount: "40", unit: "g" },
      { name: "Emulsionante Guinama", amount: "40", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "20", unit: "g" },
      { name: "Emulsionante Ester Sucre x2 (Camassia)", amount: "10", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "Leucidal Líquido (Jabonarium)", amount: "10", unit: "g" },
      { name: "Árnica (Guinama)", amount: "100", unit: "g" },
      { name: "Aloe Vera Gel (Guinama)", amount: "50", unit: "g" },
      { name: "Placenta Vegetal", amount: "20", unit: "g" },
      { name: "Extracto de Pepino (Gran Velada)", amount: "30", unit: "g" },
      { name: "Lemon Sorbet (Alexmo)", amount: "7", unit: "g" },
      { name: "Sucragel", amount: "20", unit: "g" },
    ]
  },
  {
    id: 26, category: "facial", name: "Serum Hidratante", lastMade: "2025-07-01",
    comments: "Fabricado el 01 de Julio 2025. Aqualyx (Camassia) sin precio. Total 500g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "50", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "Leucidal Líquido (Jabonarium)", amount: "5", unit: "g" },
      { name: "Germen de Trigo Liposomado (Camassia)", amount: "5", unit: "g" },
      { name: "Leche de Arroz", amount: "20", unit: "g" },
      { name: "Elastina Marina", amount: "6", unit: "g" },
      { name: "Extracto de Pepino Glicólico (Guinama)", amount: "20", unit: "g" },
      { name: "Baba de Caracol Concentrado (Guinama)", amount: "5", unit: "g" },
      { name: "Aloe Vera Gel (Guinama)", amount: "200", unit: "g" },
      { name: "Agua", amount: "177", unit: "g" },
    ]
  },
  {
    id: 27, category: "facial", name: "Gel Peeling Aminotox (Fase 1)", lastMade: "2026-02-01",
    comments: "Fabricado 01 Feb 2026. Agua de Mar (Qerlan) y Agua de Lavanda sin precio. Total 500g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "40", unit: "g" },
      { name: "Carboximetil Celulosa (Guinama)", amount: "4", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "Hidroximetilcelulosa (Guinama)", amount: "2", unit: "g" },
      { name: "Sharomix", amount: "4", unit: "g" },
      { name: "Ácido Láctico", amount: "30", unit: "g" },
      { name: "Musgo - Gran Velada", amount: "1", unit: "g" },
      { name: "Agua de Mar (Qerlan)", amount: "217", unit: "g" },
      { name: "Agua de Lavanda", amount: "200", unit: "g" },
    ]
  },
  {
    id: 28, category: "facial", name: "Concentrado Mascarilla Collagen Up", lastMade: "",
    comments: "Colágeno Marino descatalogado. Total 600g.",
    ingredients: [
      { name: "Granada Glicerada", amount: "100", unit: "g" },
      { name: "Elastina Marina", amount: "10", unit: "g" },
      { name: "Colágeno Marino (descatalogado)", amount: "50", unit: "g" },
      { name: "Goma Xantana", amount: "1", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "200", unit: "g" },
      { name: "Blossom To Go (Alexmo)", amount: "3", unit: "g" },
      { name: "Nacar", amount: "3", unit: "g" },
      { name: "Leucidal Líquido (Jabonarium)", amount: "5", unit: "g" },
      { name: "Aloe Vera", amount: "128", unit: "g" },
      { name: "Agua", amount: "100", unit: "g" },
    ]
  },
  {
    id: 29, category: "facial", name: "Mascarilla VIP 02 Santum", lastMade: "",
    comments: "Regalo Profe (Hidrolato CBD). Total 250g.",
    ingredients: [
      { name: "Alcohol Cetílico", amount: "10", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "10", unit: "g" },
      { name: "Lanette (Jabonarium)", amount: "10", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "50", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "1", unit: "g" },
      { name: "Sharomix", amount: "3", unit: "g" },
      { name: "Extracto de Pepino Glicólico", amount: "10", unit: "g" },
      { name: "Leche de Arroz", amount: "10", unit: "g" },
      { name: "Frambuesa en Polvo (Camassia)", amount: "1", unit: "g" },
      { name: "Bentonita", amount: "20", unit: "g" },
      { name: "Nasha Pó (Alexmo)", amount: "1", unit: "g" },
      { name: "Agua", amount: "124", unit: "g" },
    ]
  },
  {
    id: 30, category: "facial", name: "Mascarilla Purificante Seborreguladora (Le Plantes)", lastMade: "",
    comments: "Hidrolato CBD regalo profe. Geranium Bourbon Hydrolat KbA (Alexmo). Total 300g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "30", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "1", unit: "g" },
      { name: "Cera Lanette", amount: "5", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "25", unit: "g" },
      { name: "Cosgard (Jabonarium)", amount: "3", unit: "g" },
      { name: "Bentonita", amount: "20", unit: "g" },
      { name: "Ácido Láctico", amount: "7", unit: "g" },
      { name: "Extracto Abedul Seco (Guinama)", amount: "1", unit: "g" },
      { name: "Activo Reductor de Poros (Camassia)", amount: "10", unit: "g" },
      { name: "Hidrolato de Ciprés (Camassia)", amount: "6", unit: "g" },
      { name: "Pentylene Glycol Natural (Camassia)", amount: "10", unit: "g" },
      { name: "Bioazufre Fluido (Guinama)", amount: "2", unit: "g" },
      { name: "Levadura de Cerveza", amount: "5", unit: "g" },
      { name: "Geranium Bourbon Hydrolat KbA (Alexmo)", amount: "35", unit: "g" },
      { name: "Aloe Vera", amount: "100", unit: "g" },
      { name: "Agua Hamamelis", amount: "30", unit: "g" },
    ]
  },
  {
    id: 31, category: "facial", name: "Desmaquillante Facial Magnatum", lastMade: "",
    comments: "Creamy Cassis PO (Alexmo). Viscólid (Camassia). Total 509g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "74", unit: "g" },
      { name: "Creamy Cassis PO (Alexmo)", amount: "6", unit: "g" },
      { name: "Mimosa (Gran Velada)", amount: "4", unit: "g" },
      { name: "CSI Sodium Cocoyl (Gran Velada)", amount: "30", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "310", unit: "g" },
      { name: "Viscólid (Camassia)", amount: "30", unit: "g" },
      { name: "Betaína de Coco (Gran Velada)", amount: "10", unit: "g" },
      { name: "Coco Glucoside (Gran Velada)", amount: "40", unit: "g" },
      { name: "Cosgard (Camassia)", amount: "5", unit: "g" },
    ]
  },
  {
    id: 32, category: "facial", name: "Splash Hidratante", lastMade: "",
    comments: "Blossom To Go PO (Alexmo). Almidón de Arroz. Total 250g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "20", unit: "g" },
      { name: "Almidón de Arroz (Camassia)", amount: "3", unit: "g" },
      { name: "Betaína Natural (Camassia)", amount: "5", unit: "g" },
      { name: "Agua de Rosas Natural (Guinama)", amount: "100", unit: "g" },
      { name: "Blossom To Go PO (Alexmo)", amount: "2", unit: "g" },
      { name: "Agua", amount: "120", unit: "g" },
    ]
  },
  {
    id: 33, category: "facial", name: "Desmaquillante Facial Spa Capilar", lastMade: "",
    comments: "3 gotas de Ozono, 3 gotas Esencia Romero Natural, 3 gotas Frutos del Bosque. Total 400g.",
    ingredients: [
      { name: "Aceite de Almendras (Guinama)", amount: "230", unit: "g" },
      { name: "Viscólid (Camassia)", amount: "20", unit: "g" },
      { name: "Lenette (Jabonarium)", amount: "10", unit: "g" },
      { name: "Alcohol Cetílico (Guinama)", amount: "5", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "60", unit: "g" },
      { name: "Vitamina E Alfatocoferol (Jabonarium)", amount: "3", unit: "g" },
      { name: "Leucidal Líquido (Jabonarium)", amount: "2", unit: "g" },
      { name: "Sodium Cocoyl Glutamate (Jabonarium)", amount: "30", unit: "g" },
      { name: "Coco Glucoside (Gran Velada)", amount: "20", unit: "g" },
      { name: "Betaína de Coco (Gran Velada)", amount: "10", unit: "g" },
      { name: "Lamesoft (Camassia)", amount: "10", unit: "g" },
      { name: "Ozono", amount: "3", unit: "gotas" },
      { name: "Esencia Romero Natural (Guinama)", amount: "3", unit: "gotas" },
      { name: "Frutos del Bosque (Gran Velada)", amount: "3", unit: "gotas" },
    ]
  },
  {
    id: 34, category: "facial", name: "Tónico Facial", lastMade: "2026-05-10",
    comments: "Fabricado el 10 de Mayo 2026. Geranium Bourbon (Alexmo). Agua de Mar. Total 1000g.",
    ingredients: [
      { name: "Sharomix", amount: "12", unit: "g" },
      { name: "Blossom To Go PO (Alexmo)", amount: "5", unit: "g" },
      { name: "Creamy Cassis PO (Alexmo)", amount: "5", unit: "g" },
      { name: "Geranium Bourbon (Alexmo)", amount: "100", unit: "g" },
      { name: "Agua de Mar", amount: "878", unit: "g" },
    ]
  },
  {
    id: 35, category: "facial", name: "Crema Hidratante Colostrum", lastMade: "",
    comments: "Extracto Vainilla Hidrosoluble. Total 125.7g (pequeño lote).",
    ingredients: [
      { name: "Aceite Ricino (Guinama)", amount: "10", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "10", unit: "g" },
      { name: "Aceite Soja (Guinama)", amount: "2", unit: "g" },
      { name: "Vitamina E Acetato Natural (Camassia)", amount: "1", unit: "g" },
      { name: "Emulsionante Concentrado (Guinama)", amount: "8", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "7.5", unit: "g" },
      { name: "Goma Xantana (Gran Velada)", amount: "0.2", unit: "g" },
      { name: "Extracto de Vainilla Hidrosoluble (Gran Velada)", amount: "10", unit: "g" },
      { name: "Aloe Vera Gel (Guinama)", amount: "7.5", unit: "g" },
      { name: "Agua de Rosas Natural (Guinama)", amount: "50", unit: "g" },
      { name: "Leucidal Líquido (Jabonarium)", amount: "2.5", unit: "g" },
      { name: "Ácido Hialurónico Liposomado (Camassia)", amount: "2", unit: "g" },
      { name: "Agua", amount: "15", unit: "g" },
    ]
  },
  {
    id: 36, category: "facial", name: "Gel Peeling Desincrustante", lastMade: "",
    comments: "Ácido Salicílico. Aloe Vera Gel. Color Verde. Total 501.1g.",
    ingredients: [
      { name: "Ácido Láctico (Guinama)", amount: "30", unit: "g" },
      { name: "Ácido Salicílico (Guinama)", amount: "5", unit: "g" },
      { name: "Leucidal Líquido (Jabonarium)", amount: "5", unit: "g" },
      { name: "Glicerina", amount: "20", unit: "g" },
      { name: "Vitamina E Alfatocoferol (Jabonarium)", amount: "1", unit: "g" },
      { name: "Goma Xantana", amount: "2", unit: "g" },
      { name: "Hidroximetil Celulosa (Guinama)", amount: "1", unit: "g" },
      { name: "Sodium Cocoyl Glutamate (Qerlan)", amount: "10", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "50", unit: "g" },
      { name: "Emulsionante Concentrado (Guinama)", amount: "7", unit: "g" },
      { name: "Aloe Vera Gel (Guinama)", amount: "140", unit: "g" },
      { name: "Agua", amount: "230", unit: "g" },
      { name: "Color Verde", amount: "0.1", unit: "g" },
    ]
  },
  {
    id: 37, category: "facial", name: "Concentrado Células Madre - Trufa y Kombucha", lastMade: "",
    comments: "Aceite de Jojoba y Aquaxyl sin precio. Placenta Vegetal. Total 373g.",
    ingredients: [
      { name: "Baba de Caracol (Guinama)", amount: "10", unit: "g" },
      { name: "Elastina Marina (Jabonarium)", amount: "10", unit: "g" },
      { name: "Aceite de Jojoba (Camassia)", amount: "10", unit: "g" },
      { name: "Aquaxyl (Camassia)", amount: "10", unit: "g" },
      { name: "Aloe Vera Gel (Guinama)", amount: "250", unit: "g" },
      { name: "Sucragel (Qerlan)", amount: "18", unit: "g" },
      { name: "Vitamina E", amount: "4", unit: "g" },
      { name: "Placenta Vegetal (Guinama)", amount: "60", unit: "g" },
      { name: "Nacar", amount: "0.5", unit: "g" },
      { name: "Nasha Pó (Alexmo)", amount: "0.2", unit: "g" },
      { name: "Creamy Cassis PO (Alexmo)", amount: "0.3", unit: "g" },
    ]
  },
  {
    id: 38, category: "facial", name: "Sangre de Drago (S.O.S)", lastMade: "",
    comments: "Extracto Árnica Glicerinado (Guinama). Placenta Vegetal S/Parabenos. Viscólid sin precio. Agua de Rosas CALENTAR antes de usar. Total 250g.",
    ingredients: [
      { name: "Aceite Ricino (Guinama)", amount: "20", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "5", unit: "g" },
      { name: "Extracto Árnica Oleoso (Guinama)", amount: "5", unit: "g" },
      { name: "Viscólid", amount: "4", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "15", unit: "g" },
      { name: "Xantana", amount: "0.5", unit: "g" },
      { name: "Sangre Drago (Camassia)", amount: "4", unit: "g" },
      { name: "Vitamina E Acetato Natural (Camassia)", amount: "2", unit: "g" },
      { name: "Leucidal Líquido (Jabonarium)", amount: "4.5", unit: "g" },
      { name: "Aloe Vera Gel (Guinama)", amount: "77", unit: "g" },
      { name: "Pepino Extracto (Gran Velada)", amount: "10", unit: "g" },
      { name: "Extracto Árnica Glicerinado (Guinama)", amount: "38", unit: "g" },
      { name: "Activo Piel Sensible y Reactiva (Camassia)", amount: "5", unit: "g" },
      { name: "Placenta Vegetal S/Parabenos (Guinama)", amount: "30", unit: "g" },
      { name: "Agua de Rosas Natural (Guinama) ⚠️ CALENTAR", amount: "30", unit: "g" },
    ]
  },

  // ═══ PELUQUERÍA / SPA CAPILAR ═══
  {
    id: 39, category: "capilar", name: "Tónico Hidratante Peluquería", lastMade: "",
    comments: "Tónico Olvi (Rubio). Total 500g.",
    ingredients: [
      { name: "Tónico Olvi (Rubio)", amount: "420", unit: "g" },
      { name: "Carboximetil Celulosa (Guinama)", amount: "1", unit: "g" },
      { name: "Hidroxietil Celulosa (Guinama)", amount: "1", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "78", unit: "g" },
    ]
  },
  {
    id: 40, category: "capilar", name: "Mascarilla Hidratante Oil Therapy", lastMade: "",
    comments: "Aceite de Girasol pendiente de precio. Aceite de Ricino, Almendras y Ozono. Total 500g.",
    ingredients: [
      { name: "Cera Emulsionante Soft EQ65 (Camassia)", amount: "30", unit: "g" },
      { name: "Aceite de Girasol", amount: "50", unit: "g" },
      { name: "Aceite de Almendras (Guinama)", amount: "25", unit: "g" },
      { name: "Aceite de Ricino (Guinama)", amount: "25", unit: "g" },
      { name: "Glicerina (Guinama)", amount: "30", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "1", unit: "g" },
      { name: "Urea", amount: "10", unit: "g" },
      { name: "Fenitil Alcohol y Caprilil Glicol (Guinama)", amount: "5", unit: "g" },
      { name: "Pantenol (Gran Velada)", amount: "10", unit: "g" },
      { name: "Ozono", amount: "2", unit: "g" },
      { name: "Mimosa", amount: "5", unit: "g" },
      { name: "Nacarante (Guinama)", amount: "10", unit: "g" },
      { name: "Lamesoft (Camassia)", amount: "15", unit: "g" },
      { name: "Agua", amount: "282", unit: "g" },
    ]
  },
  {
    id: 41, category: "capilar", name: "Serum Hidratante para Manos - Peluquería", lastMade: "",
    comments: "Fragancia Natural Higo y Leche (Camassia). Nacarante. Total 500g.",
    ingredients: [
      { name: "Glicerina (Guinama)", amount: "60", unit: "g" },
      { name: "Goma Xantana (Guinama)", amount: "2", unit: "g" },
      { name: "Hidroximetil Celulosa (Guinama)", amount: "1", unit: "g" },
      { name: "Carboximetil Celulosa (Guinama)", amount: "1", unit: "g" },
      { name: "Colágeno Marino (Gran Velada)", amount: "10", unit: "g" },
      { name: "Urea (Guinama)", amount: "10", unit: "g" },
      { name: "Sharomix", amount: "5", unit: "g" },
      { name: "Nacarante (Guinama)", amount: "5", unit: "g" },
      { name: "Fragancia Natural Higo y Leche (Camassia)", amount: "2", unit: "g" },
      { name: "Agua", amount: "404", unit: "g" },
    ]
  },

  // ═══ CREMAS PERSONALES ═══
  {
    id: 42, category: "personal", name: "Crema Daniel", lastMade: "2026-02-01",
    comments: "Fabricada 01 Feb 2026. Bambú Fragance - Pereira sin precio. Nacarante sin precio. Total 400g.",
    ingredients: [
      { name: "Alcohol Cetílico", amount: "10", unit: "g" },
      { name: "Cera Lanette", amount: "10", unit: "g" },
      { name: "Aceite de Almendras", amount: "100", unit: "g" },
      { name: "Xantana", amount: "1", unit: "g" },
      { name: "Glicerina", amount: "20", unit: "g" },
      { name: "Sharomix", amount: "4", unit: "g" },
      { name: "Pantenol", amount: "20", unit: "g" },
      { name: "Urea", amount: "20", unit: "g" },
      { name: "Lemon Sorbet", amount: "2", unit: "g" },
      { name: "Cardamomo (Gran Velada)", amount: "2", unit: "g" },
      { name: "Own Fragance PO", amount: "2", unit: "g" },
      { name: "Bambú Fragance - Pereira", amount: "2", unit: "g" },
      { name: "Nacarante", amount: "3", unit: "g" },
      { name: "Agua", amount: "204", unit: "g" },
    ]
  },
  {
    id: 43, category: "personal", name: "Crema Gaby", lastMade: "",
    comments: "Citral y Finish Peach pendientes. Ozono 0g (sin precio). Total 400g.",
    ingredients: [
      { name: "Alcohol Cetílico", amount: "10", unit: "g" },
      { name: "Cera Lanette", amount: "10", unit: "g" },
      { name: "Aceite de Almendras", amount: "100", unit: "g" },
      { name: "Alginato", amount: "1", unit: "g" },
      { name: "Glicerina", amount: "20", unit: "g" },
      { name: "Sharomix", amount: "4", unit: "g" },
      { name: "Pantenol", amount: "20", unit: "g" },
      { name: "Urea", amount: "20", unit: "g" },
      { name: "Extracto de Pepino", amount: "5", unit: "g" },
      { name: "Agua", amount: "210", unit: "g" },
    ]
  },
];

const CATEGORIES = [
  { id: "corporal", label: "Crema Corporal", icon: "🧴", color: "#C8A882" },
  { id: "facial", label: "Crema Facial", icon: "✨", color: "#D4A8BC" },
  { id: "capilar", label: "Spa Capilar", icon: "🌿", color: "#8FBB9A" },
  { id: "personal", label: "Cremas Personales", icon: "💎", color: "#A0B4C8" },
];

const UNITS = ["g", "ml", "oz", "gotas", "cdta", "cda", "pizca", "unidad", "%"];
const EMPTY_ING = { name: "", amount: "", unit: "g" };

// Precios del Excel (€/g). Clave = nombre normalizado en minúsculas
const INITIAL_PRICES = {
  "alcohol cetílico": 0.011,
  "cera lanette": 0.03755,
  "aceite de almendras": 0.0064,
  "glicerina": 0.00483,
  "goma xantana": 0.035,
  "sharomix": 0.055,
  "aceite esencial de canela corteza": 0.000434,
  "pimienta": 0.251,
  "leucidal": 0.146,
  "leucidal líquido": 0.146,
  "urea": 0.01239,
  "pantenol": 0.0926,
  "nacarante": 0.01008,
  "nacar": 0.01,
  "caolín": 0.00876,
  "piedra pómez": 0.00488,
  "carbón activo": 0.03968,
  "lamesoft": 0.01872,
  "sodium cocoyl glutamate": 0.0158,
  "natragem": 0.01580,
  "sales de epsom": 0.0372,
  "partículas exfoliantes celulosa 500 micras": 0.0372,
  "nasha pó": 0.264,
  "agua": 0.000434,
  "betaína de coco": 0.00736,
  "coco glucoside": 0.014,
  "extracto aloe vera": 0.011,
  "extracto de pepino": 0.036,
  "blossom to go po": 0.251,
  "yogurt": 0.02543,
  "leche de arroz": 0.05996,
  "agua de rosas natural": 0.0094,
  "polvo de frambuesa": 0.0838,
  "aceite de almendras (guinama)": 0.0064,
  "emulsionante concentrado guinama": 0.10384,
  "caolín (guinama)": 0.00876,
  "menthol": 0.0,
  "lamesoft (camassia)": 0.01872,
  "germen de trigo liposomado": 0.2438,
  "elastina marina": 0.1192,
  "extracto de pepino glicólico": 0.0736,
  "baba de caracol concentrado": 0.2953,
  "aloe vera gel": 0.00920,
  "aloe vera gel (guinama)": 0.00920,
  "glicerina (guinama)": 0.00483,
  "carboximetil celulosa": 0.1047,
  "carboximetil celulosa sódica": 0.1047,
  "carboximetil celulosa (guinama)": 0.1047,
  "hidroxietil celulosa": 0.0724,
  "hidroximetil celulosa": 0.0724,
  "hidroximetil celulosa (guinama)": 0.0724,
  "ácido láctico": 0.01794,
  "ácido salicílico": 0.269,
  "vitamina e alfatocoferol": 0.1296,
  "vitamina e acetato natural": 0.234,
  "vitamina e": 0.041,
  "granada glicerada": 0.03124,
  "colágeno marino": 0.0,
  "leucidal líquido (jabonarium)": 0.146,
  "extracto de pepino (gran velada)": 0.01152,
  "ácido hialurónico liposomado": 0.349,
  "aceite ricino": 0.01258,
  "aceite soja": 0.00945,
  "emulsionante concentrado (guinama)": 0.10384,
  "extracto de vainilla hidrosoluble": 0.0538,
  "sangre drago": 0.146,
  "extracto árnica oleoso": 0.03559,
  "extracto árnica glicerinado": 0.146,
  "activo piel sensible y reactiva": 0.05619,
  "placenta vegetal": 0.036,
  "placenta vegetal s/parabenos": 0.198,
  "activo reductor de poros": 0.0683,
  "hidrolato de ciprés": 0.0282,
  "pentylene glycol natural": 0.0824,
  "bioazufre fluido": 0.0724,
  "levadura de cerveza": 0.0144,
  "geranium bourbon hydrolat kba": 0.03,
  "agua hamamelis": 0.01602,
  "bentonita": 0.00695,
  "cosgard": 0.04628,
  "cosgard (jabonarium)": 0.004620,
  "extracto abedul seco": 0.2087,
  "glicerina (guinama)": 0.00483,
  "mimosa": 0.0727,
  "viscólid": 0.0347,
  "cso glucoside": 0.014,
  "betaína natural": 0.0408,
  "almidón de arroz": 0.033,
  "filtro solar": 0.104,
  "alginato": 0.0068,
  "vitamina e tocoferol": 0.17866,
  "gelificante de aceite": 0.0427,
  "gelificante aceite": 0.0427,
  "natragem s140 np": 0.03943,
  "sci sodium cocoyl": 0.03365,
  "sugar cream": 0.06884,
  "azúcar moreno": 0.00168,
  "manteca de karité": 0.0123,
  "manteca de mango": 0.0198,
  "vaselina": 0.0124,
  "castaño de indias glicerinado": 0.02466,
  "extracto equiceto fluido": 0.029,
  "extracto harpagofito glicerinado": 0.03288,
  "extracto fucus glicerinado": 0.02157,
  "hiedra glicerinado": 0.02245,
  "harpagofito glicerinado": 0.03288,
  "extracto centella asiática": 0.03438,
  "esencia luxury": 0.0876,
  "gel transparente": 0.003698,
  "extracto de árnica oleoso": 0.03559,
  "cera emulsionante soft eq65": 0.02665,
  "fenitil alcohol y caprilil glicol": 0.0596,
  "ozono": 0.143,
  "lemon sorbet": 0.318,
  "lemon gras": 0.294,
  "lemon gras kda": 0.294,
  "sal": 0.0,
  "musgo": 0.0545,
  "sucragel": 0.318,
  "ácido láctico (guinama)": 0.01794,
  "ácido salicílico (guinama)": 0.269,
  "sucragel (qerlan)": 0.0263,
  "granada glicerada (guinama)": 0.03124,
  "colágeno marino (gran velada)": 0.0,
  "blossom to go (alexmo)": 0.251,
  "leucidal líquido (jabonarium)": 0.146,
  "agua de rosas natural (guinama)": 0.0094,
  "pantenol (gran velada)": 0.0926,
  "creamy cassis po": 0.184,
  "fragancia natural higo y leche": 0.24,
  "urea (guinama)": 0.01239,
  "tónico olvi": 0.0059,
  "fucus glicerinado": 0.039,
  "castaño de indias": 0.03438,
  "aceite de jojoba": 0.0,
  "aquaxyl": 0.0,
  "aceite ricino (guinama)": 0.01258,
  "aceite soja (guinama)": 0.00945,
  "goma xantana (guinama)": 0.035,
  "emulsionante ester sucre": 0.0582,
  "leucidal (jabonarium)": 0.146,
  "extracto hiedra glicerinado": 0.02245,
  "castaño de indias (guinama)": 0.03288,
  "extracto equiceto fluido (guinama)": 0.029,
};

function normalizeKey(name) {
  return name.toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^\w\sáéíóúüñ]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

function lookupPrice(name, priceDB) {
  if (!name) return null;
  const norm = normalizeKey(name);
  // exact match first
  if (priceDB[norm] !== undefined) return priceDB[norm];
  // try without provider suffix
  const noProvider = norm.replace(/\s*\(.*?\)\s*/g, "").trim();
  if (priceDB[noProvider] !== undefined) return priceDB[noProvider];
  // partial match
  const keys = Object.keys(priceDB);
  const found = keys.find(k => norm.includes(k) || k.includes(norm));
  return found !== undefined ? priceDB[found] : null;
}

function calcRecipeCost(ingredients, priceDB) {
  let total = 0;
  let missing = 0;
  const lines = ingredients.filter(i => i.name).map(ing => {
    const amt = parseFloat(ing.amount) || 0;
    const price = lookupPrice(ing.name, priceDB);
    if (price === null || price === undefined) { missing++; return { ...ing, lineTotal: null }; }
    return { ...ing, lineTotal: price * amt };
  });
  lines.forEach(l => { if (l.lineTotal !== null) total += l.lineTotal; });
  return { lines, total, missing };
}

function formatDate(d) {
  if (!d) return null;
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

function daysSince(d) {
  if (!d) return null;
  const diff = Date.now() - new Date(d).getTime();
  return Math.floor(diff / 86400000);
}

function Badge({ category }) {
  const cat = CATEGORIES.find(c => c.id === category);
  if (!cat) return null;
  return (
    <span style={{
      background: cat.color + "22", color: cat.color,
      border: `1px solid ${cat.color}55`, borderRadius: 20,
      padding: "3px 10px", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap",
    }}>
      {cat.icon} {cat.label}
    </span>
  );
}

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("santum_v2") || "null") || INITIAL_RECIPES; }
    catch { return INITIAL_RECIPES; }
  });
  const [priceDB, setPriceDB] = useState(() => {
    try { return JSON.parse(localStorage.getItem("santum_prices") || "null") || { ...INITIAL_PRICES }; }
    catch { return { ...INITIAL_PRICES }; }
  });
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(null);
  const [filterCat, setFilterCat] = useState("all");
  const [search, setSearch] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateTarget, setDateTarget] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [showPriceDB, setShowPriceDB] = useState(false);
  const [priceSearch, setPriceSearch] = useState("");
  const [editingKey, setEditingKey] = useState(null);
  const [editingVal, setEditingVal] = useState("");
  const [newIngName, setNewIngName] = useState("");
  const [newIngPrice, setNewIngPrice] = useState("");

  useEffect(() => {
    try { localStorage.setItem("santum_v2", JSON.stringify(recipes)); } catch {}
  }, [recipes]);
  useEffect(() => {
    try { localStorage.setItem("santum_prices", JSON.stringify(priceDB)); } catch {}
  }, [priceDB]);

  const selected = recipes.find(r => r.id === selectedId);

  const filtered = recipes.filter(r => {
    const mc = filterCat === "all" || r.category === filterCat;
    const ms = r.name.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  const needsMaking = recipes.filter(r => {
    const d = daysSince(r.lastMade);
    return d === null || d > 90;
  }).sort((a, b) => {
    const da = daysSince(a.lastMade) ?? 9999;
    const db = daysSince(b.lastMade) ?? 9999;
    return db - da;
  }).slice(0, 6);

  const openDetail = (r) => { setSelectedId(r.id); setView("detail"); };
  const openNew = () => {
    setForm({ id: null, name: "", category: "corporal", ingredients: [{ ...EMPTY_ING }], comments: "", lastMade: "" });
    setView("form");
  };
  const openEdit = (r) => {
    setForm({ ...r, ingredients: r.ingredients.map(i => ({ ...i })) });
    setView("form");
  };
  const saveForm = () => {
    if (!form.name.trim()) return;
    if (form.id) {
      setRecipes(rs => rs.map(r => r.id === form.id ? form : r));
      setSelectedId(form.id);
    } else {
      const newR = { ...form, id: Date.now() };
      setRecipes(rs => [...rs, newR]);
      setSelectedId(newR.id);
    }
    setView("detail");
  };
  const deleteRecipe = (id) => {
    if (!confirm("¿Eliminar esta receta?")) return;
    setRecipes(rs => rs.filter(r => r.id !== id));
    setView("home");
  };
  const openDateModal = (recipe) => {
    setDateTarget(recipe);
    setNewDate(recipe.lastMade || "");
    setShowDateModal(true);
  };
  const saveDateModal = () => {
    setRecipes(rs => rs.map(r => r.id === dateTarget.id ? { ...r, lastMade: newDate } : r));
    setShowDateModal(false);
  };
  const addIng = () => setForm(f => ({ ...f, ingredients: [...f.ingredients, { ...EMPTY_ING }] }));
  const removeIng = (i) => setForm(f => ({ ...f, ingredients: f.ingredients.filter((_, x) => x !== i) }));
  const updateIng = (i, k, v) => setForm(f => ({
    ...f, ingredients: f.ingredients.map((ing, x) => x === i ? { ...ing, [k]: v } : ing)
  }));

  // Price DB helpers
  const saveEditPrice = () => {
    const val = parseFloat(editingVal);
    if (isNaN(val)) return;
    setPriceDB(p => ({ ...p, [editingKey]: val }));
    setEditingKey(null);
  };
  const addNewIngredient = () => {
    if (!newIngName.trim() || newIngPrice === "") return;
    const key = normalizeKey(newIngName);
    setPriceDB(p => ({ ...p, [key]: parseFloat(newIngPrice) || 0 }));
    setNewIngName(""); setNewIngPrice("");
  };
  const deleteIngredient = (key) => {
    setPriceDB(p => { const n = { ...p }; delete n[key]; return n; });
  };

  const priceEntries = Object.entries(priceDB)
    .filter(([k]) => k.toLowerCase().includes(priceSearch.toLowerCase()))
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div style={S.root}>
      {/* HEADER */}
      <header style={S.header}>
        <div style={S.hInner}>
          <div style={S.logo} onClick={() => setView("home")}>
            <div style={S.logoCircle}>S</div>
            <div>
              <div style={S.logoName}>SANTUM</div>
              <div style={S.logoSub}>Libro de Recetas</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {view !== "home" && (
              <button style={S.btnBack} onClick={() => setView(view === "form" ? (selectedId ? "detail" : "home") : "home")}>← Volver</button>
            )}
            <button style={S.btnGold} onClick={() => setShowPriceDB(true)}>💰 Precios</button>
            {view === "home" && (
              <button style={S.btnPrimary} onClick={openNew}>+ Nueva Receta</button>
            )}
          </div>
        </div>
      </header>

      <main style={S.main}>

        {/* ── HOME ── */}
        {view === "home" && (
          <div>
            {/* Stats */}
            <div style={S.statsGrid}>
              {CATEGORIES.map(c => {
                const cnt = recipes.filter(r => r.category === c.id).length;
                return (
                  <div key={c.id} style={{ ...S.statCard, borderColor: c.color + "66" }}
                    onClick={() => setFilterCat(filterCat === c.id ? "all" : c.id)}>
                    <div style={{ fontSize: 26 }}>{c.icon}</div>
                    <div style={{ ...S.statNum, color: c.color }}>{cnt}</div>
                    <div style={S.statLbl}>{c.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Próximas a Fabricar */}
            {needsMaking.length > 0 && (
              <div style={S.alertBox}>
                <div style={S.alertTitle}>⏰ Próximas a Fabricar</div>
                <div style={S.alertGrid}>
                  {needsMaking.map(r => {
                    const d = daysSince(r.lastMade);
                    const cat = CATEGORIES.find(c => c.id === r.category);
                    return (
                      <div key={r.id} style={S.alertCard}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#2c2218", flex: 1 }}>{cat?.icon} {r.name}</div>
                          <button style={S.btnDate} onClick={() => openDateModal(r)}>📅 Actualizar</button>
                        </div>
                        <div style={{ fontSize: 12, color: d === null ? "#c0392b" : d > 180 ? "#c0392b" : "#a07850", marginTop: 4 }}>
                          {d === null ? "⚠️ Sin fecha de fabricación" : `⏳ Hace ${d} días`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Buscador + Filtros */}
            <div style={S.toolbar}>
              <input style={S.searchInput} placeholder="🔍 Buscar receta..." value={search}
                onChange={e => setSearch(e.target.value)} />
              <div style={S.filters}>
                <button style={filterCat === "all" ? S.fBtnActive : S.fBtn} onClick={() => setFilterCat("all")}>
                  Todas ({recipes.length})
                </button>
                {CATEGORIES.map(c => (
                  <button key={c.id}
                    style={filterCat === c.id ? { ...S.fBtn, background: c.color + "22", border: `1.5px solid ${c.color}`, color: c.color, fontWeight: 700 } : S.fBtn}
                    onClick={() => setFilterCat(filterCat === c.id ? "all" : c.id)}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de recetas */}
            {filtered.length === 0 ? (
              <div style={S.empty}>📋 No hay recetas. ¡Crea la primera!</div>
            ) : (
              <div style={S.grid}>
                {filtered.map(r => {
                  const d = daysSince(r.lastMade);
                  const urgent = d === null || d > 90;
                  const { total, missing } = calcRecipeCost(r.ingredients, priceDB);
                  return (
                    <div key={r.id} style={{ ...S.card, borderColor: urgent ? "#e07050" : "#e0d5c8" }} onClick={() => openDetail(r)}>
                      <div style={S.cardTop}>
                        <div style={S.cardName}>{r.name}</div>
                        <Badge category={r.category} />
                      </div>
                      <div style={S.cardMeta}>
                        <span>🧪 {r.ingredients.filter(i => i.name).length} ing.</span>
                        <span style={{ color: urgent ? "#c0392b" : "#8a7a6a" }}>
                          📅 {r.lastMade ? formatDate(r.lastMade) : "Sin fabricar"}
                        </span>
                        <span style={{ color: "#a07850", fontWeight: 700 }}>
                          💰 {total > 0 ? `${total.toFixed(2)}€` : "—"}
                          {missing > 0 ? <span style={{ color: "#bbb", fontWeight: 400 }}> +{missing}?</span> : ""}
                        </span>
                      </div>
                      {r.comments && <div style={S.cardNote}>{r.comments.slice(0, 70)}{r.comments.length > 70 ? "…" : ""}</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── DETAIL ── */}
        {view === "detail" && selected && (
          <div style={S.detailWrap}>
            {(() => {
              const cat = CATEGORIES.find(c => c.id === selected.category);
              const d = daysSince(selected.lastMade);
              return (
                <>
                  <div style={{ ...S.detailHeader, borderLeft: `5px solid ${cat?.color}` }}>
                    <div style={{ fontSize: 36 }}>{cat?.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={S.detailTitle}>{selected.name}</div>
                      <Badge category={selected.category} />
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button style={S.btnDate} onClick={() => openDateModal(selected)}>📅 Actualizar Fecha</button>
                      <button style={S.btnEdit} onClick={() => openEdit(selected)}>✏️ Editar</button>
                      <button style={S.btnDelete} onClick={() => deleteRecipe(selected.id)}>🗑</button>
                    </div>
                  </div>

                  <div style={S.detailGrid}>
                    {/* Ingredientes */}
                    <div style={S.section}>
                      <div style={S.sectionTitle}>🧪 Ingredientes y Costes</div>
                      {(() => {
                        const { lines, total, missing } = calcRecipeCost(selected.ingredients, priceDB);
                        return (
                          <>
                            <table style={S.table}>
                              <thead>
                                <tr>
                                  <th style={S.th}>Ingrediente</th>
                                  <th style={{ ...S.th, textAlign: "center" }}>Cant.</th>
                                  <th style={{ ...S.th, textAlign: "center" }}>Ud.</th>
                                  <th style={{ ...S.th, textAlign: "right" }}>€/g</th>
                                  <th style={{ ...S.th, textAlign: "right" }}>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {lines.map((ing, i) => {
                                  const p = lookupPrice(ing.name, priceDB);
                                  return (
                                    <tr key={i} style={i % 2 === 0 ? { background: "#fdfaf7" } : {}}>
                                      <td style={S.td}>{ing.name}</td>
                                      <td style={{ ...S.td, textAlign: "center", fontWeight: 700, color: "#8a5a2a" }}>{ing.amount}</td>
                                      <td style={{ ...S.td, textAlign: "center", color: "#8a7a6a" }}>{ing.unit}</td>
                                      <td style={{ ...S.td, textAlign: "right", fontSize: 12, color: p === null ? "#e07050" : "#6a8a6a" }}>
                                        {p === null ? "⚠️ —" : p === 0 ? "0.000" : p.toFixed(4)}
                                      </td>
                                      <td style={{ ...S.td, textAlign: "right", fontWeight: 700, color: ing.lineTotal === null ? "#e07050" : "#2c6a2c" }}>
                                        {ing.lineTotal === null ? "—" : `${ing.lineTotal.toFixed(3)}€`}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            <div style={S.costFooter}>
                              <div style={{ fontSize: 13, color: "#8a7a6a" }}>
                                {missing > 0 && <span style={{ color: "#e07050" }}>⚠️ {missing} ing. sin precio · </span>}
                                Coste calculado
                              </div>
                              <div style={S.costTotal}>{total.toFixed(3)} €</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Info lateral */}
                    <div>
                      <div style={{ ...S.section, marginBottom: 16 }}>
                        <div style={S.sectionTitle}>📅 Última Fabricación</div>
                        <div style={{ fontSize: 26, fontWeight: 700, color: selected.lastMade ? (d > 90 ? "#c0392b" : "#6aaa6a") : "#c0392b", marginBottom: 4 }}>
                          {selected.lastMade ? formatDate(selected.lastMade) : "Sin registrar"}
                        </div>
                        {d !== null && (
                          <div style={{ fontSize: 13, color: d > 90 ? "#c0392b" : "#8a7a6a" }}>
                            {d === 0 ? "Fabricada hoy ✅" : d > 90 ? `⚠️ Hace ${d} días — Próxima a fabricar` : `Hace ${d} días`}
                          </div>
                        )}
                        {d === null && <div style={{ fontSize: 13, color: "#c0392b" }}>⚠️ Nunca fabricada</div>}
                        <button style={{ ...S.btnDate, marginTop: 12, width: "100%" }} onClick={() => openDateModal(selected)}>
                          📅 Actualizar fecha
                        </button>
                      </div>

                      {selected.comments && (
                        <div style={S.section}>
                          <div style={S.sectionTitle}>💬 Notas y Comentarios</div>
                          <div style={{ fontSize: 14, lineHeight: 1.7, color: "#4a3a2a", fontStyle: "italic" }}>{selected.comments}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* ── FORM ── */}
        {view === "form" && form && (
          <div style={S.formWrap}>
            <div style={S.formTitle}>{form.id ? "✏️ Editar Receta" : "➕ Nueva Receta"}</div>

            <div style={S.fg}>
              <label style={S.label}>Nombre del Producto *</label>
              <input style={S.input} value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ej: Crema Hidratante de Rosa Mosqueta" />
            </div>

            <div style={S.fg}>
              <label style={S.label}>Categoría</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {CATEGORIES.map(c => (
                  <button key={c.id}
                    style={form.category === c.id
                      ? { ...S.catBtn, background: c.color + "22", border: `2px solid ${c.color}`, color: c.color, fontWeight: 700 }
                      : S.catBtn}
                    onClick={() => setForm(f => ({ ...f, category: c.id }))}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={S.fg}>
              <label style={S.label}>🧪 Ingredientes</label>
              {form.ingredients.map((ing, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                  <input style={{ ...S.input, flex: 3 }} placeholder="Ingrediente"
                    value={ing.name} onChange={e => updateIng(i, "name", e.target.value)} />
                  <input style={{ ...S.input, flex: 1, textAlign: "center" }} placeholder="Cant."
                    value={ing.amount} onChange={e => updateIng(i, "amount", e.target.value)} />
                  <select style={S.select} value={ing.unit} onChange={e => updateIng(i, "unit", e.target.value)}>
                    {UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                  {form.ingredients.length > 1 && (
                    <button style={S.btnRemove} onClick={() => removeIng(i)}>✕</button>
                  )}
                </div>
              ))}
              <button style={S.btnAddIng} onClick={addIng}>+ Agregar ingrediente</button>
            </div>

            <div style={S.fg}>
              <label style={S.label}>📅 Última fecha de fabricación</label>
              <input type="date" style={S.input} value={form.lastMade}
                onChange={e => setForm(f => ({ ...f, lastMade: e.target.value }))} />
            </div>

            <div style={S.fg}>
              <label style={S.label}>💬 Notas y Comentarios</label>
              <textarea style={S.textarea} rows={4}
                placeholder="Observaciones, modo de uso, proveedores, tiempos, temperaturas..."
                value={form.comments} onChange={e => setForm(f => ({ ...f, comments: e.target.value }))} />
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24, borderTop: "1.5px solid #f0e8e0", paddingTop: 20 }}>
              <button style={S.btnCancel} onClick={() => setView(selectedId ? "detail" : "home")}>Cancelar</button>
              <button style={{ ...S.btnPrimary, opacity: form.name.trim() ? 1 : 0.5 }} onClick={saveForm} disabled={!form.name.trim()}>
                💾 Guardar Receta
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ── MODAL FECHA ── */}
      {showDateModal && dateTarget && (
        <div style={S.modalOverlay} onClick={() => setShowDateModal(false)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            <div style={S.modalTitle}>📅 Actualizar Fecha de Fabricación</div>
            <div style={{ fontWeight: 600, marginBottom: 16, color: "#6a5a4a" }}>{dateTarget.name}</div>
            <input type="date" style={{ ...S.input, fontSize: 18, textAlign: "center", marginBottom: 20 }}
              value={newDate} onChange={e => setNewDate(e.target.value)} />
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ ...S.btnCancel, flex: 1 }} onClick={() => setShowDateModal(false)}>Cancelar</button>
              <button style={{ ...S.btnPrimary, flex: 1 }} onClick={saveDateModal}>✅ Guardar</button>
            </div>
          </div>
        </div>
      )}
      {/* ── MODAL PRECIO DB ── */}
      {showPriceDB && (
        <div style={S.modalOverlay} onClick={() => setShowPriceDB(false)}>
          <div style={{ ...S.modalBox, maxWidth: 620, width: "100%", maxHeight: "85vh", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={S.modalTitle}>💰 Base de Datos de Precios (€/g)</div>
              <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#8a7a6a" }} onClick={() => setShowPriceDB(false)}>✕</button>
            </div>
            <div style={{ fontSize: 12, color: "#8a7a6a", marginBottom: 14 }}>
              El precio es por gramo (€/g). Actualiza cualquier ingrediente aquí y se recalculará en todas las recetas.
            </div>

            {/* Añadir nuevo */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, padding: "12px", background: "#f7f2ed", borderRadius: 10 }}>
              <input style={{ ...S.input, flex: 3, fontSize: 13 }} placeholder="Nombre ingrediente"
                value={newIngName} onChange={e => setNewIngName(e.target.value)} />
              <input style={{ ...S.input, flex: 1, fontSize: 13, textAlign: "center" }} placeholder="€/g"
                type="number" step="0.0001" min="0" value={newIngPrice}
                onChange={e => setNewIngPrice(e.target.value)} />
              <button style={{ ...S.btnPrimary, whiteSpace: "nowrap", fontSize: 13 }} onClick={addNewIngredient}>+ Añadir</button>
            </div>

            {/* Búsqueda */}
            <input style={{ ...S.input, marginBottom: 12 }} placeholder="🔍 Buscar ingrediente..."
              value={priceSearch} onChange={e => setPriceSearch(e.target.value)} />

            {/* Lista */}
            <div style={{ overflowY: "auto", flex: 1 }}>
              <table style={{ ...S.table, fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={S.th}>Ingrediente</th>
                    <th style={{ ...S.th, textAlign: "center", width: 110 }}>€ / gramo</th>
                    <th style={{ ...S.th, width: 70 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {priceEntries.map(([key, val]) => (
                    <tr key={key} style={{ borderBottom: "1px solid #f4eee8" }}>
                      <td style={{ ...S.td, fontSize: 13, textTransform: "capitalize" }}>{key}</td>
                      <td style={{ ...S.td, textAlign: "center" }}>
                        {editingKey === key ? (
                          <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                            <input style={{ ...S.input, width: 80, textAlign: "center", fontSize: 13, padding: "4px 6px" }}
                              type="number" step="0.0001" min="0" value={editingVal}
                              onChange={e => setEditingVal(e.target.value)}
                              onKeyDown={e => e.key === "Enter" && saveEditPrice()} autoFocus />
                            <button style={{ ...S.btnPrimary, padding: "4px 8px", fontSize: 12 }} onClick={saveEditPrice}>✓</button>
                          </div>
                        ) : (
                          <span style={{ cursor: "pointer", color: val === 0 ? "#e07050" : "#2c6a2c", fontWeight: 700 }}
                            onClick={() => { setEditingKey(key); setEditingVal(String(val)); }}>
                            {val === 0 ? "⚠️ 0.0000" : val.toFixed(4)}
                          </span>
                        )}
                      </td>
                      <td style={{ ...S.td, textAlign: "center" }}>
                        <button style={{ background: "#fef0f0", border: "none", borderRadius: 6, padding: "3px 8px", cursor: "pointer", color: "#c0392b", fontSize: 12 }}
                          onClick={() => deleteIngredient(key)}>✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #f0e8e0", fontSize: 12, color: "#8a7a6a", textAlign: "center" }}>
              {Object.keys(priceDB).length} ingredientes · Haz clic en el precio para editar
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ESTILOS ──────────────────────────────────────────────────────────────────
const S = {
  btnGold: { background: "transparent", color: "#C8A882", border: "1px solid #C8A88255", borderRadius: 8, padding: "8px 14px", fontFamily: "inherit", fontSize: 13, cursor: "pointer", fontWeight: 600 },
  costFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 12, borderTop: "2px solid #f0e8e0" },
  costTotal: { fontSize: 24, fontWeight: 800, color: "#2c6a2c" },
  root: { minHeight: "100vh", background: "#faf8f5", fontFamily: "'Georgia', serif", color: "#2c2218" },
  header: { background: "#2c2218", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 16px rgba(0,0,0,0.3)" },
  hInner: { maxWidth: 1020, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 },
  logo: { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
  logoCircle: { width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#C8A882,#a07850)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18, flexShrink: 0 },
  logoName: { color: "#C8A882", fontSize: 17, fontWeight: 700, letterSpacing: "0.15em" },
  logoSub: { color: "#7a6a5a", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" },
  btnPrimary: { background: "linear-gradient(135deg,#C8A882,#a07850)", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontFamily: "inherit", fontSize: 14, cursor: "pointer", fontWeight: 700 },
  btnBack: { background: "transparent", color: "#C8A882", border: "1px solid #C8A88244", borderRadius: 8, padding: "8px 14px", fontFamily: "inherit", fontSize: 13, cursor: "pointer" },
  main: { maxWidth: 1020, margin: "0 auto", padding: "24px 16px 60px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 },
  statCard: { background: "#fff", border: "1.5px solid", borderRadius: 14, padding: "16px 10px", textAlign: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "transform .15s" },
  statNum: { fontSize: 28, fontWeight: 800, lineHeight: 1 },
  statLbl: { fontSize: 11, color: "#8a7a6a", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.04em" },
  alertBox: { background: "#fff8f0", border: "1.5px solid #e8c890", borderRadius: 14, padding: 20, marginBottom: 24 },
  alertTitle: { fontWeight: 800, fontSize: 15, color: "#8a5a2a", marginBottom: 14, letterSpacing: "0.03em" },
  alertGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10 },
  alertCard: { background: "#fff", border: "1.5px solid #e8c890", borderRadius: 10, padding: "12px 14px" },
  btnDate: { background: "#fff8e0", border: "1px solid #C8A882", borderRadius: 7, padding: "6px 12px", fontFamily: "inherit", fontSize: 12, cursor: "pointer", color: "#8a5a2a", fontWeight: 600, whiteSpace: "nowrap" },
  toolbar: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "center" },
  searchInput: { border: "1.5px solid #e0d5c8", borderRadius: 10, padding: "10px 14px", fontFamily: "inherit", fontSize: 14, background: "#fff", color: "#2c2218", outline: "none", width: 220 },
  filters: { display: "flex", gap: 7, flexWrap: "wrap" },
  fBtn: { background: "#fff", border: "1.5px solid #e0d5c8", borderRadius: 20, padding: "6px 13px", fontFamily: "inherit", fontSize: 12, cursor: "pointer", color: "#6a5a4a" },
  fBtnActive: { background: "#2c2218", border: "1.5px solid #2c2218", borderRadius: 20, padding: "6px 13px", fontFamily: "inherit", fontSize: 12, cursor: "pointer", color: "#C8A882", fontWeight: 700 },
  empty: { textAlign: "center", padding: "60px 0", color: "#8a7a6a", fontSize: 16 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 14 },
  card: { background: "#fff", border: "1.5px solid", borderRadius: 14, padding: 18, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "box-shadow .2s" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10, flexWrap: "wrap" },
  cardName: { fontWeight: 700, fontSize: 15, flex: 1, lineHeight: 1.3 },
  cardMeta: { display: "flex", gap: 14, fontSize: 12, color: "#8a7a6a", marginBottom: 8 },
  cardNote: { fontSize: 12, color: "#6a5a4a", fontStyle: "italic", borderTop: "1px solid #f0e8e0", paddingTop: 8, lineHeight: 1.5 },
  detailWrap: { maxWidth: 860, margin: "0 auto" },
  detailHeader: { display: "flex", alignItems: "center", gap: 16, background: "#fff", border: "1.5px solid #e0d5c8", borderRadius: 14, padding: "18px 22px", marginBottom: 20, flexWrap: "wrap" },
  detailTitle: { fontSize: 22, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 },
  detailGrid: { display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 },
  section: { background: "#fff", border: "1.5px solid #e0d5c8", borderRadius: 14, padding: 18, marginBottom: 0 },
  sectionTitle: { fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", color: "#8a7a6a", marginBottom: 14 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: { textAlign: "left", padding: "8px 10px", background: "#f7f2ed", color: "#6a5a4a", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" },
  td: { padding: "9px 10px", borderBottom: "1px solid #f4eee8" },
  btnEdit: { background: "#f0e8e0", border: "none", borderRadius: 8, padding: "8px 14px", fontFamily: "inherit", fontSize: 13, cursor: "pointer", color: "#2c2218" },
  btnDelete: { background: "#fef0f0", border: "none", borderRadius: 8, padding: "8px 12px", fontFamily: "inherit", fontSize: 14, cursor: "pointer", color: "#c0392b" },
  formWrap: { maxWidth: 700, margin: "0 auto", background: "#fff", border: "1.5px solid #e0d5c8", borderRadius: 18, padding: "28px 28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
  formTitle: { fontSize: 20, fontWeight: 800, marginBottom: 24, borderBottom: "1.5px solid #f0e8e0", paddingBottom: 14 },
  fg: { marginBottom: 20 },
  label: { display: "block", fontSize: 12, fontWeight: 700, color: "#6a5a4a", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" },
  input: { width: "100%", border: "1.5px solid #e0d5c8", borderRadius: 9, padding: "10px 13px", fontFamily: "inherit", fontSize: 14, color: "#2c2218", background: "#faf8f5", outline: "none", boxSizing: "border-box" },
  select: { border: "1.5px solid #e0d5c8", borderRadius: 9, padding: "10px 8px", fontFamily: "inherit", fontSize: 13, color: "#2c2218", background: "#faf8f5", outline: "none", minWidth: 75 },
  textarea: { width: "100%", border: "1.5px solid #e0d5c8", borderRadius: 9, padding: "10px 13px", fontFamily: "inherit", fontSize: 14, color: "#2c2218", background: "#faf8f5", outline: "none", resize: "vertical", boxSizing: "border-box" },
  catBtn: { background: "#faf8f5", border: "1.5px solid #e0d5c8", borderRadius: 9, padding: "9px 14px", fontFamily: "inherit", fontSize: 13, cursor: "pointer", color: "#6a5a4a" },
  btnAddIng: { background: "transparent", border: "1.5px dashed #C8A882", borderRadius: 9, padding: "9px 16px", fontFamily: "inherit", fontSize: 13, cursor: "pointer", color: "#a07850", marginTop: 4 },
  btnRemove: { background: "#fef0f0", border: "none", borderRadius: 8, padding: "9px 11px", cursor: "pointer", color: "#c0392b", fontSize: 13, flexShrink: 0 },
  btnCancel: { background: "#f0e8e0", border: "none", borderRadius: 9, padding: "11px 20px", fontFamily: "inherit", fontSize: 14, cursor: "pointer", color: "#6a5a4a" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 },
  modalBox: { background: "#fff", borderRadius: 18, padding: 28, maxWidth: 380, width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" },
  modalTitle: { fontSize: 18, fontWeight: 800, marginBottom: 12, color: "#2c2218" },
};
