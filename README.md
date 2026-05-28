# FrontEnd_Smart_Pet_Home_Web

<H2>1. TECNOLOGÍAS BASE </H2>
<p>Librería principal: ReactJS (Functional Components) <p/>
<p>Librerias Secundarias: React Icons, Sonner, Axios, zustand (Puede ser como alternativa a global context)
<p>Bundler: Vite<p/>
<p>Routing: React Router DOM<p/>
<p>Consumo API: Axios (o wrapper personalizado sobre fetch)</p>
<p>Manejo de estado global: Context API / Zustand<p/>
<p>Estilos: CSS modular / CSS global estructurado / Tailwind CSS <p/>
  
<h2>2. ESTRUCTURA DE CARPETAS</h2>
<pre>
src/ 
  assets/ # Imágenes, íconos, fuentes 
  
    components/ # Componentes reutilizables 
       ui/ # Botones, inputs, modales 
       layout/ # Navbar, Sidebar, Footer 
      
    pages/ # Vistas principales (rutas) 
      Dashboard/ 
      Login/ 
      Users/ 
    
    services/ # Lógica de comunicación con backend 
      apiClient.js 
      authService.js 
      userService.js 
      
    hooks/ # Custom hooks 
      useAuth.js 
      
    context/ # Contextos globales 
      AuthContext.jsx
      
    utils/ # Funciones auxiliares 
      formatDate.js 
      
    routes/ # Configuración de rutas 
      AppRouter.jsx 
      
    styles/ # Estilos globales 
      global.css 
      
    App.jsx 
    main.jsx
</pre>

<h2>3. CONVENCIONES DE NOMBRES</h2>

<h3>Componentes</h3>
<ul>
  <li>PascalCase</li>
</ul>
<pre>
UserCard.tsx
AdminPanel.tsx
</pre>

<h3>Funciones</h3>
<ul>
  <li>camelCase</li>
</ul>
<pre>
handleSubmit()
fetchUsers()
</pre>

<h3>Variables</h3>
<ul>
  <li>camelCase</li>
</ul>
<pre>
userData
isLoading
</pre>

<h3>Constantes globales</h3>
<ul>
  <li>UPPER_CASE</li>
</ul>
<pre>
API_BASE_URL
MAX_USERS
</pre>

<h3>Archivos</h3>
<ul>
  <li>Componentes: PascalCase</li>
  <li>Servicios: camelCase + Service</li>
</ul>
<pre>
authService.ts
userService.ts
</pre>


<h2>4. ESTRUCTURA DE COMPONENTES</h2>
<ul>
  <li>Un componente = una responsabilidad (Tratar de no poner mas de una)</li>
  <li>Máximo recomendado: 200 líneas con variación</li>
  <li>Separar lógica y UI cuando sea posible</li>
</ul>

<pre>
components/UserCard/
    UserCard.tsx
    UserCard.css
</pre>

<h2>5. MANEJO DE ERRORES</h2>

<ul>
  <li>Mensajes amigables al usuario</li>
  <li>Logs solo en desarrollo</li>
</ul>

<hr>
