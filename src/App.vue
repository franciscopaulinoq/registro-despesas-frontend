<template>
  <div class="app-container">
    <nav class="navbar">
      <h1 class="navbar-title">Registro de Despesas</h1>
      <div class="navbar-links">
        <router-link to="/">Listagem</router-link>
        <router-link to="/create">Nova Despesa</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
.app-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-md);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: normal;
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-links a {
  text-decoration: none;
  color: #333;
  padding: 5px 0;
}

.navbar-links a:hover {
  text-decoration: underline;
}

.navbar-links a.router-link-exact-active {
  font-weight: bold;
  text-decoration: none;
}
</style>