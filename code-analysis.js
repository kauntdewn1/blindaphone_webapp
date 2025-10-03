#!/usr/bin/env node

/**
 * Script de Análise de Código BLINDAPHONE V1
 * Analisa o código real do projeto e gera relatórios baseados no estado atual
 * Adaptado para estrutura Firebase + React + Vite
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cores para output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Configurações específicas do projeto BLINDAPHONE
const CONFIG = {
  frontendSrcDir: './frontend/src',
  functionsDir: './functions',
  adminDir: './admin',
  excludeDirs: ['node_modules', 'dist', '.git', 'coverage', 'build'],
  fileExtensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.css'],
  maxFileSize: 1000, // linhas
  maxFunctionLength: 50, // linhas
  maxComponentLength: 200 // linhas
};

class BlindaphoneCodeAnalyzer {
  constructor() {
    this.stats = {
      files: {
        total: 0,
        byType: {},
        bySize: { small: 0, medium: 0, large: 0, xlarge: 0 },
        byLocation: { frontend: 0, functions: 0, admin: 0 }
      },
      components: {
        total: 0,
        withProps: 0,
        withHooks: 0,
        withState: 0,
        memoized: 0,
        pwaComponents: 0
      },
      hooks: {
        total: 0,
        custom: 0,
        builtin: 0,
        pwaHooks: 0
      },
      functions: {
        total: 0,
        firebase: 0,
        long: 0,
        withJSDoc: 0
      },
      imports: {
        firebase: 0,
        react: 0,
        pwa: 0,
        tailwind: 0,
        vite: 0,
        external: 0
      },
      issues: {
        naming: [],
        performance: [],
        security: [],
        structure: [],
        pwa: []
      }
    };
  }

  // Utilitários
  log(message, color = 'white') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logSection(title) {
    console.log(`\n${colors.cyan}${colors.bold}${title}${colors.reset}`);
    console.log(`${colors.yellow}${'='.repeat(title.length)}${colors.reset}`);
  }

  logSuccess(message) {
    this.log(`✓ ${message}`, 'green');
  }

  logWarning(message) {
    this.log(`⚠ ${message}`, 'yellow');
  }

  logError(message) {
    this.log(`✗ ${message}`, 'red');
  }

  // Análise de arquivos
  getAllFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!CONFIG.excludeDirs.includes(item)) {
          this.getAllFiles(fullPath, files);
        }
      } else if (CONFIG.fileExtensions.some(ext => item.endsWith(ext))) {
        files.push({
          path: fullPath,
          location: this.getFileLocation(fullPath)
        });
      }
    }
    
    return files;
  }

  getFileLocation(filePath) {
    if (filePath.includes('/frontend/')) return 'frontend';
    if (filePath.includes('/functions/')) return 'functions';
    if (filePath.includes('/admin/')) return 'admin';
    return 'root';
  }

  analyzeFile(fileObj) {
    try {
      const filePath = fileObj.path;
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const fileName = path.basename(filePath);
      const fileType = path.extname(filePath);
      
      this.stats.files.total++;
      this.stats.files.byLocation[fileObj.location]++;
      
      // Contar por tipo
      this.stats.files.byType[fileType] = (this.stats.files.byType[fileType] || 0) + 1;
      
      // Classificar por tamanho
      if (lines.length < 50) this.stats.files.bySize.small++;
      else if (lines.length < 200) this.stats.files.bySize.medium++;
      else if (lines.length < 500) this.stats.files.bySize.large++;
      else this.stats.files.bySize.xlarge++;
      
      // Análise específica por tipo
      if (fileType === '.tsx' || fileType === '.jsx') {
        this.analyzeReactComponent(content, filePath, lines.length);
      }
      
      if (fileType === '.ts' || fileType === '.js') {
        this.analyzeTypeScriptFile(content, filePath);
      }
      
      // Análise de imports
      this.analyzeImports(content);
      
      // Análise de problemas
      this.analyzeIssues(content, filePath, lines.length);
      
    } catch (error) {
      this.logError(`Erro ao analisar ${fileObj.path}: ${error.message}`);
    }
  }

  analyzeReactComponent(content, filePath, lineCount) {
    this.stats.components.total++;
    
    // Verificar se usa props
    if (content.includes('props') || content.includes('{') && content.includes('}')) {
      this.stats.components.withProps++;
    }
    
    // Verificar hooks
    const hookMatches = content.match(/use[A-Z]\w+/g);
    if (hookMatches) {
      this.stats.components.withHooks++;
      this.stats.hooks.builtin += hookMatches.length;
    }
    
    // Verificar useState
    if (content.includes('useState')) {
      this.stats.components.withState++;
    }
    
    // Verificar React.memo
    if (content.includes('React.memo') || content.includes('memo(')) {
      this.stats.components.memoized++;
    }
    
    // Verificar componentes PWA
    if (content.includes('PWA') || content.includes('ServiceWorker') || content.includes('manifest')) {
      this.stats.components.pwaComponents++;
    }
    
    // Verificar se é muito grande
    if (lineCount > CONFIG.maxComponentLength) {
      this.stats.issues.performance.push({
        file: filePath,
        issue: `Componente muito grande (${lineCount} linhas)`,
        suggestion: 'Considere quebrar em componentes menores'
      });
    }
  }

  analyzeTypeScriptFile(content, filePath) {
    // Verificar se é hook customizado
    if (filePath.includes('/hooks/') && content.includes('use')) {
      this.stats.hooks.custom++;
      
      // Verificar hooks PWA
      if (content.includes('PWA') || content.includes('ServiceWorker')) {
        this.stats.hooks.pwaHooks++;
      }
    }
    
    // Contar funções
    const functionMatches = content.match(/function\s+\w+|const\s+\w+\s*=\s*\(/g);
    if (functionMatches) {
      this.stats.functions.total += functionMatches.length;
      
      // Verificar JSDoc
      const jsdocMatches = content.match(/\/\*\*[\s\S]*?\*\//g);
      if (jsdocMatches) {
        this.stats.functions.withJSDoc += jsdocMatches.length;
      }
    }
    
    // Verificar funções Firebase
    if (content.includes('firebase') || content.includes('Firebase')) {
      this.stats.functions.firebase++;
    }
  }

  analyzeImports(content) {
    const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
    
    for (const line of importLines) {
      if (line.includes('firebase')) this.stats.imports.firebase++;
      if (line.includes('react')) this.stats.imports.react++;
      if (line.includes('PWA') || line.includes('serviceWorker') || line.includes('workbox')) {
        this.stats.imports.pwa++;
      }
      if (line.includes('tailwind') || line.includes('@tailwind')) {
        this.stats.imports.tailwind++;
      }
      if (line.includes('vite')) this.stats.imports.vite++;
      if (line.includes('from \'') && !line.includes('firebase') && !line.includes('react') && 
          !line.includes('PWA') && !line.includes('tailwind') && !line.includes('vite')) {
        this.stats.imports.external++;
      }
    }
  }

  analyzeIssues(content, filePath, lineCount) {
    // Problemas de nomenclatura
    const fileName = path.basename(filePath);
    const isComponent = filePath.includes('/components/') && (fileName.endsWith('.tsx') || fileName.endsWith('.jsx'));
    const isHook = filePath.includes('/hooks/') && fileName.startsWith('use');
    
    if (isComponent && !/^[A-Z]/.test(fileName)) {
      this.stats.issues.naming.push({
        file: filePath,
        issue: 'Nome de arquivo de componente não segue PascalCase',
        suggestion: 'Renomeie para PascalCase (ex: MyComponent.tsx)'
      });
    }
    
    if (isHook && !fileName.startsWith('use')) {
      this.stats.issues.naming.push({
        file: filePath,
        issue: 'Hook customizado não começa com "use"',
        suggestion: 'Renomeie para começar com "use" (ex: useMyHook.ts)'
      });
    }
    
    // Problemas de performance
    if (content.includes('console.log') && !filePath.includes('test')) {
      this.stats.issues.performance.push({
        file: filePath,
        issue: 'console.log encontrado em código de produção',
        suggestion: 'Remova ou substitua por sistema de logging apropriado'
      });
    }
    
    // Problemas de segurança (Firebase específicos)
    if (content.includes('firebase.initializeApp') && !content.includes('env')) {
      this.stats.issues.security.push({
        file: filePath,
        issue: 'Configuração Firebase sem variáveis de ambiente',
        suggestion: 'Use variáveis de ambiente para configurações sensíveis'
      });
    }
    
    // Problemas de PWA
    if (filePath.includes('PWA') && !content.includes('navigator.serviceWorker')) {
      this.stats.issues.pwa.push({
        file: filePath,
        issue: 'Componente PWA sem verificação de suporte',
        suggestion: 'Adicione verificação de suporte do Service Worker'
      });
    }
    
    // Problemas de estrutura
    if (lineCount > CONFIG.maxFileSize) {
      this.stats.issues.structure.push({
        file: filePath,
        issue: `Arquivo muito grande (${lineCount} linhas)`,
        suggestion: 'Considere quebrar em arquivos menores'
      });
    }
  }

  // Análise de dependências
  analyzeDependencies() {
    const deps = {
      frontend: this.analyzePackageJson('./frontend/package.json'),
      functions: this.analyzePackageJson('./functions/package.json'),
      root: this.analyzePackageJson('./package.json')
    };
    
    return deps;
  }

  analyzePackageJson(packagePath) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});
      
      return {
        name: packageJson.name,
        total: dependencies.length + devDependencies.length,
        production: dependencies.length,
        development: devDependencies.length,
        firebase: dependencies.some(dep => dep.includes('firebase')),
        react: dependencies.some(dep => dep.includes('react')),
        pwa: devDependencies.some(dep => dep.includes('pwa')) || dependencies.some(dep => dep.includes('pwa')),
        tailwind: devDependencies.some(dep => dep.includes('tailwind'))
      };
    } catch (error) {
      return null;
    }
  }

  // Relatórios
  generateReport() {
    this.logSection('🚀 ANÁLISE DE CÓDIGO BLINDAPHONE V1 2025');
    
    this.reportFiles();
    this.reportComponents();
    this.reportHooks();
    this.reportFunctions();
    this.reportImports();
    this.reportDependencies();
    this.reportIssues();
    this.reportRecommendations();
  }

  reportFiles() {
    this.logSection('📁 ARQUIVOS');
    this.log(`Total de arquivos analisados: ${this.stats.files.total}`, 'white');
    
    this.log('\nPor localização:', 'yellow');
    Object.entries(this.stats.files.byLocation).forEach(([location, count]) => {
      this.log(`  ${location}/: ${count} arquivos`, 'cyan');
    });
    
    this.log('\nPor tipo:', 'yellow');
    Object.entries(this.stats.files.byType).forEach(([type, count]) => {
      this.log(`  ${type}: ${count}`, 'cyan');
    });
    
    this.log('\nPor tamanho:', 'yellow');
    this.log(`  Pequenos (<50 linhas): ${this.stats.files.bySize.small}`, 'green');
    this.log(`  Médios (50-200 linhas): ${this.stats.files.bySize.medium}`, 'yellow');
    this.log(`  Grandes (200-500 linhas): ${this.stats.files.bySize.large}`, 'yellow');
    this.log(`  Muito grandes (>500 linhas): ${this.stats.files.bySize.xlarge}`, 'red');
  }

  reportComponents() {
    this.logSection('⚛️ COMPONENTES REACT');
    this.log(`Total de componentes: ${this.stats.components.total}`, 'white');
    this.log(`Com props: ${this.stats.components.withProps}`, 'cyan');
    this.log(`Com hooks: ${this.stats.components.withHooks}`, 'cyan');
    this.log(`Com estado: ${this.stats.components.withState}`, 'cyan');
    this.log(`Memoizados: ${this.stats.components.memoized}`, 'cyan');
    this.log(`PWA: ${this.stats.components.pwaComponents}`, 'cyan');
    
    const memoizationRate = this.stats.components.total > 0 
      ? ((this.stats.components.memoized / this.stats.components.total) * 100).toFixed(1)
      : 0;
    this.log(`Taxa de memoização: ${memoizationRate}%`, 'yellow');
  }

  reportHooks() {
    this.logSection('🪝 HOOKS');
    this.log(`Hooks customizados: ${this.stats.hooks.custom}`, 'cyan');
    this.log(`Hooks built-in: ${this.stats.hooks.builtin}`, 'cyan');
    this.log(`PWA hooks: ${this.stats.hooks.pwaHooks}`, 'cyan');
    this.log(`Total: ${this.stats.hooks.custom + this.stats.hooks.builtin}`, 'white');
  }

  reportFunctions() {
    this.logSection('🔧 FUNÇÕES');
    this.log(`Total de funções: ${this.stats.functions.total}`, 'white');
    this.log(`Firebase: ${this.stats.functions.firebase}`, 'cyan');
    this.log(`Com JSDoc: ${this.stats.functions.withJSDoc}`, 'cyan');
    
    const documentationRate = this.stats.functions.total > 0 
      ? ((this.stats.functions.withJSDoc / this.stats.functions.total) * 100).toFixed(1)
      : 0;
    this.log(`Taxa de documentação: ${documentationRate}%`, 'yellow');
  }

  reportImports() {
    this.logSection('📦 IMPORTS');
    this.log(`Firebase: ${this.stats.imports.firebase}`, 'cyan');
    this.log(`React: ${this.stats.imports.react}`, 'cyan');
    this.log(`PWA: ${this.stats.imports.pwa}`, 'cyan');
    this.log(`TailwindCSS: ${this.stats.imports.tailwind}`, 'cyan');
    this.log(`Vite: ${this.stats.imports.vite}`, 'cyan');
    this.log(`Externos: ${this.stats.imports.external}`, 'cyan');
  }

  reportDependencies() {
    const deps = this.analyzeDependencies();
    
    this.logSection('📚 DEPENDÊNCIAS');
    
    Object.entries(deps).forEach(([location, dep]) => {
      if (!dep) return;
      
      this.log(`\n${location.toUpperCase()}:`, 'yellow');
      this.log(`  Nome: ${dep.name}`, 'white');
      this.log(`  Total: ${dep.total}`, 'white');
      this.log(`  Produção: ${dep.production}`, 'green');
      this.log(`  Desenvolvimento: ${dep.development}`, 'blue');
      
      this.log(`  Firebase: ${dep.firebase ? '✓' : '✗'}`, dep.firebase ? 'green' : 'red');
      this.log(`  React: ${dep.react ? '✓' : '✗'}`, dep.react ? 'green' : 'red');
      this.log(`  PWA: ${dep.pwa ? '✓' : '✗'}`, dep.pwa ? 'green' : 'red');
      this.log(`  TailwindCSS: ${dep.tailwind ? '✓' : '✗'}`, dep.tailwind ? 'green' : 'red');
    });
  }

  reportIssues() {
    const totalIssues = this.stats.issues.naming.length + 
                       this.stats.issues.performance.length + 
                       this.stats.issues.security.length + 
                       this.stats.issues.structure.length +
                       this.stats.issues.pwa.length;
    
    this.logSection('⚠️ PROBLEMAS ENCONTRADOS');
    this.log(`Total: ${totalIssues}`, totalIssues > 0 ? 'red' : 'green');
    
    if (this.stats.issues.naming.length > 0) {
      this.log(`\nNomenclatura (${this.stats.issues.naming.length}):`, 'yellow');
      this.stats.issues.naming.forEach(issue => {
        this.log(`  ${issue.file}: ${issue.issue}`, 'red');
        this.log(`    → ${issue.suggestion}`, 'cyan');
      });
    }
    
    if (this.stats.issues.performance.length > 0) {
      this.log(`\nPerformance (${this.stats.issues.performance.length}):`, 'yellow');
      this.stats.issues.performance.forEach(issue => {
        this.log(`  ${issue.file}: ${issue.issue}`, 'red');
        this.log(`    → ${issue.suggestion}`, 'cyan');
      });
    }
    
    if (this.stats.issues.security.length > 0) {
      this.log(`\nSegurança (${this.stats.issues.security.length}):`, 'yellow');
      this.stats.issues.security.forEach(issue => {
        this.log(`  ${issue.file}: ${issue.issue}`, 'red');
        this.log(`    → ${issue.suggestion}`, 'cyan');
      });
    }
    
    if (this.stats.issues.pwa.length > 0) {
      this.log(`\nPWA (${this.stats.issues.pwa.length}):`, 'yellow');
      this.stats.issues.pwa.forEach(issue => {
        this.log(`  ${issue.file}: ${issue.issue}`, 'red');
        this.log(`    → ${issue.suggestion}`, 'cyan');
      });
    }
    
    if (this.stats.issues.structure.length > 0) {
      this.log(`\nEstrutura (${this.stats.issues.structure.length}):`, 'yellow');
      this.stats.issues.structure.forEach(issue => {
        this.log(`  ${issue.file}: ${issue.issue}`, 'red');
        this.log(`    → ${issue.suggestion}`, 'cyan');
      });
    }
  }

  reportRecommendations() {
    this.logSection('💡 RECOMENDAÇÕES BLINDAPHONE');
    
    const recommendations = [];
    
    // Recomendações específicas do projeto
    if (this.stats.components.memoized < this.stats.components.total * 0.3) {
      recommendations.push('Considere usar React.memo em mais componentes para otimizar performance');
    }
    
    if (this.stats.files.bySize.xlarge > 0) {
      recommendations.push('Refatore arquivos muito grandes para melhor organização');
    }
    
    if (this.stats.issues.performance.length > 0) {
      recommendations.push('Remova console.logs e otimize código de performance');
    }
    
    if (this.stats.imports.firebase < 5) {
      recommendations.push('Considere implementar mais funcionalidades Firebase para melhor integração');
    }
    
    if (this.stats.components.pwaComponents < 2) {
      recommendations.push('Expanda as funcionalidades PWA para melhor experiência offline');
    }
    
    if (this.stats.issues.security.length > 0) {
      recommendations.push('Implemente configurações seguras do Firebase com variáveis de ambiente');
    }
    
    if (recommendations.length === 0) {
      this.log('Parabéns! O código BLINDAPHONE está seguindo boas práticas.', 'green');
    } else {
      recommendations.forEach((rec, index) => {
        this.log(`${index + 1}. ${rec}`, 'yellow');
      });
    }
    
    this.log('\n🎯 FOCO BLINDAPHONE:', 'blue');
    this.log('• Priorize funcionalidades de acessibilidade', 'cyan');
    this.log('• Otimize performance para dispositivos móveis', 'cyan');
    this.log('• Mantenha estrutura PWA robusta', 'cyan');
    this.log('• Documente APIs Firebase adequadamente', 'cyan');
  }

  // Executar análise
  async run() {
    this.log('🔍 Iniciando análise do código BLINDAPHONE...', 'blue');
    
    // Analisar frontend
    const frontendFiles = this.getAllFiles(CONFIG.frontendSrcDir);
    this.log(`Analisando ${frontendFiles.length} arquivos em frontend/src/...`, 'yellow');
    frontendFiles.forEach(file => this.analyzeFile(file));
    
    // Analisar functions
    const functionsFiles = this.getAllFiles(CONFIG.functionsDir);
    this.log(`Analisando ${functionsFiles.length} arquivos em functions/...`, 'yellow');
    functionsFiles.forEach(file => this.analyzeFile(file));
    
    // Analisar admin
    const adminFiles = this.getAllFiles(CONFIG.adminDir);
    this.log(`Analisando ${adminFiles.length} arquivos em admin/...`, 'yellow');
    adminFiles.forEach(file => this.analyzeFile(file));
    
    this.logSuccess('Análise BLINDAPHONE concluída!');
    this.generateReport();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const analyzer = new BlindaphoneCodeAnalyzer();
  analyzer.run().catch(console.error);
}

module.exports = BlindaphoneCodeAnalyzer;