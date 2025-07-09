import { IconCloud } from "./magicui/icon-cloud";

const slugs = [
  // 🔥 Most Popular Programming Languages
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
  "swift",
  "kotlin",
  "php",
  "cplusplus",
  "csharp",
  
  // ⚛️ Frontend Essentials
  "react",
  "vuedotjs",
  "angular",
  "nextdotjs",
  "html5",
  "css3",
  "sass",
  "tailwindcss",
  "bootstrap",
  "jquery",
  
  // 🔧 Backend Powerhouses
  "nodedotjs",
  "express",
  "django",
  "flask",
  "spring",
  "laravel",
  "graphql",
  "socketdotio",
  
  // 📱 Mobile Development & API Testing
  "postman",
  "flutter",
  "android",
  "ios",
  
  // 🗄️ Popular Databases
  "mysql",
  "postgresql",
  "mongodb",
  "redis",
  "firebase",
  "supabase",
  "sqlite",
  
  // ☁️ Cloud & DevOps Giants
  "amazonaws",
  "googlecloud",
  "microsoftazure",
  "docker",
  "kubernetes",
  "vercel",
  "netlify",
  "heroku",
  "githubactions",
  "jenkins",
  
  // 🛠️ Essential Dev Tools
  "git",
  "github",
  "visualstudiocode",
  "figma",
  "webpack",
  "vite",
  "npm",
  "yarn",
  "eslint",
  "prettier",
  
  // 🧪 Testing Must-Haves
  "jest",
  "selenium",
  "storybook",
  
  // 🖥️ Operating Systems
  "linux",
  "ubuntu",
  "windows",
  "macos",
  
  // 🌐 Web Infrastructure
  "nginx",
  "apache",
  "cloudflare",
  
  // 📊 Popular Tools
  "tensorflow",
  "pytorch",
  "jupyter",
  "pandas",
  "numpy",
  
  // 💬 Communication
  "slack",
  "discord",
  "notion",
  "jira",
  "trello",
  
  // 🎨 Design Tools (Only working ones)
  "adobe",
  "figma",
  "sketch",
  "blender",
  "canva",
  
  // 🏪 E-commerce
  "shopify",
  "wordpress",
  "woocommerce",
  
  // 🎮 Game Development
  "unity",
  "unreal",
  "threejs",
  
  // 🔗 Web3 Popular
  "ethereum",
  "solidity"
];

export function IconCloudDemo() {
  // Create a mapping for icons from different sources
  const iconSources = {
    // Adobe icons from DevIcon (only working ones)
    adobe: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobe.svg",
    adobeaftereffects: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeaftereffects.svg",
    adobeaudition: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeaudition.svg",
    adobecreativecloud: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobecreativecloud.svg",
    adobedreamweaver: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobedreamweaver.svg",
    adobeillustrator: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeillustrator.svg",
    adobeindesign: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeindesign.svg",
    adobephotoshop: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobephotoshop.svg",
    adobepremierepro: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobepremierepro.svg",
    adobexd: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobexd.svg",
    
    // Design tools from DevIcon
    figma: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    sketch: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sketch/sketch-original.svg",
    blender: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",
    canva: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
    
    // Programming languages from DevIcon
    javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    rust: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    swift: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
    kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    php: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    cplusplus: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    csharp: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    
    // Frontend frameworks
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    vuedotjs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
    angular: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
    nextdotjs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    html5: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    css3: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    sass: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
    tailwindcss: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    jquery: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg",
    
    // Backend
    nodedotjs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    express: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    django: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    flask: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
    spring: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
    socketdotio: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
    
    // Mobile & API Testing
    postman: "https://cdn.simpleicons.org/postman/postman.svg",
    flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    android: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",
    ios: "https://cdn.simpleicons.org/apple/apple.svg",
    
    // Databases
    mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    redis: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    sqlite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
    
    // Cloud & DevOps - Fixed Amazon
    amazonaws: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    googlecloud: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    microsoftazure: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
    jenkins: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg",
    
    // Dev Tools
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    github: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    visualstudiocode: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    webpack: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg",
    vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    npm: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg",
    yarn: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yarn/yarn-original.svg",
    
    // Testing
    jest: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
    selenium: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
    
    // Operating Systems
    linux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    ubuntu: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",
    windows: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg",
    
    // AI & ML
    tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
    pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    jupyter: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
    pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
    
    // Game Development
    unity: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg",
    unreal: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg",
    threejs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    
    // Communication tools (มีสีสวย)
    slack: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg",
    discord: "https://cdn.simpleicons.org/discord/discord.svg",
    notion: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg",
    jira: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
    trello: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg",
    
    // Additional Cloud & DevOps (มีสีสวย)
    vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    netlify: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg",
    heroku: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/heroku/heroku-original.svg",
    githubactions: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
    
    // Missing Dev Tools (มีสีสวย)
    eslint: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg",
    prettier: "https://cdn.simpleicons.org/prettier/prettier.svg",
    storybook: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/storybook/storybook-original.svg",
    
    // Web Infrastructure (มีสีสวย)
    nginx: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
    apache: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg",
    cloudflare: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
    
    // E-commerce (มีสีสวย)
    shopify: "https://cdn.simpleicons.org/shopify/shopify.svg",
    wordpress: "https://cdn.simpleicons.org/wordpress/wordpress.svg",
    woocommerce: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/woocommerce/woocommerce-original.svg",
    
    // Additional Database
    supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    
    // Operating Systems
    macos: "https://cdn.simpleicons.org/macos/macos.svg",
    
    // Web3 (from Simple Icons - no colored version in DevIcon)
    ethereum: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ethereum.svg",
    solidity: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/solidity.svg",
  };

  const images = slugs.map(slug => {
    // If we have a custom source for this icon, use it
    if (iconSources[slug]) {
      return iconSources[slug];
    }
    // Otherwise, fall back to Simple Icons
    return `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${slug}.svg`;
  });

  return (
    <div className="relative flex w-full h-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  );
}

export default IconCloudDemo; 