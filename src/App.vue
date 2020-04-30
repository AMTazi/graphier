<template>
  <div id="app">
    <b-card title="Card Title" class="mb-4" no-body>
      <b-card-header header-tag="nav">
        <b-nav card-header>
          <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
        </b-nav>
      </b-card-header>
    </b-card>

    <b-container fluid>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
