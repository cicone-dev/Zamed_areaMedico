const fs = require("fs");
const path = require("path");

// Estrutura desejada
const structure = {
  src: {
    api: ["auth.js", "prescriptions.js"],
    components: {
      Layout: ["Header.jsx", "ProtectedRoute.jsx"],
      Patients: ["PatientSearch.jsx", "PatientProfile.jsx"],
      Prescriptions: ["PrescriptionCreator.jsx", "PrescriptionViewer.jsx"],
      UI: ["LoadingOverlay.jsx", "ErrorBoundary.jsx"],
    },
    contexts: ["AuthContext.jsx"],
    hooks: ["useAuth.js"],
    pages: ["Login.jsx", "Dashboard.jsx", "PrescriptionVerification.jsx"],
    utils: ["api.js", "pdfGenerator.js"],
    "main.jsx": "", // Arquivo vazio
  },
};

// Função recursiva para criar diretórios e arquivos
function createStructure(basePath, structure) {
  Object.keys(structure).forEach((item) => {
    const itemPath = path.join(basePath, item);
    if (typeof structure[item] === "object" && !Array.isArray(structure[item])) {
      // É um diretório
      if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath);
      }
      createStructure(itemPath, structure[item]);
    } else if (Array.isArray(structure[item])) {
      // É um diretório com arquivos
      if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath);
      }
      structure[item].forEach((file) => {
        const filePath = path.join(itemPath, file);
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, ""); // Cria arquivo vazio
        }
      });
    } else {
      // É um arquivo
      if (!fs.existsSync(itemPath)) {
        fs.writeFileSync(itemPath, structure[item]); // Cria com conteúdo (se houver)
      }
    }
  });
}

// Executa a criação
createStructure(path.resolve(__dirname, "src"), structure.src);

console.log("✅ Estrutura criada com sucesso!");