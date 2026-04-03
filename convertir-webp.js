const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const carpeta = "./public/assets";
const carpetaPublic = "./public";

// extensiones válidas
const extensiones = [".jpg", ".jpeg", ".png"];

// ===== 1. CONVERTIR IMÁGENES =====
function convertirImagenes() {
  const archivos = fs.readdirSync(carpeta);

  archivos.forEach(file => {
    const ext = path.extname(file).toLowerCase();

    if (extensiones.includes(ext)) {
      const inputPath = path.join(carpeta, file);
      const outputPath = path.join(
        carpeta,
        path.parse(file).name + ".webp"
      );

      sharp(inputPath)
        .webp({ quality: 75 })
        .toFile(outputPath)
        .then(() => {
          console.log(`✅ Convertido: ${file}`);
        })
        .catch(err => console.error(err));
    }
  });
}

// ===== 2. REEMPLAZAR EN HTML/JS =====
function reemplazarRutas() {
  const archivos = fs.readdirSync(carpetaPublic);

  archivos.forEach(file => {
    const ext = path.extname(file).toLowerCase();

    if (ext === ".html" || ext === ".js") {
      const filePath = path.join(carpetaPublic, file);

      let contenido = fs.readFileSync(filePath, "utf8");

      extensiones.forEach(ext => {
        const regex = new RegExp(ext, "g");
        contenido = contenido.replace(regex, ".webp");
      });

      // backup por seguridad
      fs.writeFileSync(filePath + ".bak", contenido);

      fs.writeFileSync(filePath, contenido);

      console.log(`🛠️ Actualizado: ${file}`);
    }
  });
}

// ===== EJECUCIÓN =====
async function ejecutar() {
  console.log("🚀 Iniciando conversión...\n");

  convertirImagenes();

  // esperar un poco para asegurar conversiones
  setTimeout(() => {
    console.log("\n🔄 Reemplazando rutas...\n");
    reemplazarRutas();

    console.log("\n🎉 PROCESO COMPLETADO");
  }, 2000);
}

ejecutar();