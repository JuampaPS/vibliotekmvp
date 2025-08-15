# 📁 Instrucciones para el Logo de Vibliotek

## 🎯 **Paso 1: Colocar la imagen**
1. **Guarda la imagen del logo** de Vibliotek (la que me mostraste)
2. **Renómbrala** como `vibliotek-logo.png`
3. **Colócala** en la carpeta: `public/images/vibliotek-logo.png`

## 🖼️ **Formato recomendado:**
- **Formato**: PNG (con fondo transparente si es posible)
- **Resolución**: Mínimo 420x140 píxeles (para el tamaño XL)
- **Fondo**: Preferiblemente transparente o blanco

## 📱 **Tamaños disponibles:**
- **SM**: 120x40 px (header)
- **MD**: 180x60 px (botones)
- **LG**: 300x100 px (onboarding)
- **XL**: 420x140 px (pantalla completa)

## ✨ **Características del componente:**
- **Color blanco**: Se convierte automáticamente a blanco sobre fondo rojo
- **Color negro**: Mantiene el color original sobre fondo blanco
- **Responsive**: Se adapta a todos los dispositivos
- **Optimizado**: Usa Next.js Image para mejor rendimiento

## 🔄 **Si no tienes la imagen:**
El componente tiene un fallback que muestra "VIBLIOTEK" en texto, pero es mejor usar la imagen real para la mejor calidad.

## 📍 **Ubicación del archivo:**
```
vibliotek-mvp/
├── public/
│   └── images/
│       └── vibliotek-logo.png  ← Coloca aquí tu imagen
└── src/
    └── components/
        └── VibliotekLogo.tsx
```

¡Una vez que coloques la imagen, el logo se verá perfecto en toda la app! 🎨
