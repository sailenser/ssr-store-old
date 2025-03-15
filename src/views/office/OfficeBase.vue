<template>
  <div class="row">
    <div class="col col-3">
      <ul class="list-group">
        <li>
          <router-link
              :to="{ name: 'office' }"
              class="list-group-item"
          >
            <a>Main screen</a>
          </router-link>
        </li>
        <li>
          <router-link
              :to="{ name: 'office-orders' }"
              class="list-group-item"
          >
            <a>Orders history</a>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="col col-9">
      <router-view></router-view>
    </div>
  </div>
</template>