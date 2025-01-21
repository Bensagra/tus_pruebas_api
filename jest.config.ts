export default {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Usa ts-jest para transformar TypeScript
  },
  extensionsToTreatAsEsm: [".ts"], // Trata archivos .ts como ESM
  testEnvironment: "node", // Usa el entorno Node para pruebas
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Ajusta imports relativos si usas extensiones .js
  },
};
